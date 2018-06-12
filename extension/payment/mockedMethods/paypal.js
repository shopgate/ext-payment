/**
 * @param {SDKContext} context
 * @param {PaymentMethodInput} input
 * @returns {Promise<PaymentMethod[]>|PaymentMethod[]}
 */
module.exports = async (context, input) => {
  input.paymentMethods.push({
    id: 'paypal',
    name: 'Paypal',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' +
    'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, ' +
    'when an unknown printer took a galley of type and scrambled it to make a type specimen book',
    amount: 2.50,
    icon: null
  })

  return {paymentMethods: input.paymentMethods}
}
