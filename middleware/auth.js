const jwt = require('jsonwebtoken')
const { User } = require('../db')
const log = require('../utils/logger')
const { JWT_SECRET } = process.env
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    log(`Auth MDW - Token: ${token ? 'exist' : 'not exist'}`, 'auth')
    !JWT_SECRET && log(`Auth MDW - JWT_SECRET is not defined `, 'bad')
    const decoded = jwt.verify(token, JWT_SECRET)
    const { _id } = decoded
    const user = await User.findOne({ _id, token })
    if (!user) {
      log(`Auth MDW - no user`, 'auth')
      throw new Error('Authorization user not found')
    }
    req.user = user
    req.token = token
    log('Auth MDW - Authorization completed' , 'auth')
    next()
  } catch (e) {
    log('Auth MDW - Authorization Error' , 'bad')
    res.status(401).send({ error: 'Please authenticate' })
  }
}

module.exports = auth
