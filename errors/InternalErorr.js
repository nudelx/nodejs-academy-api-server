function InternalError(message) {
    var error = new Error(message)
    error.statusCode = 500
    error.isOperational = true
    return error
}


module.exports = InternalError
