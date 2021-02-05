
const { CustomError } = require('../errors/CustomError')

// const errorHandler = (err, req, res, next) => {
//   console.log(err);

//   if (err instanceof CustomError) {
//     return res.status(err.statusCode).send(err.serializeErrors())
//   }
//   res.send(500).send({ errors: [{ message: 'Unknown Error' }] })

// }

const errorHandler = (err, req, res, next) => {

  // console.log(err.serializeErrors());

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() })
  }
  console.log(err);
  res.status(500).send({ errors: [{ message: 'CustomError: Unknown Error' }] })

}

module.exports = errorHandler 