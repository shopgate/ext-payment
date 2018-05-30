/**
 * @param {SDKContext} context
 * @param {PaymentMethodInput} input
 * @returns {Promise<PaymentMethods>}
 */
module.exports = async (context, input) => {
  const methods = input.methods

  let allow = true

  if (input.checkout.shippingAddress && input.checkout.shippingAddress.countryCode) {
    const allowedCountries = ['NL']
    if (!allowedCountries.includes(input.checkout.shippingAddress.countryCode)) {
      allow = false
    }
  }

  if (allow) {
    methods.push({
      id: 'cashondelivery',
      name: 'Cash on delivery',
      description: 'Pay when you receive products',
      amount: -100,
      // @TODO add icon
      icon: null
    })
  }

  return {methods}
}
