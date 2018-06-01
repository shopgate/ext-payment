/**
 * @param {SDKContext} context
 * @param {PaymentMethodInput} input
 * @returns {Promise<PaymentMethod[]>|PaymentMethod[]}
 */
module.exports = async (context, input) => {
  input.paymentMethods.push({
    id: 'cashondelivery',
    name: 'Cash on delivery',
    description: 'Pay when you receive products',
    amount: -100,
    // @TODO add icon
    icon: null
  })

  return {paymentMethods: input.paymentMethods}
}
