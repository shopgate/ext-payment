/**
 * @typedef {Object} GetTotalsInput
 * @property {PaymentMethod[]} paymentMethods
 * @property {Object} checkout
 * @property {Object[]} totals
 */

/**
 * @param {SDKContext} context
 * @param {GetTotalsInput} input
 * @returns {Promise<{totals: Object[]}>}
 */
module.exports = async (context, input) => {
  const totals = input.totals

  if (!input.paymentMethods.length || !input.checkout.paymentMethod) {
    // no payment methods
    return {totals}
  }

  const paymentMethod = input.paymentMethods.find(method => method.id === input.checkout.paymentMethod.id)
  if (!paymentMethod) {
    context.log.info(input, 'Could not find payment method to calculate totals')
    return {totals}
  }

  if (paymentMethod.amount === 0) {
    return {totals}
  }

  totals.push({
    id: 'payment',
    label: 'Payment fee',
    amount: paymentMethod.amount
  })

  return {
    totals
  }
}
