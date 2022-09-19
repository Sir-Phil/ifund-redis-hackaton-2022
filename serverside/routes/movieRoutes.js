const express = require('express');
const { getMovies, getMovieById, deleteMovie, createMovie } = require('../controllers/movieController');
const router = express.Router();


router.route('/').get(getMovies);
router.route('/:id').get(getMovieById)
router.route('/:id').delete(deleteMovie)
router.route('/').post(createMovie)


module.exports = router