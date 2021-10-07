const express = require('express')
const serverLog = require('./serverLog')
const app = express()
const port = 8080

app.use(serverLog)
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.get('/', (req, res, next) => {
  res.status('200').json({
    server: '1.0.0',
    name: 'nodejs-api-server',
  })
})

app.get('/query', (req, res, next) => {
  console.log(req.query)
  const { test } = req.query
  // do what we need with the param
  res.status('200').json({
    queryParams: req.query,
  })
})

app.post('/', (req, res, next) => {
  console.log(req.body)
  const { data } = req.body
  res.status('200').json({
    received: data
  })
})

app.listen(8080, () => console.log(`server started on port ${port}`))
