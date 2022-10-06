const asyncHandler = require('express-async-handler');
const User = require('../models/usersModel');
const { param } = require('../routes/movieRoutes');
const generatorToken = require('../util/generatorToken');


//Method: Auth user and get token
//Routes: Post/api/users/login
//Access Public

const authUser = asyncHandler(async(req, res) => {
    const{email, password} = req.body

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generatorToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

//Method: Create user
//Route: POST/api/user/
//Access: Public
const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body

    const userExits = await User.findOne({email})

    if(userExits){
        res.status(400)
        throw new Error('User Already Exists')
    }
    const user = await User.create({
        name,
        email,
        password,
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generatorToken(user._id),
        })
    }else {
        res.status(400)
        throw new Error('Invalid User data')
    }
})

//Method: Get user profile
//Routes: Get/api/users/profile
//Access Private
const getUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)

    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }else {
        res.status(404)
        throw new Error('User not Found')
    }
})

const updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)

    if(user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generatorToken(user._id),
        })
    }else {
        res.status(404)
        throw new Error('User not found')
    }
})


//Method: Get all user
//Route: Get/api/users 
//Access: public

const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find({})
    res.json({users})
})

//Method: Get single user
//Route: Get/api/user/:id
//Access: public

const getUserById = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id).select('-password');

    if(user){
        res.json(user)
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})



//Method: Delete user
//Route: DELETE/api/users/:id
//Access: private/admin

const deleteUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)

    if(user){
        await user.remove()
        res.json({message: 'User Removed successfully'})
    }else {
        res.status(404)
        throw new Error({message: 'User not found'})
    }
})

//Method: Update a users
//Route: PUT/api/users/:id
//Access: private/admin

const updateUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)

    if(user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin

        const updatedUser = await user.save()

    res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
    })
    }else {
        res.status(404)
        throw new Error('User not Found')
    }

    
})

module.exports = {
    authUser,
    getUserProfile,
    updateUserProfile,
    registerUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
}

