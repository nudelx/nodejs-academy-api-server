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
  const movieId = parseInt(request.params.id)
  const movie = MoviesService.getById(movieId)

  if (!!movie) {
    response.status(200).json(movie)
    return
  } else {
    response.status(404).json({ error: `movie with id ${movieId} was not found` })
    return
  }
}

function createMovie(request, response) {
  const { title, img, synopsis, rating, year } = request.body

  if (!title) {
    response.status(400).json({ error: 'title is a required body param' })
    return
  }

  if (!synopsis) {
    response.status(400).json({ error: 'synopsis is a required body param' })
    return
  }

  if (!rating) {
    response.status(400).json({ error: 'rating is a required body param' })
    return
  }

  if (!year) {
    response.status(400).json({ error: 'year is a required body param' })
    return
  }

  const newMovie = MoviesService.createMovie({ title, img, synopsis, rating, year })
  response.status(201).json(newMovie)
  return
}

function upsertMovie(request, response) {
  const { title, img, synopsis, rating, year } = request.body

  if (!title) {
    response.status(400).json({ error: 'title is a required body param' })
    return
  }

  if (!synopsis) {
    response.status(400).json({ error: 'synopsis is a required body param' })
    return
  }

  if (!rating) {
    response.status(400).json({ error: 'rating is a required body param' })
    return
  }

  if (!year) {
    response.status(400).json({ error: 'year is a required body param' })
    return
  }

  const movie = MoviesService.getByTitle(title)
  const doesMovieExist = !!movie

  if (doesMovieExist) {
    const updatedMovie = MoviesService.updateMovie(movie.id, { title, img, synopsis, rating, year })
    response.status(200).json(updatedMovie)
    return
  } else {
    const newMovie = MoviesService.createMovie({ title, img, synopsis, rating, year })
    response.status(201).json(newMovie)
    return
  }
}

function modifyMovie(request, response) {
  const movieId = parseInt(request.params.id)
  const movie = MoviesService.getById(movieId)
  const doesMovieExist = !!movie

  if (!doesMovieExist) {
    response.status(404).json({ error: `movie with id ${movieId} was not found` })
    return
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
  response.status(200).json(updatedMovie)
  return
}

function deleteMovie(request, response) {
  const movieId = parseInt(request.params.id)
  const deletedMovie = MoviesService.deleteMovie(movieId)

  if (!deletedMovie) {
    response.status(404).json({ error: `movie with id ${movieId} was not found` })
    return
  }

  response.status(200).json(deletedMovie)
  return
}

module.exports = { getMovies, getById, createMovie, upsertMovie, modifyMovie, deleteMovie }
