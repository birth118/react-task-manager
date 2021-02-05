

// function CustomError(code, message) {
//   this.statusCode = code
//   this.message = message

// }
// CustomError.prototype = new Error
// CustomError.prototype.serializeErrors = function serializeErrors() {

//   return [{ message: this.message }]
// }

class CustomError extends Error {

  constructor(message) {
    super(message)

    //  Object.setPrototypeOf(this, CustomError.prototype)
    //this.statusCode = code
    // this.message = message
  }
  // serializeErrors() {
  //   return [{ message: `CutomError: ${this.message}` }]
  // }

}

/* class RequestValidationError extends CustomError {
  statusCode = 400
  constructor(errors) {
    super('invalid Paramter')
    Object.setPrototypeOf(this, RequestValidationError.prototype)

    this.message
    this.errors = errors
  }

  serializeErrors() {
    return this.errors.map((error) => {
      return { message: error.msg, field: error.param }
    })

  }

} */

// class NotFoundError404 extends CustomError {
//   statusCode = 404

//   constructor(message) {
//     super(message)
//     //this.message = message
//     Object.setPrototypeOf(this, NotFoundError404.prototype)
//   }

//   serializeErrors() {
//     return [{ message: this.message }]
//   }
// }


const errors = [
  {
    value: undefined,
    msg: 'Description must be provided',
    param: 'name',
    location: 'body'
  },
  {
    value: undefined,
    msg: 'Description must be provided',
    param: 'age',
    location: 'body'
  }
]

// const err = new RequestValidationError(errors)
// const errh = new NotFoundError404('Hello')

// const err1 = new Error('Hello')


// console.log(err.serializeErrors());
// console.log(err.statusCode);
// console.log(errh.serializeErrors());
// console.log(errh.statusCode);

// console.log(err instanceof Error);
// console.log(err instanceof CustomError);
// console.log(err1 instanceof CustomError);


//module.exports = { NotFoundError404, CustomError }
module.exports = { CustomError }
// class NotFoundError404 extends CustomError {
//   statusCode = 404

//   constructor(message) {
//     super(message)
//     //this.message = message
//   }

//   // serializeErrors() {
//   //   return [{ message: this.message }]
//   // }
// }

// export class CustomError

// class NotFoundError extends CustomError {

//   constructor(message) {
//     super(message)
//     Object.setPrototypeOf(this, NotFoundError.prototype)
//     this.message = message
//     this.statusCode = 404
//   }

//   serializeErrors() {
//     return [{ message: this.message }]
//   }
// }

//export { CustomError, NotFoundError }

// const err = new CustomError(400, 'Hello')
// console.log(err.serializeErrors());
// console.log(err.statusCode);
