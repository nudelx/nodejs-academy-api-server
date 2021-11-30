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
//TODO replace checkLegalId with our validate function
moviesRouter.get('/:id', auth, checkLegalID, getById)
moviesRouter.post('/', auth, validate('createMovie'), createMovie)
//TODO 1. add validation for movie parameters
//TODO 2. add auth middleware
moviesRouter.put('/', upsertMovie)
//TODO 1. add validation for movie parameters and id instead checkLegalID
//TODO 2. add auth middleware
moviesRouter.patch('/:id', checkLegalID, modifyMovie)
//TODO 1. add validation for movie id instead checkLegalID
//TODO 2. add auth middleware
moviesRouter.delete('/:id', checkLegalID, deleteMovie)

module.exports = moviesRouter
