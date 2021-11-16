const { MongoClient } = require('mongodb')
const { DB_USER, DB_PASS, DB_HOST } = process.env
const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/moviesDb?retryWrites=true&w=majority`
const client = new MongoClient(uri)

const listDatabases = async (client) => {
  databasesList = await client.db().admin().listDatabases()

  console.log('Databases:')
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`))
}

  const createListing = async (client, newListing) => {
  const result = await client
    .db('moviesDb')
    .collection('movies')
    .insertOne(newListing)
  console.log(`New listing created with the following id: ${result.insertedId}`)
}

const connect = async () => {
  try {
    await client.connect()

    await listDatabases(client)
    await createListing(client, {title: 'JOPA'})
  } catch (e) {
    console.error(e)
  }
}
connect()

module.exports = {
  client,
}
