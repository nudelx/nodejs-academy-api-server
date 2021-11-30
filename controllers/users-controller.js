const { body, validationResult } = require('express-validator')
const InvalidParamError = require('./../errors/InvalidParamError')
const UsersService = require('./../services/users-service')


async function createUser(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(InvalidParamError(errors.array()[0].msg));
    }

    const { name, email, password } = req.body
    try {
        const user = await UsersService.createUser(name, email, password)
        console.log("user", user)
        const token = await UsersService.generateUserToken(user)
        res.status(201).send({ user, token })
    } catch (e) {
        next(e)
    }
}

async function loginUser(req, res, next) {
    try {
        //TODO 1. generate user's token (via UsersService)
        //TODO 2. return user and token (via UsersService)
    } catch (e) {
        //TODO 3. throw proper error
    }
}

async function logoutUser(req, res, next) {
    try {
        //TODO 1. take user from req and clean his token (via UsersService)
        //TODO 2. save user (via UsersService)
        //TODO 3. return user without token
    } catch (e) {
        //TODO 4. throw proper error
    }
}

async function deleteUser(req, res, next) {
    try {
        //TODO 1. delete user (via UserService)
        //TODO 2. send deleted user
    } catch (e) {
        //TODO 3. throw proper error
    }
}

function validate(method) {
    switch (method) {
      case 'createUser': {
        return [
          body('email', 'email dosnt exists or invalid').exists().isEmail(),
          body('name', 'name dosnt not exists or invalid').exists().isString().escape(),
          body('password', 'password doesn\'t exists').exists().isString(),
        ]
      }
    }
  }


module.exports = { createUser, loginUser, logoutUser, deleteUser, validate }