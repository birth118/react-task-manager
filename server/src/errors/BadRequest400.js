const { CustomError } = require('./CustomError')

class BadRequest400 extends CustomError {
  statusCode = 400

  constructor(message) {
    super(message)
    //this.message = message
    Object.setPrototypeOf(this, BadRequest400.prototype)
  }

  serializeErrors() {
    return [{ message: this.message }]
  }
}

module.exports = { BadRequest400 }