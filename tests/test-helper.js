const { server } = require('../server')
const { loadAllData, Movie } = require('../db/')

const INITIAL_MOVIES = require('../services/movies.json')
const sinon = require("sinon").createSandbox()
const dbDocArray = [...INITIAL_MOVIES.movies]
dbDocArray.skip = sinon.spy()
dbDocArray.limit = sinon.spy()


beforeEach(() => {
  
})

afterEach(() => {
  sinon.restore()
})

after(() => {
  server.close()
})


module.exports = {
  sinon,
  dbDocArray
}