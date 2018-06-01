/**
 * @param {SDKContext} context
 * @param {PaymentMethodInput} input
 * @returns {Promise<PaymentMethod[]>|PaymentMethod[]}
 */
module.exports = async (context, input) => {
  if (!input.checkout.paymentAddress || input.checkout.paymentAddress.countryCode !== 'DE') {
    return {paymentMethods: input.paymentMethods}
  }

  // payment rule for DE
  return {paymentMethods: input.paymentMethods.filter(paymentMethod => (
    paymentMethod.id === 'authorizenet' || paymentMethod.id === 'cashondelivery' || paymentMethod.id === 'paypal'
  ))}
}
