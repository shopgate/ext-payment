import { main$ } from '@shopgate/pwa-common/streams/main';
import { CART_PATH } from '@shopgate/pwa-common-commerce/cart/constants';
import { routeDidEnter } from '@shopgate/pwa-common/streams/history';
import fetchPaymentMethods from './action';
import { getMethods, getContext, getSelectedMethod } from './selectors';

export default (subscribe) => {
  const cartRouteDidEnter$ = routeDidEnter(CART_PATH);
  const checkoutEnter$ = main$.filter(({ action }) => action.type === 'CHECKOUT_ENTER');
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
   * PreSelect payment method on checkout enter.
   */
  subscribe(checkoutEnter$, ({ dispatch, getState, action }) => {
    if (action.checkout.paymentMethod) {
      // Already exists
      return;
    }

    const method = getSelectedMethod(getState());
    if (method) {
      dispatch({
        type: 'SELECT_PAYMENT_METHOD',
        method,
      });
    }
  });

  /**
   * Refresh payment methods when checkout state is changed
   * Compare to stored context if action should be done
   */
  subscribe(checkoutState$, ({ dispatch, getState, action }) => {
    const { billingAddress, shippingMethod } = getContext(getState());

    let shouldRefresh = false;
    if (action.checkout.shippingMethod) {
      if (!shippingMethod || shippingMethod.id !== action.checkout.shippingMethod.id) {
        shouldRefresh = true;
      }
    }

    if (action.checkout.billingAddress) {
      if (!billingAddress || billingAddress.id !== action.checkout.billingAddress.id) {
        shouldRefresh = true;
      }
    }

    if (shouldRefresh) {
      fetchPaymentMethods(action.checkout)(dispatch);
    }
  });

  /**
   * After receiving payment methods,
   * notify subscribers that we have default selection
   */
  subscribe(paymentMethods$, ({ dispatch, action }) => {
    const { methods, checkout } = action;

    if (!Object.keys(action.checkout).length) {
      // Prefetch before checkout
      return;
    }

    const method = methods.find(payMethod => payMethod.selected);

    // Check if checkout method still available
    if (checkout.paymentMethod) {
      const stillExists = methods.find(m => m.id === checkout.paymentMethod.id);
      if (!stillExists) {
        let data = { data: null };
        if (method) {
          data = method;
        }
        dispatch({
          type: 'CHECKOUT_DATA',
          id: 'paymentMethod',
          data,
        });
      }
      return;
    }

    // PreSelect first default method from response
    if (method) {
      dispatch({
        type: 'SELECT_PAYMENT_METHOD',
        method,
      });
    }
  });

  let selectMethodTimeout = null;

  /**
   * @param {Object} args args
   */
  const selectPaymentMethodDelayed = ({ dispatch, method }) => {
    dispatch({
      type: 'CHECKOUT_DATA',
      id: 'paymentMethod',
      data: {
        id: method.id,
      },
    });
  };

  subscribe(selectPaymentMethod$, ({ dispatch, action }) => {
    clearTimeout(selectMethodTimeout);
    selectMethodTimeout = setTimeout(
      selectPaymentMethodDelayed,
      700,
      {
        dispatch,
        method: action.method,
      }
    );
  });
};
