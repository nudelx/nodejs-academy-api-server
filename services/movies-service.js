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
  return await request
}

async function getMovie(id) {
  throw InternalError("getMovie() not implemented yet")
}

async function getByTitle(title) {
  throw InternalError("getByTitle() not implemented yet")
}

function createMovie({ title, img, synopsis, rating, year }) {
  throw InternalError("createMovie() not implemented yet")
  return newMovie
}

async function updateMovie(id, { title, img, synopsis, rating, year }) {
  const newMovieObject = await Movie.findOneAndReplace({ id }, { title, img, synopsis, rating, year })
  return newMovieObject
}

async function deleteMovie(id) {
  return InternalError("deleteMovie Not implement yet")
}

module.exports = { getAllMovies, getMovie , getByTitle, createMovie, updateMovie, deleteMovie }
