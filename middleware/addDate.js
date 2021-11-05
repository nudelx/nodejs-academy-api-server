const addDate = (req, res, next) => {
    req.date = new Date()
    next()
}
module.exports = addDate
