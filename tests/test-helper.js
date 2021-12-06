const { server } = require('../server')
const User = require('../db/models/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const INITIAL_MOVIES = require('../services/movies.json')
const sinon = require("sinon").createSandbox()
const dbDocArray = [...INITIAL_MOVIES.movies]
dbDocArray.skip = sinon.spy()
dbDocArray.limit = sinon.spy()


beforeEach(() => {
  //TODO you find it :) Uncomment it and see that some tests back to work. some of them still need to be fixed
  // sinon.stub(User, "findOne").returns(User({ name: "yoni", email: "bubu", password: "sdadd", token: "asdasd" }))
  // sinon.stub(jwt, "verify").returns({})
  sinon.stub(mongoose)
})

afterEach(() => {
  sinon.restore()
})

after(async () => {
  console.log('here')
  server.close()
})


module.exports = {
  sinon,
  dbDocArray
}