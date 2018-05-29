const PaymentError = require('./PaymentError')

class ValidationError extends PaymentError {
  constructor (error) {
    super()

    this.code = 'EVALIDATION'
    this.message = `Validation error ${error}`
    this.error = error
    this.validationErrors = []
  }
}

module.exports = ValidationError
