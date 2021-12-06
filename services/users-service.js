const User = require('./../db/models/user')

async function createUser(name, email, password) {
    const user = new User({ name, password, email })
    const savedUser = await user.save()
    return user
}

async function generateUserToken(user) {
    return await user.generateAuthToken()
}

async function findUser(email, password) {
    const user = await User.findByCredentials(email, password)
    return user
}

async function cleanToken(user) {
    user.token = undefined
    return await user.save()
}

async function deleteUser(user) {
    const result = await User.deleteOne({ _id: user.id })
    return result.deletedCount
}



module.exports = {
    createUser,
    generateUserToken,
    cleanToken,
    deleteUser,
    findUser
}