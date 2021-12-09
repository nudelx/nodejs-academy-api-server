function InvalidParamError(message) {
  var error = new Error(message)
  error.statusCode = 400
  error.isOperational = true
  return error
}


module.exports = InvalidParamError
