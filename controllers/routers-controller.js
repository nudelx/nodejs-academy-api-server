const { MoviesService } = require('../services/movies-service')

function getMovies(request, response) {
  const allMovies = MoviesService.getAllMovies()
  let relevantMovies = allMovies.slice()

  if (request.query.offset) {
    const offset = parseInt(request.query.offset)
    relevantMovies = relevantMovies.slice(offset)
  }

  if (request.query.limit) {
    const limit = parseInt(request.query.limit)
    relevantMovies = relevantMovies.slice(0, limit)
  }

  response.status(200).json({ movies: relevantMovies, total: relevantMovies.length })
  return
}

function getById(request, response) {
  response.status(501).json({ error: 'This method in not implemented yet' })
}

function createMovie(request, response) {
  response.status(501).json({ error: 'This method in not implemented yet' })
}

function upsertMovie(request, response) {
  response.status(501).json({ error: 'This method in not implemented yet' })
}

function modifyMovie(request, response) {
  response.status(501).json({ error: 'This method in not implemented yet' })
}

function deleteMovie(request, response) {
  response.status(501).json({ error: 'This method in not implemented yet' })
}

module.exports = { getMovies, getById, createMovie, upsertMovie, modifyMovie, deleteMovie }
