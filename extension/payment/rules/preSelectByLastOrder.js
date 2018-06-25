/**
 * @param {SDKContext} context
 * @param {{paymentMethods: PaymentMethod[], orders: Object[], checkout: Checkout}} input
 * @returns {Promise<{paymentMethods: Object[]}>}
 */
module.exports = async (context, input) => {
  // Keep current selection if valid
  const current = input.paymentMethods.find(m => input.checkout.paymentMethod && m.id === input.checkout.paymentMethod.id);
  if (current) {
    return {paymentMethods: input.paymentMethods}
  }

  let lastMethodId
  if (Array.isArray(input.orders) && input.orders.length) {
    lastMethodId = input.orders[0].paymentMethod.id
  }

  const paymentMethods = input.paymentMethods.map(method => ({
    ...method,
    selected: lastMethodId === method.id
  }))

  return {paymentMethods}
}
