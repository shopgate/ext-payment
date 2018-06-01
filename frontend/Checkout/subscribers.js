import { main$ } from '@shopgate/pwa-common/streams/main';
import fetchPaymentMethods from './action';

export default (subscribe) => {
  const checkoutData$ = main$.filter(({ action }) => action.type === 'CHECKOUT_DATA');
  const paymentMethods$ = main$.filter(({ action }) => action.type === 'PAYMENT_METHODS');
  const selectPaymentMethod$ = main$.filter(({ action }) => action.type === 'SELECT_PAYMENT_METHOD');

  subscribe(checkoutData$, ({ dispatch, getState, action }) => {
    if (action.id === 'paymentMethod') {
      return;
    }
    setTimeout(() => {
      const { checkout } = getState().extensions['@shopgate/checkout/CheckoutReducers'];
      fetchPaymentMethods(checkout)(dispatch);
    }, 500);
  });

  /**
   * After receiving shipping methods,
   * notify subscribers that we have default selection
   */
  subscribe(paymentMethods$, ({ dispatch, action }) => {
    // Find the first selected method
    const method = action.methods.find(meth => meth.selected);
    if (method) {
      dispatch({
        type: 'SELECT_PAYMENT_METHOD',
        method,
      });
    }
  });

  subscribe(selectPaymentMethod$, ({ dispatch, action }) => {
    dispatch({
      type: 'CHECKOUT_DATA',
      id: 'paymentMethod',
      data: {
        id: action.method.id,
      },
    });
  });
};
