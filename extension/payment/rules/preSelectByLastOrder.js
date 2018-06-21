/**
 * @param {SDKContext} context
 * @param {{paymentMethods: PaymentMethod[], orders: Object[]}} input
 * @returns {Promise<{paymentMethods: Object[]}>}
 */
module.exports = async (context, input) => {
  let lastMethodId

  if (Array.isArray(input.orders) && input.orders.length) {
    lastMethodId = input.orders[0].paymentMethod.id
  }

  const paymentMethods = input.paymentMethods.map(method => ({
    ...method,
    selected: lastMethodId === method.id
  }))

  return {
    paymentMethods
  }
}
