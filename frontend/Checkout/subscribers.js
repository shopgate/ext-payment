import { main$ } from '@shopgate/pwa-common/streams/main';
import fetchPaymentMethods from './action';
import { getSelectedMethod } from './selectors';

export default (subscribe) => {
  const checkoutState$ = main$.filter(({ action }) => action.type === 'CHECKOUT_STATE');
  const paymentMethods$ = main$.filter(({ action }) => action.type === 'PAYMENT_METHODS');
  const selectPaymentMethod$ = main$.filter(({ action }) => action.type === 'SELECT_PAYMENT_METHOD');

  /**
   * Fetch payment methods when checkout state is changed
   */
  subscribe(checkoutState$, ({ dispatch, action }) => {
    fetchPaymentMethods(action.checkout)(dispatch);
  });

  /**
   * After receiving payment methods,
   * notify subscribers that we have default selection
   */
  subscribe(paymentMethods$, ({ dispatch, getState, action }) => {
    const selectedMethod = getSelectedMethod(getState());
    if (selectedMethod) {
      return;
    }
    // PreSelect first default method
    const method = action.methods.find(payMethod => payMethod.selected);
    if (method) {
      dispatch({
        type: 'SELECT_PAYMENT_METHOD',
        method,
      });
    }
  });

  subscribe(selectPaymentMethod$, ({ dispatch, getState, action }) => {
    const selectedMethod = getSelectedMethod(getState());
    dispatch({
      type: 'CHECKOUT_DATA',
      id: 'paymentMethod',
      data: {
        id: action.method.id,
      },
    });
  });
};
