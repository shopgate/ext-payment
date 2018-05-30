/**
 * @param {SDKContext} context
 * @param {PaymentMethodInput} input
 * @returns {Promise<undefined>}
 */
module.exports = async (context, input) => {
  if (!input.checkout.paymentMethod) {
    // there was no selection. do nothing
    return
  }

  try {
    await context.storage.user.set('lastPaymentMethod', input.checkout.paymentMethod.id)
  } catch (err) {
    context.log.error(err, 'Failed to save last payment method to user storage')
  }
}
