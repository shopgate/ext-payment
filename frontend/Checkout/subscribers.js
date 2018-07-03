import { main$ } from '@shopgate/pwa-common/streams/main';
import { cartReceived$ } from '@shopgate/pwa-common-commerce/cart/streams';
import fetchPaymentMethods from './action';
import { getMethods, getContext, getSelectedMethod } from './selectors';

export default (subscribe) => {
  const checkoutEnter$ = main$.filter(({ action }) => action.type === 'CHECKOUT_ENTER');
  const checkoutState$ = main$.filter(({ action }) => action.type === 'CHECKOUT_STATE');
  const paymentMethods$ = main$.filter(({ action }) => action.type === 'PAYMENT_METHODS');
  const selectPaymentMethod$ = main$.filter(({ action }) => action.type === 'SELECT_PAYMENT_METHOD');

  /**
   * PreFetching of payment methods on cart enter.
   */
  subscribe(cartReceived$, ({ dispatch, getState }) => {
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

  let fetchPaymentMethodsTimeout = null;
  /**
   * Refresh payment methods when checkout state is changed
   * Compare to stored context if action should be done
   */
  subscribe(checkoutState$, ({ dispatch, getState, action }) => {
    clearTimeout(fetchPaymentMethodsTimeout);

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
      fetchPaymentMethodsTimeout = setTimeout(
        dispatch,
        700,
        fetchPaymentMethods(action.checkout)
      );
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
        let data = null;
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
