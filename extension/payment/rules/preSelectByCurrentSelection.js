/**
 * @param {SDKContext} context
 * @param {PaymentMethodInput} input
 * @returns {Promise<{paymentMethods: Object[]}>}
 */
module.exports = async (context, input) => {
  if (!input.checkout.paymentMethod) {
    return {
      paymentMethods: input.paymentMethods.map(method => ({
        ...method,
        selected: false
      }))
    }
  }

  const paymentMethods = input.paymentMethods.map(method => ({
    ...method,
    selected: input.checkout.paymentMethod.id === method.id
  }))

  return {paymentMethods}
}
