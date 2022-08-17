import asyncHandler from 'express-async-handler';
import Projects from '../models/projectModel';


//Method: Fetch all projects
//Route: Get /api/projects
//Access: Public 
const getAllProjects = asyncHandler(async(req, res)  => {
    const projects = await Projects.find({})
    res.json({projects})
})

//Method: Fetch a single projects
//Route: Get /api/projects/:id
//Access: Public 
const getProjectById = asyncHandler(async(req, res) => {
    const project = await Projects.findById(req.param.id)

    if(project){
        res.json(project)
    } else{
        res.status(404)
        throw new Error("product Not Found")
    }
})


//Method: Delete a projects
//Route: Delete/api/projects/:id
//Access: Private/Admin

const deleteProject = asyncHandler(async(req, res) => {
    const project = await Projects.findById(req.param.id)

    if(project){
        await project.remove()
        res.json({message: "Product Removed"})
    }else {
        res.status(404)
        throw new Error("Product Not Found")
    }
})

//Method: Fetch all projects
//Route: Get /api/projects
//Access: Public 

export {
    getAllProjects,
    getProjectById,
    deleteProject
}