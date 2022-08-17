const express = require('express')
const router = express.Router()

const { 
    getAllProjects, 
    getProjectById, 
    deleteProject } = require('../controllers/projectController')


router.route('/').get(getAllProjects)
router.route('/:id').get(getProjectById)
router.route('/:id').delete(deleteProject)


module.exports = router