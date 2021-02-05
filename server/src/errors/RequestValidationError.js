const { CustomError } = require('./CustomError')

class RequestValidationError extends CustomError {
  statusCode = 400

  constructor(errors) {
    super('invalid Paramter')
    Object.setPrototypeOf(this, RequestValidationError.prototype)

    this.errors = errors
  }

  serializeErrors() {
    return this.errors.map((error) => {
      return { message: error.msg, field: error.param }
    })

  }
}

module.exports = { RequestValidationError }