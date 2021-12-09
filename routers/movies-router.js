const express = require('express')
const checkLegalID = require('../middleware/checkLegalID')
const auth = require('./../middleware/auth')

const {
  getMovies,
  getById,
  createMovie,
  upsertMovie,
  modifyMovie,
  deleteMovie,
  validate,
} = require('../controllers/movies-controller')

const moviesRouter = express.Router()

moviesRouter.get('/', auth, getMovies)
moviesRouter.get('/:id', auth, validate("getById"), getById)
moviesRouter.post('/', auth, validate('createMovie'), createMovie)
moviesRouter.put('/', auth, validate('upsertMovie'), upsertMovie)
moviesRouter.patch('/:id', auth, validate('modifyMovie'), modifyMovie)
moviesRouter.delete('/:id', auth, validate('deleteMovie'), deleteMovie)

module.exports = moviesRouter
