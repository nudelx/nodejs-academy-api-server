const INITIAL_MOVIES = require('./movies.json')

class MoviesService {
  static getAllMovies() {
    return this.allMovies
  }

  static getById(id) {
    return this.getAllMovies().find((movie) => movie.id === id)
  }

  static getByTitle(title) {
    return this.getAllMovies().find((movie) => movie.title === title)
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

    this.allMovies = [...this.allMovies, newMovie]
    return newMovie
  }

  static updateMovie(id, { title, img, synopsis, rating, year }) {
    const movieIndex = this.allMovies.indexOf(this.getById(id))
    const newMovieObject = {
      id,
      title,
      img,
      synopsis,
      rating,
      year,
    }

    const newAlMovies = [...this.allMovies]
    newAlMovies[movieIndex] = newMovieObject
    this.allMovies = newAlMovies

    return newMovieObject
  }

  static deleteMovie(id) {
    const movie = this.getById(id)

    if (movie) {
      const movieIndex = this.allMovies.indexOf(movie)
      const newAllMovies = [...this.allMovies]
      newAllMovies.splice(movieIndex, 1)
      this.allMovies = newAllMovies
    }

    return movie
  }

  static init() {
    this.allMovies = [...INITIAL_MOVIES.movies]
    this.currentIndex = this.allMovies[this.allMovies.length - 1].id
  }

  static getNextIndex() {
    return ++this.currentIndex
  }
}

MoviesService.init()

module.exports = { MoviesService }
