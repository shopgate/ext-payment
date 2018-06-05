/**
 * @param {SDKContext} context
 * @param {PaymentMethodInput} input
 * @returns {Promise<PaymentMethod[]>|PaymentMethod[]}
 */
module.exports = async (context, input) => {
  console.log(input.checkout)
  if (input.checkout.shippingMethod && input.checkout.shippingMethod.id === 'hermes') {
    return {paymentMethods: input.paymentMethods}
  }

  // payment rule for DE
  return {paymentMethods: input.paymentMethods.filter(paymentMethod => (
    paymentMethod.id === 'authorizenet' || paymentMethod.id === 'paypal'
  ))}
}
