const addResponseHeader =  (req, res, next) => {
    res.setHeader('X-Powered-By', 'unknown')
    next()
}
module.exports = addResponseHeader
