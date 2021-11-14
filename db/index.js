const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename)
const models = {}

fs.readdirSync(path.join(__dirname, 'models'))
  .filter((file) => file.slice(-3) === '.js')
  .forEach((file) => {
    const modelPath = path.join(__dirname, 'models', file)
    console.log(` 🍃 Loading - DB::MODEL::${modelPath}`)
    const model = require(modelPath)
    models[model.modelName] = model
  })

const connect = async () => {
  const { DB_USER, DB_PATH } = process.env
  // try {
  //   await mongoose.connect(
  //     `mongodb+srv://${DB_USER}:${DB_PATH}@cluster0.bb7jy.mongodb.net/moviesDb?retryWrites=true&w=majority`
  //   )
  //   console.log(` 🍃 mongo-db connected`)

  return mongoose
    .connect(
      `mongodb+srv://${DB_USER}:${DB_PATH}@cluster0.bb7jy.mongodb.net/moviesDb?retryWrites=true&w=majority`
    )
    .then(() => console.log(` 🍃 mongo-db connected`))
    .catch(console.log)
  // const { Movie } = models
  // // example of new movie record
  // const newMovie = new Movie({
  //   title: 'StarWars',
  //   img: 'https://m.media-amazon.com/images/M/MV5BYTRhNjcwNWQtMGJmMi00NmQyLWE2YzItODVmMTdjNWI0ZDA2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg',
  //   synopsis:
  //     'Two Jedi escape a hostile blockade to find allies and come across a young boy who may bring balance to the Force, but the long dormant Sith resurface to claim their original glory.',
  //   rating: 5555,
  //   year: 1999,
  // })
  // newMovie.save()
  // } catch (e) {
  //   console.log(e)
  // }
}

const loadAllData = function (moviesJson) {
  const { Movie } = models
  if (Array.isArray(moviesJson)) {
    Movie.collection
      .deleteMany({})
      .then(console.log)
      .then(Movie.collection.insertMany(moviesJson))
      .then(() => console.log(' 🍃  db reset done '))
      .catch(console.log)
  } else {
    throw new Error('Movie::Insert expected moviesJson to be array of movies')
  }
}

connect()

module.exports = { db: mongoose, ...models, connect, loadAllData }
