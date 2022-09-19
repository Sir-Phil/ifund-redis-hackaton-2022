const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema(
    {
        movieID: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true,
        },
        producer: {
            type: String,
            required: true,
        },
        releasedYear: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

const Movies = mongoose.model('Movies', moviesSchema)

module.exports = Movies