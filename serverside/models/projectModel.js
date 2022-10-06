const mongoose = require('mongoose');

const reviewProject = mongoose.Schema(
    {
        name: {type: String, required: true},
        rating: {type: Number, required: true},
        comment: {type: String, required: true},
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
)

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    imageurls: [],

    description: {
        type: String,
        reuired: true,
    },
    
},
{
    timestamps: true,
}
)

const Projects = mongoose.model('Projects', projectSchema)

module.exports = Projects