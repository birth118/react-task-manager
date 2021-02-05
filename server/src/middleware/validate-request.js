const { body, validationResult } = require('express-validator')
const { RequestValidationError } = require('../errors')

const requestValidate = (req, res, next) => {


  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array())
    // Express Error handler catches this because it occurs in Sync code 

  }
  next()
}


module.exports = requestValidate