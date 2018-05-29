const PaymentError = require('./PaymentError')

class ValidationError extends PaymentError {
  constructor (error) {
    super()

    this.code = 'EINV'
    this.message = `Validation error ${error}`
    this.error = error
  }
}

module.exports = ValidationError
