/**
 * @param {SDKContext} context
 * @param {PaymentMethodInput} input
 * @returns {Promise<PaymentMethod[]>|PaymentMethod[]}
 */
module.exports = async (context, input) => {
  if (!input.checkout.billingAddress || input.checkout.billingAddress.countryCode !== 'UK') {
    return {paymentMethods: input.paymentMethods}
  }

  // no payment methods for UK
  return {paymentMethods: []}
}
