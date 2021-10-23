const INITIAL_MOVIES = require('./movies.json')

class MoviesService {
  static allMovies = [].concat(INITIAL_MOVIES.movies)
  static currentIndex = this.allMovies[this.allMovies.length - 1].id + 1

  static getAllMovies() {
    return this.allMovies
  }
}

module.exports = { MoviesService }
