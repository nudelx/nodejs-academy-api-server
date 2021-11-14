require('dotenv').config()
const express = require('express')
const serverLog = require('./serverLog')
const moviesRouter = require('./routers/movies-router')
require('./db/index')
const app = express()
const port = 8080

const myErrHandler = function (err, req, res, next) {
  console.log('SOME ERROR ACCRUED')
  console.error(err)
  res.status(500).send('Something broke!')
}

app.use(serverLog)
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use('/movies', moviesRouter)



app.get('/', (req, res, next) => {
  res.status(200).json({
    server: '1.0.0',
    name: 'nodejs-api-server',
  })
})

app.get('/query', (req, res, next) => {
  console.log(req.query)
  const { test } = req.query
  // do what we need with the param
  res.status(200).json({
    queryParams: req.query,
  })
}).get('/query/test/:number', (req, res, next) => {
  console.log(req.params)
  const { test } = req.query
  // do what we need with the param
  res.status('200').json({
    params: req.params,
  })
}).post('/', (req, res, next) => {
  console.log(req.body)
  const { data } = req.body
  res.status(200).json({
    received: data,
  })
})

// for Yoni and Idan 
app.get('/test-error', function (req, res, next) {
  // new Error(message, options, fileName, lineNumber)
  throw new Error('New error message', {cause : "You shall not pass"})
})

app.use(myErrHandler)

const server = app.listen(8080, () => console.log(` 🚀 server started on port ${port}`))
module.exports = { app, server }
