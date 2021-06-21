const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const router = require('./routes')
const app = express()
//middlewares
app.use(morgan('dev')) // print requests to the console
app.use(bodyParser.json()) // extract the request body
app.use('/api', router)

//listen to server
const port = 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
