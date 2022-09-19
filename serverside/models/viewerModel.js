const mongoose = require('mongoose');

const viewersSchema = mongoose.Schema({

    viewerID:{
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    weeklyMovieTarget: {
        type: Number,
        required: true,
    },
    totalMinutesWatch:{
        type: Number,
        required: true,
    }
},
{
 timestamps: true,
}

)

const Viewers = mongoose.model('Viewers', viewersSchema)

module.exports = Viewers