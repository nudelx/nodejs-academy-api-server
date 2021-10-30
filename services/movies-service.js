const INITIAL_MOVIES = require('./movies.json')

function getAllMovies() {
  return [...this.allMovies]
}

function getById(id) {
  return this.getAllMovies().find((movie) => movie.id === id)
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

function init() {
  this.allMovies = [...INITIAL_MOVIES.movies]
  this.currentIndex = this.allMovies[this.allMovies.length - 1].id
}

function getNextIndex() {
  return ++this.currentIndex
}

init()

module.exports = { getAllMovies, getById, createMovie, init }
