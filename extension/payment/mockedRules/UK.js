/**
 * @param {SDKContext} context
 * @param {PaymentMethodInput} input
 * @returns {Promise<PaymentMethod[]>|PaymentMethod[]}
 */
module.exports = async (context, input) => {
  if (!input.checkout.paymentAddress || input.checkout.paymentAddress.countryCode !== 'UK') {
    return {paymentMethods: input.paymentMethods}
  }

  // no payment methods for UK
  return {paymentMethods: []}
}
