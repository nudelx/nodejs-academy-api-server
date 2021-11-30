const express = require('express')
const router = new express.Router()
const auth = require('./../middleware/auth')

const {
    createUser,
    loginUser,
    logoutUser,
    deleteUser,
    validate,
  } = require('../controllers/users-controller')

/**
 * Creates user and return user with valid token
 * POST /users/ 
 * body: {
 *  "name": "Superman"
 *  "email": "superman@dc.com",
 *  "password": "superDuperPassword"
 * }
 */
router.post('', validate("createUser"), createUser)

/**
 * Login user into system and returning logged user and token
 * POST /users/login 
 * body: {
 *  "email": "superman@dc.com",
 *  "password": "superDuperPassword"
 * }
 */
router.post('/login', loginUser)

/**
 * Logout user from the system by deleting his token.
 * Pay attention it should be authenticated user 
 */
router.post('/logout', logoutUser)


/**
 * Delete user from the system at all
 * Pay attention it should be authenticated user 
 */
router.delete('/me', auth, deleteUser)

module.exports = router