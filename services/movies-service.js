const INITIAL_MOVIES = require('./movies.json')

let allMovies = []
let currentIndex = 0

async function getAllMovies() {
  return [...allMovies]
}

async function getById(id) {
  return getAllMovies().find((movie) => movie.id === id)
}

async function getByTitle(title) {
  return getAllMovies().find((movie) => movie.title === title)
}

async function createMovie({ title, img, synopsis, rating, year }) {
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

async function updateMovie(id, { title, img, synopsis, rating, year }) {
  const movieIndex = allMovies.indexOf(getById(id))
  const newMovieObject = {
    id,
    title,
    img,
    synopsis,
    rating,
    year,
  }

  const newAlMovies = [...allMovies]
  newAlMovies[movieIndex] = newMovieObject
  allMovies = newAlMovies

  return newMovieObject
}

async function deleteMovie(id) {
  const movie = getById(id)

  if (movie) {
    const movieIndex = allMovies.indexOf(movie)
    const newAllMovies = [...allMovies]
    newAllMovies.splice(movieIndex, 1)
    allMovies = newAllMovies
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
