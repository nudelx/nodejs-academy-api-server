const { MongoClient } = require('mongodb')
const { DB_USER, DB_PASS, DB_HOST } = process.env
const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/moviesDb?retryWrites=true&w=majority`
const client = new MongoClient(uri)

const movieMock = {
  title: 'test',
  img: 'path/to/image.png',
  synopsis: 'loremipsum',
  rating: 2222,
  year: 14243,
}
const movieFactory = (movie) => ({ ...movieMock, ...movie })

const listDatabases = async (client) => {
  databasesList = await client.db().admin().listDatabases()
  console.log('Databases:')
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`))
}

const createListing = async (client, newListing) => {
  const result = await client.db('moviesDb').collection('movies').insertOne(newListing)

  console.log(`New listing created with the following id: ${result.insertedId}`)
}

async function updateMovieByTitle(client, title, update) {
  const result = await client
    .db('moviesDb')
    .collection('movies')
    .updateOne({ title }, { $set: update })
  console.log(`${result.matchedCount} document(s) matched the query criteria.`)
  console.log(`${result.modifiedCount} document(s) was/were updated.`)
}

async function findMovieByTitle(client, title) {
  re = new RegExp(title, 'i')
  console.log(re)
  const result = await client.db('moviesDb').collection('movies').findOn({ title: re })

  if (result) {
    console.log(`Found a movie by '${title}':`)
    console.log(result)
  } else {
    console.log(`No movie found with the title '${title}'`)
  }
}
async function findMovieManyByTitle(client, title) {
  re = new RegExp(title, 'i')
  console.log(re)
  const cursor = await client.db('moviesDb').collection('movies').find({ title: re })

  if (cursor) {
    console.log(`Found a movie by '${title}':`)
    const res = await cursor.toArray();
    console.log(res)
  } else {
    console.log(`No movie found with the title '${title}'`)
  }
}


async function deleteMovieByTitle(client, title) {
  const result = await client.db('moviesDb')
  .collection('movies')
  .deleteOne({ title })
  console.log(`${result.deletedCount} document(s) was/were deleted.`)
}

const connect = async () => {
  try {
    await client.connect()

    // await listDatabases(client)
    // const newMovie = movieFactory({
    //   title: 'Episode II',
    //   img: 'path/to/image.png',
    //   synopsis: 'Attack of the Clones',
    //   rating: 6.5,
    //   year: 1999,
    // })
    // await createListing(client, newMovie)

    // findMovieManyByTitle(client, 'Epi')
    // deleteMovieByTitle(client, 'Episode II')
    // findMovieManyByTitle(client, 'Epi')
    // updateMovieByTitle(client, 'Episode I', { rating: 9, year: 2000 })
  } catch (e) {
    console.error(e)
  }
}
connect()

module.exports = {
  client,
}
