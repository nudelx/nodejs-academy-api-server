const { MoviesService } = require('../services/movies-service')

function getMovies(request, response) {
  const { offset, limit } = request.query
  const allMovies = MoviesService.getAllMovies()
  let relevantMovies = allMovies.slice()

  if (offset) {
    const offset = parseInt(offset)
    relevantMovies = relevantMovies.slice(offset)
  }

  if (limit) {
    const limit = parseInt(limit)
    relevantMovies = relevantMovies.slice(0, limit)
  }

  return response.status(200).json({ movies: relevantMovies, total: relevantMovies.length })
}

function getById(request, response) {
  const { id } = request.params
  const movieId = parseInt(id)
  const movie = MoviesService.getById(movieId)

  if (!!movie) {
    return response.status(200).json(movie)
  } else {
    return response.status(404).json({ error: `movie with id ${movieId} was not found` })
  }
}

function createMovie(request, response) {
  const { title, img, synopsis, rating, year } = request.body

  if (!title) {
    return response.status(400).json({ error: 'title is a required body param' })
  }

  if (!synopsis) {
    return response.status(400).json({ error: 'synopsis is a required body param' })
  }

  if (!rating) {
    return response.status(400).json({ error: 'rating is a required body param' })
  }

  if (!year) {
    return response.status(400).json({ error: 'year is a required body param' })
  }

  const newMovie = MoviesService.createMovie({ title, img, synopsis, rating, year })
  return response.status(201).json(newMovie)
}

function upsertMovie(request, response) {
  const { title, img, synopsis, rating, year } = request.body

  if (!title) {
    return response.status(400).json({ error: 'title is a required body param' })
  }

  if (!synopsis) {
    return response.status(400).json({ error: 'synopsis is a required body param' })
  }

  if (!rating) {
    return response.status(400).json({ error: 'rating is a required body param' })
  }

  if (!year) {
    return response.status(400).json({ error: 'year is a required body param' })
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
    return response.status(404).json({ error: `movie with id ${movieId} was not found` })
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
    return response.status(404).json({ error: `movie with id ${movieId} was not found` })
  }

  return response.status(200).json(deletedMovie)
}

module.exports = { getMovies, getById, createMovie, upsertMovie, modifyMovie, deleteMovie }
