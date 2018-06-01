/**
 * @param {SDKContext} context
 * @param {PaymentMethodInput} input
 * @returns {Promise<PaymentMethod[]>|PaymentMethod[]}
 */
module.exports = async (context, input) => {
  let selectedPaymentMethod

  // the input might contain a selected payment method, which takes priority, if it's valid
  if (input.checkout.paymentMethod) {
    selectedPaymentMethod = input.paymentMethods.find(
      method => method.id === input.checkout.paymentMethod.id
    )
  }

  // if no payment method selected in frontend, use the payment method selection from user storage
  if (!selectedPaymentMethod && context.meta.userId) {
    try {
      selectedPaymentMethod = {
        id: await context.storage.user.get('lastPaymentMethod')
      }
    } catch (err) {
      context.log.error(err, 'Failed to get last payment method from user storage')
    }
  }

  // fill the payment methods with selection data (no selection is also possible)
  return {paymentMethods: input.paymentMethods.map(method => {
    if (selectedPaymentMethod && selectedPaymentMethod.id === method.id) {
      return {...method, selected: true}
    }
    return {...method, selected: false}
  })}
}
