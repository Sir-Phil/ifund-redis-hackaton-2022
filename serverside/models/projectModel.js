import mongoose from 'mongoose'

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

export default Projects;