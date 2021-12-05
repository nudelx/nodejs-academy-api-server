const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const {JWT_SECRET} = process.env

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
    validate(value) {
      if (value === 'password') {
        throw new Error("Password can't contain word password")
      }
    },
  },
  token: String,
})

//hash the plain text password before saving
userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('Unable to login')
  }
  return user
}

userSchema.methods.generateAuthToken = async function (...args) {
    console.log('args', args)
    console.log('JWT_SECRET', JWT_SECRET)
  if (!JWT_SECRET) { 
      
      throw new Error("JWT_SECRET cannot be null")
    }
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, JWT_SECRET)
  console.log('token', token)
  user.token = token
  await user.save()
  return token
}

const User = mongoose.model('User', userSchema)

module.exports = User
