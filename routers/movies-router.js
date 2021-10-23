const express = require('express')
const { getMovies } = require('../controllers/routers-controller')

const moviesRouter = new express.Router()

moviesRouter.get('/', getMovies)

module.exports = { moviesRouter }
