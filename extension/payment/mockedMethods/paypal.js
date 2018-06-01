/**
 * @param {SDKContext} context
 * @param {PaymentMethodInput} input
 * @returns {Promise<PaymentMethod[]>|PaymentMethod[]}
 */
module.exports = async (context, input) => {
  input.paymentMethods.push({
    id: 'paypal',
    name: 'Paypal',
    description: 'Fast payment with Paypal',
    amount: 0,
    // @TODO add icon
    icon: null
  })

  return {paymentMethods: input.paymentMethods}
}
