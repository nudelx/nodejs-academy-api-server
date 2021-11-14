const mongoose = require('mongoose')
const { Schema } = mongoose

// String
// Number
// Boolean | Bool
// Array
// Buffer
// Date
// ObjectId | Oid
// Mixed

// https://mongoosejs.com/docs/api.html#schema_Schema.Types
const movieSchema = new Schema({
    title: String, // {type: String}
    img: String,
    synopsis: String,
    rating: Number,
    year: Number
})

module.exports = mongoose.model('Movie', movieSchema)