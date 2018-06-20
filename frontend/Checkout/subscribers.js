import { main$ } from '@shopgate/pwa-common/streams/main';
import { CART_PATH } from '@shopgate/pwa-common-commerce/cart/constants';
import { routeDidEnter } from '@shopgate/pwa-common/streams/history';
import fetchPaymentMethods from './action';
import { getMethods } from './selectors';

export default (subscribe) => {
  const cartRouteDidEnter$ = routeDidEnter(CART_PATH);
  const checkoutState$ = main$.filter(({ action }) => action.type === 'CHECKOUT_STATE');
  const paymentMethods$ = main$.filter(({ action }) => action.type === 'PAYMENT_METHODS');
  const selectPaymentMethod$ = main$.filter(({ action }) => action.type === 'SELECT_PAYMENT_METHOD');

  /**
   * PreFetching of payment methods on cart enter.
   */
  subscribe(cartRouteDidEnter$, ({ dispatch, getState }) => {
    const methods = getMethods(getState());
    if (!methods) {
      fetchPaymentMethods()(dispatch);
    }
  });

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
  subscribe(paymentMethods$, ({ dispatch, action }) => {
    if (!Object.keys(action.checkout).length || action.checkout.paymentMethod) {
      // Prefetch before checkout or already selected for this checkout
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
