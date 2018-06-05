/**
 * @param {SDKContext} context
 * @param {PaymentMethodInput} input
 * @returns {Promise<PaymentMethod[]>|PaymentMethod[]}
 */
module.exports = async (context, input) => {
  if (input.checkout.shippingMethod && input.checkout.shippingMethod.id === 'hermes') {
    return {paymentMethods: input.paymentMethods}
  }

  // payment rule for "shipping is not hermes"
  return {paymentMethods: input.paymentMethods.filter(paymentMethod => (
    paymentMethod.id === 'authorizenet' || paymentMethod.id === 'paypal'
  ))}
}
