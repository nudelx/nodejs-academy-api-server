const INITIAL_MOVIES = require('./movies.json')

class MoviesService {
  static allMovies = [].concat(INITIAL_MOVIES.movies)

  static getAllMovies() {
    return this.allMovies
  }
}

module.exports = { MoviesService }
