/**
 * @typedef {Object} GetTotalsInput
 * @property {Object[]} totals
 * @property {Object} paymentMethod
 */

/**
 * @param {SDKContext} context
 * @param {GetTotalsInput} input
 * @returns {Promise<Object>}
 */
module.exports = async (context, input) => {
  const totals = input.totals

  if (input.paymentMethod) {
    totals.push({
      id: 'payment',
      label: 'Payment',
      amount: input.paymentMethod.amount
    })
  }

  return {
    totals
  }
}
