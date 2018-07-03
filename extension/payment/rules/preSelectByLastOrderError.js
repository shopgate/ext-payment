/**
 * @param {?Error} error
 * @param {SDKContext} context
 * @param {{paymentMethods: PaymentMethod[]}} input
 * @returns {Promise<{paymentMethods: PaymentMethod[]}>}
 */
module.exports = async (error, context, input) => {
  // If no error occurred or auth, do nothing
  if (!error || error.code === 'EACCESS') {
    return input
  }

  context.log.warn(error, 'Could not preselect payment method by last order')
  return input
}
