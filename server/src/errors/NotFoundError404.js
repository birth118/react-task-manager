const { CustomError } = require('./CustomError')

class NotFoundError404 extends CustomError {
  statusCode = 404

  constructor(message) {
    super(message)
    //this.message = message
    Object.setPrototypeOf(this, NotFoundError404.prototype)
  }

  serializeErrors() {
    return [{ message: this.message }]
  }
}

module.exports = { NotFoundError404 }