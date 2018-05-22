/**
 * @typedef {Object} RememberPaymentMethodInput
 * @property {PaymentMethod} paymentMethod
 */

/**
 * @param {SDKContext} context
 * @param {RememberPaymentMethodInput} input
 * @returns {Promise<undefined>}
 */
module.exports = async (context, input) => {
  if (!input.paymentMethod) {
    // there was no selection. do nothing
    return
  }

  try {
    await context.storage.user.set('lastPaymentMethod', input.paymentMethod.id)
  } catch (err) {
    context.log.error(err, 'Failed to save last payment method to user storage')
  }
}
