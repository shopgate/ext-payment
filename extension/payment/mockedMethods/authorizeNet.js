/**
 * @param {SDKContext} context
 * @param {PaymentMethodInput} input
 * @returns {Promise<PaymentMethod[]>|PaymentMethod[]}
 */
module.exports = async (context, input) => {
  input.paymentMethods.push({
    id: 'authorizenet',
    name: 'Authorize.Net',
    description: 'Fast payment with credit card',
    amount: 0,
    // @TODO add icon
    icon: null
  })

  return {paymentMethods: input.paymentMethods}
}
