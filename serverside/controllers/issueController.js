const asyncHandler = require('express-async-handler')
const Issues = require('../models/issueModel')

//Method: Get all Issues
//Route: Get/api/issues 
//Access: public

const getIssues = asyncHandler(async(req, res) => {

    const pageSize = 10
    const page = Number(req.query)

    const keyword = req.query.keyword 
    ? {
        name: 
        {$regex: req.query.keyword, 
            $options: 'i',
        },
        } 
    : {}

    const count = await Issues.countDocuments({ ...keyword })
    const issues = await Issues.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

    res.json({issues, page, pages: Math.ceil(count / pageSize) })
})

//Method: Get single issue
//Route: Get/api/issue/:id 
//Access: public

const getIssueById= asyncHandler(async(req, res) => {
    const issues = await Issues.findById(req.params.id)

    if(issues){
        res.json(issues)
    }else{
        res.status(404)
        throw new Error('Issues Not Found')
    }
})

//Method: Delete a Issue
//Route: Get/api/Issue/:id
//Access: Private/Admin


const deleteIssue = asyncHandler(async(req, res) => {
    const issue = await Issues.findById(req.params.id)
    

    if(issue){
        await issue.remove()
        res.json({message: 'Issue Removed'})
    }else {
        res.status(404)
        throw new Error("Issue Not Found")
    }
})

//Method: Create a Issue
//Route: POST/api/issues
//Access: private/admin

const createIssue = asyncHandler(async(req, res) => {
    const issue = new Issues({

        // title: 'Ecosystem',
        // createdAt: Date.now(),
        // supports: 'UNESCO',
        // category: 'Global Warning',
        // description: 'support the to secure the ecosystem',
        // user: req.user._id,
        // image: '/images/sample.com',

        title: req.body.title,
        createdAt: req.body.createdAt,
        supports: req.body.supports,
        category: req.body.category,
        description: req.body.description,
        user: req.user._id,
        image: req.body.image,
    })

    const createdIssue = await issue.save()
    res.status(201).json(createdIssue)
})

//Method: Update a Issue
//Route: PUT/api/issue/:id
//Access: private/admin

const upDateIssue = asyncHandler(async(req, res) => {
    const {
        
        title,
        createdAt,
        category,
        description,
        supports,
       
    } = req.body

    const issue = await Issues.findById(req.params.id)

    if(issue) {
       
        issue.title = title
        issue.supports = supports
        issue.createdAt = createdAt
        issue.category = category
        issue.description = description

        const updatedIssue = await issue.save()
        res.json(updatedIssue)
    }else {
        res.status(404)
        throw new Error('Issue not found')
    }
})

//Method: Create a new review
//Route: POST/api/issue/:id/views
//Access: private
const createIssueReview = asyncHandler(async(req, res) => {
    const {rating, comment } = req.body

    const issue = await Issues.findById(req.params.id)

    if(issue) {
        const alreadyViewed = issue.views.find(
            (v) => v.user.toString() === req.user._id.toString()
        )

        if(alreadyViewed){
            res.status(400)
            throw new Error('Issue Already Viewed')
        }

        const view = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        }

        issue.views.push(view)

        issue.rating = issue.views.reduce((acc, item) => item.rating + acc, 0)/
        issue.views.length

        await issue.save()
        res.status(201).json({message: 'Issues Added'})

    }else{
        res.status(404)
        throw new Error('Issue Not found')
    }
})

//Method: Get Top rated new issue
//Route: Get/api/issue/top
//Access: public

const getTopIssue = asyncHandler(async(req, res) => {
    const issue = await Issues.find({}).sort({rating: -1}).limit(3)

    res.json(issue)
})



module.exports = {
    getIssues,
    getIssueById,
    deleteIssue,
    createIssue,
    upDateIssue,
    createIssueReview,
    getTopIssue,
}
