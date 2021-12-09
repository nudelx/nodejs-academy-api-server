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
        const { email, password } = req.body
        const user = await UsersService.findUser(email, password)
        const token = await UsersService.generateUserToken(user)
        res.status(200).send({ user, token })
    } catch (e) {
        next(e)
    }
}

async function logoutUser(req, res, next) {
    try {
        const user = await UsersService.cleanToken(req.user)
        res.status(200).send({ user })
    } catch (e) {
        next(e)
    }
}

async function deleteUser(req, res, next) {
    try {
        const countDeleted = await UsersService.deleteUser(req.user)
        if (countDeleted > 0) {
            res.status(200).send({ uses: req.user })
        } else {
            throw Error(`Failed to delete user ${req.user.id}`)
        }
    } catch (e) {
        next(e)
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