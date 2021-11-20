const { server } = require('../server')
const { loadAllData, Movie } = require('../db/')

const INITIAL_MOVIES = require('../services/movies.json')

beforeEach(() => {
  Promise.resolve(Movie.collection
    .deleteMany({})
    .then(Movie.collection.insertMany(INITIAL_MOVIES))
    .catch(console.log))
})

after(() => {
  server.close()
})
