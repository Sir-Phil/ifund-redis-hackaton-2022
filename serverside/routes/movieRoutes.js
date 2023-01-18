const express = require('express');
const { getMovies, getMovieById, deleteMovie, createMovie, upDateMovie, getTopMovie, createMovieReview } = require('../controllers/movieController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();




router.route('/').get(getMovies).post(protect, admin, createMovie);
router.route('/:id').get(getMovieById).delete(protect, admin, deleteMovie).put(protect, admin, upDateMovie);
router.get('/top',getTopMovie);
router.route('/:id/views').post(protect, createMovieReview)
// router.route('/:id').delete(deleteMovie)
// router.route('/').post(createMovie)
// router.route('/:id').put(upDateMovie)


module.exports = router