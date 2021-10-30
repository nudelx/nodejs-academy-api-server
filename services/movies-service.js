const INITIAL_MOVIES = require('./movies.json')

function getAllMovies() {
  return [...this.allMovies]
}

function getById(id) {
  return this.getAllMovies().find((movie) => movie.id === id)
}

function getByTitle(title) {
  return this.getAllMovies().find((movie) => movie.title === title)
}

function createMovie({ title, img, synopsis, rating, year }) {
  const newMovie = {
    id: this.getNextIndex(),
    title,
    img,
    synopsis,
    rating,
    year,
  }

  this.allMovies = [...this.allMovies, newMovie]
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
  this.allMovies = [...INITIAL_MOVIES.movies]
  this.currentIndex = this.allMovies[this.allMovies.length - 1].id
}

function getNextIndex() {
  return ++this.currentIndex
}

init()

module.exports = { getAllMovies, getById, getByTitle, createMovie, updateMovie, deleteMovie, init }
