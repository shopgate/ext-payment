/**
 * @param {SDKContext} context
 * @param {PaymentMethodInput} input
 * @returns {Promise<PaymentMethod[]>|PaymentMethod[]}
 */
module.exports = async (context, input) => {
  if (!input.checkout.billingAddress || input.checkout.billingAddress.countryCode !== 'DE') {
    return {paymentMethods: input.paymentMethods}
  }

  // payment rule for NL
  return {paymentMethods: input.paymentMethods.filter(paymentMethod => (
    paymentMethod.id === 'authorizenet' || paymentMethod.id === 'paypal'
  ))}
}
