class PaymentError extends Error {
  constructor (cause = {message: ''}) {
    super()

    this.cause = cause
    this.code = 'EPAYMENT'
    this.message = `Payment error: ${cause.message}`
  }
}

module.exports = PaymentError
