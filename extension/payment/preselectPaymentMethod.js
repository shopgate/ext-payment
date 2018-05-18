/**
 * @param {SDKContext} context
 * @param {PaymentMethodInput} input
 * @returns {Promise<PaymentMethods>}
 */
module.exports = async (context, input) => {
  let methods = input.methods

  let lastPaymentMethod
  try {
    lastPaymentMethod = await context.storage.user.get('lastPaymentMethod')
  } catch (err) {
    context.log.error(err, 'Failed to get last shipping method from user storage')
  }

  methods = methods.map(method => {
    method.selected = !!lastPaymentMethod && lastPaymentMethod === method.id
    return method
  })

  return {methods}
}
