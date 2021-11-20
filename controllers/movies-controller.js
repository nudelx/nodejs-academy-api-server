const InvalidMovieParamError = require('../errors/InvalidMovieParamError')
const InternalError = require('../errors/InvalidMovieParamError')
const MoviesService = require('../services/movies-service')
const DEFAULT_OFFSET = 0
const DEFAULT_LIMIT = 20

async function getMovies(request, response) {
  let { offset, limit } = request.query

  if (offset) {
    offset = parseInt(offset, 10) || DEFAULT_OFFSET
  } else {
    offset = DEFAULT_OFFSET
  }

  if (limit) {
    limit = parseInt(limit, 10) || DEFAULT_LIMIT
  } else {
    limit = DEFAULT_LIMIT
  }

  try {
    const movies = await MoviesService.getAllMovies(offset, limit)
    return response.status(200).json({ movies, total: movies.length })
  } catch (err) {
    throw InternalError("Failed to get movies from DB")
  }
}

function getById(request, response) {
  const { id } = request.params
  const movieId = parseInt(id, 10)
  const movie = MoviesService.getMovie(movieId)

  if (!!movie) {
    return response.status(200).json(movie)
  } else {
    return response.status(404).json({ error: `no movie with id ${movieId}` })
  }
}

function createMovie(request, response, next) {
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

  const newMovie = MoviesService.createMovie({ title, img, synopsis, rating, year })
  return response.status(201).json(newMovie)
}

function upsertMovie(request, response, next) {
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

  const movie = MoviesService.getByTitle(title)
  const doesMovieExist = !!movie

  if (doesMovieExist) {
    const updatedMovie = MoviesService.updateMovie(movie.id, { title, img, synopsis, rating, year })
    return response.status(200).json(updatedMovie)
  } else {
    const newMovie = MoviesService.createMovie({ title, img, synopsis, rating, year })
    return response.status(201).json(newMovie)
  }
}

function modifyMovie(request, response) {
  const movieId = parseInt(request.params.id)
  const movie = MoviesService.getById(movieId)
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
  const updatedMovie = MoviesService.updateMovie(movie.id, patchedMovieAtrributes)
  return response.status(200).json(updatedMovie)
}

function deleteMovie(request, response) {
  const movieId = parseInt(request.params.id)
  const deletedMovie = MoviesService.deleteMovie(movieId)

  if (!deletedMovie) {
    return response.status(404).json({ error: `no movie with id ${movieId}` })
  }

  return response.status(200).json(deletedMovie)
}

module.exports = { getMovies, getById, createMovie, upsertMovie, modifyMovie, deleteMovie }
