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
moviesRouter.get('/:id', auth, checkLegalID, getById)
moviesRouter.post('/', auth, validate('createMovie'), createMovie)
moviesRouter.put('/', upsertMovie)
moviesRouter.patch('/:id', checkLegalID, modifyMovie)
moviesRouter.delete('/:id', checkLegalID, deleteMovie)

module.exports = moviesRouter
