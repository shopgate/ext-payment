/**
 * @param {Object} state redux
 * @return {*}
 */
export const getMethods = state => state.extensions['@shopgate/payment/CheckoutReducers'].methods;

/**
 * @param {Object} state state
 * @return {*}
 */
export const getSelectedMethod = state => state.extensions['@shopgate/payment/CheckoutReducers'].selectedMethod;

