const InvalidMovieParamError = require('../errors/InvalidMovieParamError')
const InternalError = require('../errors/InvalidMovieParamError')
const { body, validationResult } = require('express-validator')
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

async function getById(request, response, next) {
  const { id } = request.params
  const movieId = parseInt(id, 10)
  try {
    const movie = await MoviesService.getMovie(movieId, request.user)
    if (!!movie) {
      return response.status(200).json(movie)
    } else {
      return response.status(404).json({ error: `no movie with id ${movieId}` })
    }
  } catch (e) {
    next(e)
  }
}

async function createMovie(request, response, next) {
  const errors = validationResult(request)
  if (!errors.isEmpty()) {
    return next(InvalidMovieParamError(errors.array()[0].msg));
  }

  const { title, img, synopsis, rating, year } = request.body
  const user = request.user
  const newMovie = await MoviesService.createMovie({ title, img, synopsis, rating, year }, user)
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
    const updatedMovie = await MoviesService.updateMovie(movie.movie_id, { title, img, synopsis, rating, year })
    return response.status(200).json(updatedMovie)
  } else {
    const newMovie = await MoviesService.createMovie({ title, img, synopsis, rating, year })
    return response.status(201).json(newMovie)
  }
}

async function modifyMovie(request, response) {
  const movieId = parseInt(request.params.id)
  const movie = await MoviesService.getMovie(movieId)
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
  const updatedMovie = await MoviesService.updateMovie(movie.movie_id, patchedMovieAtrributes)
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


function validate(method) {
  switch (method) {
    case 'createMovie': {
      return [
        body('title', 'title doesn\'t exists').exists().isString().escape(),
        body('img', 'img is not exists or not valid url').exists().isURL(),
        body('synopsis', 'synopsis doesn\'t exists').exists().isString().escape(),
        body('rating', 'rating doesn\'t exists or not numeric').exists().isNumeric(),
        body('year', 'year doesn\'t exists or not numeric').exists().isNumeric(),
      ]
    }
  }
}


module.exports = { getMovies, getById, createMovie, upsertMovie, modifyMovie, deleteMovie, validate }
