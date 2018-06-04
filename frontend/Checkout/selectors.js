/**
 * @param {Object} state redux
 * @return {*}
 */
export const getMethods = state => state.extensions['@shopgate/payment/CheckoutReducers'].methods;
