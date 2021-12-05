const jwt = require('jsonwebtoken');
const { User}  = require('../db')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const { _id } = decoded
        const user = await User.findOne({ _id, 'tokens.token': token })

        if (!user) {
            throw new Error("Authorization user not found" )
        }
        req.user = user
        req.token = token
        next()
    } catch (e) {
        res.status(401).send({ error: "Please authenticate" })
    }
}


module.exports = auth