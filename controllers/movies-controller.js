const InvalidMovieParamError = require('../errors/InvalidParamError')
const InternalError = require('../errors/InvalidParamError')
const { body, param, validationResult } = require('express-validator')
const MoviesService = require('../services/movies-service')
const DEFAULT_OFFSET = 0
const DEFAULT_LIMIT = 20

async function getMovies(request, response, next) {
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
    next(err)
  }
}

async function getById(request, response, next) {
  const errors = validationResult(request)
  if (!errors.isEmpty()) {
    return next(InvalidMovieParamError(errors.array()[0].msg));
  }

  const { id } = request.params
  const movieId = parseInt(id, 10)
  console.log("User", request.user)
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
  const errors = validationResult(request)
  if (!errors.isEmpty()) {
    return next(InvalidMovieParamError(errors.array()[0].msg));
  }

  const { title, img, synopsis, rating, year } = request.body

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

async function modifyMovie(request, response, next) {
  const errors = validationResult(request)
  if (!errors.isEmpty()) {
    return next(InvalidMovieParamError(errors.array()[0].msg));
  }

  const movieId = parseInt(request.params.id)
  const movie = await MoviesService.getMovie(movieId, request.user)
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

async function deleteMovie(request, response, next) {
  const errors = validationResult(request)
  if (!errors.isEmpty()) {
    return next(InvalidMovieParamError(errors.array()[0].msg));
  }

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
    case 'getById': {
      return [
        param('id', "Invalid id").exists().isNumeric()
      ]
    }
    case 'deleteMovie': {
      return [
        param('id', "Invalid id").exists().isNumeric()
      ]
    }
    case 'upsertMovie': {
      return [
        body('title', 'title doesn\'t exists').exists().isString().escape(),
        body('img', 'img is not exists or not valid url').exists().isURL(),
        body('synopsis', 'synopsis doesn\'t exists').exists().isString().escape(),
        body('rating', 'rating doesn\'t exists or not numeric').exists().isNumeric(),
        body('year', 'year doesn\'t exists or not numeric').exists().isNumeric(),
      ]
    }
    case 'modifyMovie': {
      return [
        param('id', "Invalid id").exists().isNumeric(),
        body('title', 'title doesn\'t exists').optional().isString().escape(),
        body('img', 'img is not exists or not valid url').optional().isURL(),
        body('synopsis', 'synopsis doesn\'t exists').optional().isString().escape(),
        body('rating', 'rating doesn\'t exists or not numeric').optional().isNumeric(),
        body('year', 'year doesn\'t exists or not numeric').optional().isNumeric(),
      ]
    }
  }
}


module.exports = { getMovies, getById, createMovie, upsertMovie, modifyMovie, deleteMovie, validate }
