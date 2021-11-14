const supertest = require('supertest')
const { expect } = require('chai')
const { app } = require('../../server')
const { Movie } = require('../../db')
const INITIAL_MOVIES = require('../../services/movies.json')
const { sinon, dbDocArray } = require('../test-helper')


describe('Movies Controller', () => {
  describe('GET /movies', function () {
    context('without query params', () => {
      it('should have status code 200', async function () {
        const mock = sinon.stub(Movie, "find").returns(dbDocArray)
        const response = await supertest(app).get('/movies').expect(200)
        expect(mock.calledOnce).to.be.true

        expect(response.body).to.exist
        expect(response.body.movies).to.be.an('array').with.lengthOf(INITIAL_MOVIES.movies.length)
      })
    })

    context('with query params', () => {
      context('when limit=10 and offset=10', () => {
        it('should return 10 items', async () => {
          sinon.stub(Movie, "find").returns(dbDocArray)
          const response = await supertest(app).get('/movies?limit=10&offset=20').expect(200)
          expect(dbDocArray.skip.calledWith(20)).to.be.true
          expect(dbDocArray.limit.calledWith(10)).to.be.true
          expect(response.body).to.exist
          expect(response.body.movies).to.be.an('array')
        })
      })
    })
  })

  describe('GET /movies/:id', function () {
    context('when correct id is given', () => {
      it('should have status code 200 with the correct movie object', async function () {
        const existingMovie = dbDocArray[dbDocArray.length - 1]
        sinon.stub(Movie, "findOne").withArgs({ movie_id: existingMovie.movie_id }).returns(existingMovie)
        const response = await supertest(app).get(`/movies/${existingMovie.movie_id}`).expect(200)

        expect(response.body).to.exist
        expect(response.body.movie_id).to.eq(existingMovie.movie_id)
        expect(response.body.title).to.eq(existingMovie.title)
        expect(response.body.img).to.eq(existingMovie.img)
        expect(response.body.synopsis).to.eq(existingMovie.synopsis)
        expect(response.body.rating).to.eq(existingMovie.rating)
        expect(response.body.year).to.eq(existingMovie.year)
      })
    })

    context('when id of movie doesnt exist', () => {
      it('should return status code 404', async () => {
        const id = 999
        sinon.stub(Movie, "findOne").withArgs().returns(undefined)
        const response = await supertest(app).get(`/movies/${id}`).expect(404)

        expect(response.body).to.exist
        expect(response.body.error).to.eq(`no movie with id ${id}`)
      })
    })
  })

  describe('POST /movies', function () {
    context('when this is a valid new movie', () => {
      it('should create a new movie object', async function () {
        const existingMovie = dbDocArray[dbDocArray.length - 1]
        const lastId = existingMovie.movie_id
        sinon.stub(Movie, "findOne").withArgs({}, {}, { sort: { movie_id: -1 } }).returns(existingMovie)
        sinon.stub(Movie.prototype, "save").returns({})


        const newMovieDetails = {
          title: 'new movie title',
          img: 'new movie img',
          synopsis: 'new movie synopsis',
          rating: 5,
          year: 2021,
        }

        const response = await supertest(app).post('/movies').send(newMovieDetails).expect(201)

        expect(response.body).to.exist
        expect(response.body.movie_id).to.be.greaterThan(lastId)
        expect(response.body.title).to.eq(newMovieDetails.title)
        expect(response.body.img).to.eq(newMovieDetails.img)
        expect(response.body.synopsis).to.eq(newMovieDetails.synopsis)
        expect(response.body.rating).to.eq(newMovieDetails.rating)
        expect(response.body.year).to.eq(newMovieDetails.year)
      })
    })
    context('when this is an invalid movie object', () => {
      it('should return InvalidMovieParamError', async function () {
        const newMovieDetails = {}
        const response = await supertest(app).post('/movies').send(newMovieDetails).expect(400)

        expect(response.body).to.exist
        expect(response.body.error).to.exist
      })
    })
  })

  describe('PUT /movies', function () {
    context('when this is a new movie', () => {
      it('should create a new movie object', async function () {
        const existingMovie = dbDocArray[dbDocArray.length - 1]
        const lastId = existingMovie.movie_id
        const stub = sinon.stub(Movie, "findOne")
        stub.onCall(0).returns(undefined)
        stub.onCall(1).returns(existingMovie)
        sinon.stub(Movie.prototype, "save").returns({})

        const newMovieDetails = {
          title: 'new movie title',
          img: 'new movie img',
          synopsis: 'new movie synopsis',
          rating: 5,
          year: 2021,
        }
        const response = await supertest(app).put('/movies').send(newMovieDetails).expect(201)

        expect(response.body).to.exist
        expect(response.body.movie_id).to.be.greaterThan(lastId)
        expect(response.body.title).to.eq(newMovieDetails.title)
        expect(response.body.img).to.eq(newMovieDetails.img)
        expect(response.body.synopsis).to.eq(newMovieDetails.synopsis)
        expect(response.body.rating).to.eq(newMovieDetails.rating)
        expect(response.body.year).to.eq(newMovieDetails.year)
      })
    })

    context('when the name of the movie already exists', () => {
      it('should replace the movie with the new movie object and keep its id', async () => {
        const existingMovie = dbDocArray[dbDocArray.length - 1]
        const newImg = 'updated movie img'
        const newSynopsis = 'updated movie synopsis'
        const newRating = 5
        const newYear = 2021
        sinon.stub(Movie, "findOne").withArgs({ title: existingMovie.title }).returns(existingMovie)
        const updatedMovieDetails = {
          movie_id: existingMovie.movie_id,
          title: existingMovie.title,
          img: newImg,
          synopsis: newSynopsis,
          rating: newRating,
          year: newYear,
        }
        sinon.stub(Movie, "findOneAndReplace")
          .withArgs({ movie_id: existingMovie.movie_id },
            {
              title: existingMovie.title,
              img: newImg,
              synopsis: newSynopsis,
              rating: newRating,
              year: newYear
            }).returns(updatedMovieDetails)

        const response = await supertest(app).put('/movies').send(updatedMovieDetails).expect(200)

        expect(response.body).to.exist
        expect(response.body.title).to.eq(existingMovie.title)
        expect(response.body.movie_id).to.eq(existingMovie.movie_id)
        expect(response.body.img).to.eq(updatedMovieDetails.img)
        expect(response.body.synopsis).to.eq(updatedMovieDetails.synopsis)
        expect(response.body.rating).to.eq(updatedMovieDetails.rating)
        expect(response.body.year).to.eq(updatedMovieDetails.year)
      })
    })
  })

  describe('PATCH /movies/:id', function () {
    context('when id of movie doesnt exist', () => {
      it('should return status code 404', async () => {
        sinon.stub(Movie, "findOne").withArgs(999).returns(undefined)
        const response = await supertest(app).patch('/movies/999').send({}).expect(404)

        expect(response.body).to.exist
        expect(response.body.error).to.eq(`no movie with id 999`)
      })
    })

    context('when the movie exists', () => {
      it('should update the movie details', async () => {
        const existingMovie = dbDocArray[dbDocArray.length - 1]
        sinon.stub(Movie, "findOne").withArgs({ movie_id: existingMovie.movie_id }).returns(existingMovie)

        const newRating = 5
        const newYear = 2021
        const partialUpdatedMovieDetails = {
          rating: newRating,
          year: newYear,
        }
        const updatedMovieDetails = {
          movie_id: existingMovie.movie_id,
          title: existingMovie.title,
          img: existingMovie.img,
          synopsis: existingMovie.synopsis,
          rating: newRating,
          year: newYear,
        }
        sinon.stub(Movie, "findOneAndReplace")
          .withArgs({ movie_id: existingMovie.movie_id },
            {
              title: existingMovie.title,
              img: existingMovie.img,
              synopsis: existingMovie.synopsis,
              rating: newRating,
              year: newYear
            }).returns(updatedMovieDetails)

        const response = await supertest(app)
          .patch(`/movies/${existingMovie.movie_id}`)
          .send(partialUpdatedMovieDetails)
          .expect(200)

        expect(response.body).to.exist
        expect(response.body.movie_id).to.eq(existingMovie.movie_id)
        expect(response.body.title).to.eq(existingMovie.title)
        expect(response.body.img).to.eq(existingMovie.img)
        expect(response.body.synopsis).to.eq(existingMovie.synopsis)
        expect(response.body.rating).to.eq(updatedMovieDetails.rating)
        expect(response.body.year).to.eq(updatedMovieDetails.year)
      })
    })
  })

  describe('DELETE /movies/:id', function () {
    context('when id of movie doesnt exist', () => {
      it('should return status code 404', async () => {
        const idToDelete = 999
        sinon.stub(Movie, "findOneAndDelete").withArgs({ movie_id: idToDelete }).returns(undefined)
        const response = await supertest(app).delete(`/movies/${idToDelete}`).send({}).expect(404)

        expect(response.body).to.exist
        expect(response.body.error).to.eq(`no movie with id ${idToDelete}`)
      })
    })

    context('when the movie exists', () => {
      it('should remove the movie', async () => {
        const existingMovie = dbDocArray[dbDocArray.length - 1]
        const stub = sinon.stub(Movie, "findOneAndDelete").withArgs({ movie_id: existingMovie.movie_id })
        stub.onFirstCall().returns(existingMovie)
        stub.onSecondCall().returns(undefined)
        const response = await supertest(app).delete(`/movies/${existingMovie.movie_id}`).expect(200)

        expect(response.body).to.exist
        expect(response.body.movie_id).to.eq(existingMovie.movie_id)

        // expect not to find it when it's queried
        await supertest(app).delete(`/movies/${existingMovie.id}`).expect(404)
      })
    })
  })
})
