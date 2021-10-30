const INITIAL_MOVIES = require('./movies.json')

let allMovies = []
let currentIndex = 0

function getAllMovies() {
  return [...allMovies]
}

function getById(id) {
  return getAllMovies().find((movie) => movie.id === id)
}

function getByTitle(title) {
  return this.getAllMovies().find((movie) => movie.title === title)
}

function createMovie({ title, img, synopsis, rating, year }) {
  const newMovie = {
    id: getNextIndex(),
    title,
    img,
    synopsis,
    rating,
    year,
  }

  allMovies = [...allMovies, newMovie]
  return newMovie
}

function updateMovie(id, { title, img, synopsis, rating, year }) {
  const movieIndex = this.allMovies.indexOf(this.getById(id))
  const newMovieObject = {
    id,
    title,
    img,
    synopsis,
    rating,
    year,
  }

  const newAlMovies = [...this.allMovies]
  newAlMovies[movieIndex] = newMovieObject
  this.allMovies = newAlMovies

  return newMovieObject
}

function deleteMovie(id) {
  const movie = this.getById(id)

  if (movie) {
    const movieIndex = this.allMovies.indexOf(movie)
    const newAllMovies = [...this.allMovies]
    newAllMovies.splice(movieIndex, 1)
    this.allMovies = newAllMovies
  }

  return movie
}

function init() {
  allMovies = [...INITIAL_MOVIES.movies]
  currentIndex = allMovies[allMovies.length - 1].id
}

function getNextIndex() {
  return ++currentIndex
}

init()

module.exports = { getAllMovies, getById, getByTitle, createMovie, updateMovie, deleteMovie, init }
