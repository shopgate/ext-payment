/**
 * @param {SDKContext} context
 * @param {PaymentMethodInput} input
 * @returns {Promise<PaymentMethod>|PaymentMethod}
 */
module.exports = async (context, input) => {
  let paymentMethod

  // the input might contain a selected payment method, which takes priority, if it's valid
  if (input.checkout.paymentMethod) {
    paymentMethod = input.paymentMethods.find(
      method => method.id === input.checkout.paymentMethod.id
    )
  }

  // return found payment method (or non if nothing available)
  return {paymentMethod}
}
