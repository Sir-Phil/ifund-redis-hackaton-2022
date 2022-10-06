const mongoose = require('mongoose');

const viewersSchema = new mongoose.Schema({
    name: {
        type: String,
         required: true,
    },
    weeklyMovieTarget: {
        type: Number,
        required: true,
    },
    totalMinutesWatch:{
        type: Number,
        required: true,
    },
   comment: {
    type: String,
    required: true,
   },
    rating: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
},
{
    timestamps: true
}
)

const moviesSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title: {
            type: String,
            required: true,
        },
        views: [viewersSchema],
        rating:{
            type: Number,
            default: 0,
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