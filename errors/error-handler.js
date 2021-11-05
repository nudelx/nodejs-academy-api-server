
function errorHandler() {
  this.handleError = (err, res) => {
    if (res) {
      return res.status(err.statusCode).json({ error: err.message })
    }
  }
  this.isTrustedError = (error) => {
    return error.isOperational
  }
}
module.exports.handler = new errorHandler()
