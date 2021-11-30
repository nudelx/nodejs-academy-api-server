const User = require('./../db/models/user')

async function createUser(name, email, password) {
    const user = new User({ name, password, email })
    const savedUser = await user.save()
    return user
}

async function generateUserToken(user) {
    return await user.generateAuthToken()
}



module.exports = {
    createUser,
    generateUserToken,
}