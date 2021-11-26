function Unauthorized(message) {
    var error = new Error(message)
    error.statusCode = 403
    error.isOperational = true
    return error
  }
  
  
  module.exports = Unauthorized