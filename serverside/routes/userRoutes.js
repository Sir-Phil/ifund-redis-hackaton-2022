const express = require('express');
const { 
    getUsers, 
    getUserById, 
    deleteUser, 
    updateUser, 
    registerUser, 
    authUser, 
    getUserProfile, 
    updateUserProfile } = require('../controllers/usersController');
const router = express.Router();
const {protect, admin} = require('../middleware/authMiddleware')


router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/').get(protect, admin, getUsers).post(registerUser);
router.route('/:id').get(protect, admin, getUserById).delete(protect, admin, deleteUser).put(protect, admin,updateUser)

module.exports = router