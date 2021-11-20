const { server } = require('../server')
const { loadAllData, Movie } = require('../db/')

const INITIAL_MOVIES = require('../services/movies.json')

beforeEach(() => {
  return new Promise(async function(resolve, reject) {
    Movie.collection
    .deleteMany({})
    .then(Movie.collection.insertMany(INITIAL_MOVIES))
    .catch(console.log)
    resolve()
  });
})

after(() => {
  server.close()
})
