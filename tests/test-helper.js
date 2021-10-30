const { server } = require('../server')
const MoviesService = require('../services/movies-service')

beforeEach(() => {
  MoviesService.init()
})

after(() => {
  server.close()
})
