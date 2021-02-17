

const app = require('./app')
const port = process.env.PORT || 5000

// * This file will be used to run development mode by listening:3000
// * as reuire(app) containing express and mongoDB 
app.listen(port, () => {
    console.log('Server up..: ' + port)
})