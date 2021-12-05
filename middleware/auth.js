const jwt = require('jsonwebtoken')
const { User } = require('../db')
const log = require('../utils/logger')
const auth = async (req, res, next) => {
  try {
    log('Auth MDW', 'auth')
    const token = req.header('Authorization').replace('Bearer ', '')
    log(`Auth MDW - token: ${token}`, 'auth')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { _id } = decoded
    const user = await User.findOne({ _id, token })
    if (!user) {
      throw new Error('Authorization user not found')
    }
    req.user = user
    req.token = token
    next()
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate' })
  }
}

module.exports = auth