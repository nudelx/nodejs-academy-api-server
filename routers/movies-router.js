const express = require('express')
const {
  getMovies,
  getById,
  createMovie,
  upsertMovie,
  modifyMovie,
  deleteMovie,
} = require('../controllers/routers-controller')

const moviesRouter = express.Router()

moviesRouter.get('/', getMovies)
moviesRouter.get('/:id', getById)
moviesRouter.post('/', createMovie)
moviesRouter.put('/', upsertMovie)
moviesRouter.patch('/:id', modifyMovie)
moviesRouter.delete('/:id', deleteMovie)

module.exports = { moviesRouter }
