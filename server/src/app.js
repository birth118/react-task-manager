const express = require('express')
const cors = require('cors')
require('express-async-errors')

//var cors = require('cors')

require('./db/mongoose')      // Simply to connect to mongoDBdatabase:task-manager-api

const userRouter = require('./routers/user')    // Refer user router
const taskRouter = require('./routers/task')

const { errorHandler } = require('./middleware')
const { CustomError, NotFoundError404 } = require('./errors/')

const app = express()
// const port = process.env.PORT

app.use(cors())
app.use(express.json())     // http body data will be treated as JSON format

app.use(userRouter)         // Here to activate the user router 
app.use(taskRouter)         // Here to activate the task router 

app.all('*', async (req, res) => {
  // For errors returned from asynchronous functions.
  // You must pass them to the next() function.
  // Then Express will deliver it to the error handler (i,e, errorHandler).
  // next(new NotFoundError('Not Found'))
  throw new NotFoundError404('Route Not Found')
})


// To wire error hanlder middleware

app.use(errorHandler)


module.exports = app