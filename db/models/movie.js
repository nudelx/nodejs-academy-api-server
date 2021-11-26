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
    movie_id: Number,
    title: String, // {type: String}
    img: String,
    synopsis: String,
    rating: Number,
    year: Number,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})


module.exports = mongoose.model('Movie', movieSchema)
