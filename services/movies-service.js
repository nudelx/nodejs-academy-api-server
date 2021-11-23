const INITIAL_MOVIES = require('./movies.json')
const { loadAllData, Movie } = require('../db/')
const InternalError = require('../errors/InternalErorr')
process.env.RESET_DB && loadAllData(INITIAL_MOVIES.movies)

async function getAllMovies(offset, limit) {
  const request = Movie.find()
  if (offset) {
    request.skip(offset)
  }
  if (limit) {
    request.limit(limit)
  }
  return request
}

async function updateMovie(id, { title, img, synopsis, rating, year }) {
  //TODO use correct method to find and replace(hint hint) the movie with it's new properties https://mongoosejs.com/docs/api/query.html#query_Query-findOneAndReplace 
  return newMovieObject
}

async function getMovie(movieId) {
  //TODO use findOne with correct movie_id as filter https://mongoosejs.com/docs/api/query.html#query_Query-findOne
  return movie
}

async function getByTitle(title) {
  //TODO use findOne with correct argument to find Movie by it's title https://mongoosejs.com/docs/api/query.html#query_Query-findOne
  return movie
}

async function createMovie({ title, img, synopsis, rating, year }) {
  const nextMovieId = await getNextMovieId()
  //TODO create here model with correct arguments and save it
  return movie
}

async function deleteMovie(id) {
  //TODO use correct method from Mongoose api to find and delete movie by it's movie_id
  return deletedMovie
}

async function getNextMovieId() {
  const lastMovie = await Movie.findOne({}, {}, { sort: { movie_id: -1 } })
  return ++lastMovie.movie_id
}

module.exports = { getAllMovies, getMovie, getByTitle, createMovie, updateMovie, deleteMovie }
