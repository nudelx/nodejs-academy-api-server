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
  const newMovieObject = await Movie.findOneAndReplace({ id }, { title, img, synopsis, rating, year })
  return newMovieObject
}

async function getMovie(movieId) {
  const movie = await Movie.findOne({ movie_id: movieId })
  console.log("movie", movie)
  return movie
}

async function getByTitle(title) {
  const movie = await Movie.findOne({ title })
  return movie
}

async function createMovie({ title, img, synopsis, rating, year }) {
  const nextMovieId = await getNextMovieId()
  const movie = new Movie({ title, img, synopsis, rating, year, movie_id: nextMovieId })
  movie.save()
  return movie
}

async function deleteMovie(id) {
  const deletedMovie = await Movie.findOneAndDelete({ movie_id: id })
  return deletedMovie
}

async function getNextMovieId() {
  const lastMovie = await Movie.findOne({}, {}, { sort: { movie_id: -1 } })
  return ++lastMovie.movie_id
}

module.exports = { getAllMovies, getMovie, getByTitle, createMovie, updateMovie, deleteMovie }
