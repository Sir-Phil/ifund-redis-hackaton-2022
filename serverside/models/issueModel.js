const mongoose = require('mongoose');

const reviewerSchema = new mongoose.Schema({
    name: {
        type: String,
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

const issueSchema = new mongoose.Schema(
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
        image:{
            type: String,
            required: true,
        },
        reviews: [reviewerSchema],
        category: {
            type: String,
            required: true
        },
        supports: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
)

const Issues = mongoose.model('Issues', issueSchema)

module.exports = Issues