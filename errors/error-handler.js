
function errorHandler() {
  this.handleError = (err, res) => {
    if (res && res.headersSent) {
      return next(err)
    }
    if (res.isOperational && res) {
      return res.status(err.statusCode).json({ error: err.message })
    }
    process.exit(1)
  }
}

module.exports.handler = new errorHandler()