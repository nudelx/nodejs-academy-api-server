const INITIAL_MOVIES = require('./movies.json')

class MoviesService {
  static getAllMovies() {
    return this.allMovies
  }

  static getById(id) {
    return this.getAllMovies().find((movie) => movie.id === id)
  }

  static createMovie({ title, img, synopsis, rating, year }) {
    const newMovie = {
      id: this.getNextIndex(),
      title,
      img,
      synopsis,
      rating,
      year,
    }

    this.allMovies.push(newMovie)
    return newMovie
  }

  static init() {
    this.allMovies = [].concat(INITIAL_MOVIES.movies)
    this.currentIndex = this.allMovies[this.allMovies.length - 1].id
  }

  static getNextIndex() {
    return ++this.currentIndex
  }
}

MoviesService.init()

module.exports = { MoviesService }
