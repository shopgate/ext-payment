/**
 * @param {SDKContext} context
 * @param {PaymentMethodInput} input
 * @returns {Promise<PaymentMethods>}
 */
module.exports = async (context, input) => {
  const methods = input.methods

  let allow = true

  if (input.checkout.shippingAddress && input.checkout.shippingAddress.countryCode) {
    const allowedCountries = ['DE', 'NL']
    if (!allowedCountries.includes(input.checkout.shippingAddress.countryCode)) {
      allow = false
    }
  }

  if (allow) {
    methods.push({
      id: 'paypal',
      name: 'Paypal',
      description: 'Fast payment with Paypal',
      amount: 0,
      // @TODO add icon
      icon: null
    })
  }

  return {methods}
}
