const InvalidMovieParamError = require('../errors/InvalidMovieParamError')
const MoviesService = require('../services/movies-service')

async function getMovies(request, response) {
  let { offset, limit } = request.query
  const allMovies = await MoviesService.getAllMovies()
  let relevantMovies = allMovies.slice()

  if (offset) {
    offset = parseInt(offset, 10)
    relevantMovies = relevantMovies.slice(offset)
  }

  if (limit) {
    limit = parseInt(limit, 10)
    relevantMovies = relevantMovies.slice(0, limit)
  }

  return response.status(200).json({ movies: relevantMovies, total: relevantMovies.length })
}

async function getById(request, response) {
  const { id } = request.params
  const movieId = parseInt(id, 10)
  const movie = await MoviesService.getById(movieId)

  if (!!movie) {
    return response.status(200).json(movie)
  } else {
    return response.status(404).json({ error: `no movie with id ${movieId}` })
  }
}

async function createMovie(request, response, next) {
  const { title, img, synopsis, rating, year } = request.body

  if (!title) {
    return next(InvalidMovieParamError('title is a required body param'))
  }

  if (!synopsis) {
    return next(InvalidMovieParamError('synopsis is a required body param'))
  }

  if (!rating) {
    return next(InvalidMovieParamError('rating is a required body param'))
  }

  if (!year) {
    return next(InvalidMovieParamError('year is a required body param'))
  }

  const newMovie = await MoviesService.createMovie({ title, img, synopsis, rating, year })
  return response.status(201).json(newMovie)
}

async function upsertMovie(request, response, next) {
  const { title, img, synopsis, rating, year } = request.body

  if (!title) {
    return next(InvalidMovieParamError('title is a required body param'))
  }

  if (!synopsis) {
    return next(InvalidMovieParamError('synopsis is a required body param'))
  }

  if (!rating) {
    return next(InvalidMovieParamError('rating is a required body param'))
  }

  if (!year) {
    return next(InvalidMovieParamError('year is a required body param'))
  }

  const movie = await MoviesService.getByTitle(title)
  const doesMovieExist = !!movie

  if (doesMovieExist) {
    const updatedMovie = await MoviesService.updateMovie(movie.id, { title, img, synopsis, rating, year })
    return response.status(200).json(updatedMovie)
  } else {
    const newMovie = await MoviesService.createMovie({ title, img, synopsis, rating, year })
    return response.status(201).json(newMovie)
  }
}

async function modifyMovie(request, response) {
  const movieId = parseInt(request.params.id)
  const movie = await MoviesService.getById(movieId)
  const doesMovieExist = !!movie

  if (!doesMovieExist) {
    return response.status(404).json({ error: `no movie with id ${movieId}` })
  }

  const { title, img, synopsis, rating, year } = request.body
  const definedParams = {
    ...(title && { title }),
    ...(img && { img }),
    ...(synopsis && { synopsis }),
    ...(rating && { rating }),
    ...(year && { year }),
  }
  const patchedMovieAtrributes = { ...movie, ...definedParams }
  const updatedMovie = await MoviesService.updateMovie(movie.id, patchedMovieAtrributes)
  return response.status(200).json(updatedMovie)
}

async function deleteMovie(request, response) {
  const movieId = parseInt(request.params.id)
  const deletedMovie = await MoviesService.deleteMovie(movieId)

  if (!deletedMovie) {
    return response.status(404).json({ error: `no movie with id ${movieId}` })
  }

  return response.status(200).json(deletedMovie)
}

module.exports = { getMovies, getById, createMovie, upsertMovie, modifyMovie, deleteMovie }
