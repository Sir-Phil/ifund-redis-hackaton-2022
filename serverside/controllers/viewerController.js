const asyncHandler = require('express-async-handler');
const Viewers = require('../models/viewerModel');
const { param } = require('../routes/movieRoutes');


//Method: Get all Viewer
//Route: Get/api/viewers 
//Access: public

const getViewers = asyncHandler(async(req, res) => {
    const viewers = await Viewers.find({})
    res.json({viewers})
})

//Method: Get single viewer
//Route: Get/api/viewers/:id
//Access: public

const getViewerById = asyncHandler(async(req, res) => {
    const viewer = await Viewers.findById(req.param.id);
})


module.exports = {
    getViewers,
}

