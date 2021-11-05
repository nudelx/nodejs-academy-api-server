const express = require('express')
const serverLog = require('./serverLog')
const addDate = require('./middleware/addDate')
const addResponseHeader = require('./middleware/addResponseHeader')
const moviesRouter = require('./routers/movies-router')

const app = express()
const port = 8080

app.use(serverLog, addDate, addResponseHeader)

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
})

app.get('/query/test/:number', (req, res, next) => {
  console.log(req.params)
  const { test } = req.query
  // do what we need with the param
  res.status('200').json({
    params: req.params,
  })
})

app.post('/', (req, res, next) => {
  console.log(req.body)
  const { data } = req.body
  res.status(200).json({
    received: data,
  })
})

app.use( (err, req, res, next) => {
  if (res && res.headersSent) {
    return next(err)
  }
  return res.status(err.statusCode).json({ error: err.message })
})

process.on('uncaughtException', error => {
  res.status(error.statusCode).json({ error: err.message })
  if(!error.isOperational)
    process.exit(1)
})

const server = app.listen(8080, () => console.log(`server started on port ${port}`))

module.exports = { app, server }
