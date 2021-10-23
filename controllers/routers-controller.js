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

module.exports = { getMovies }
