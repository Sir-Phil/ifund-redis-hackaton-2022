const { request } = require('express')
const asyncHandler = require('express-async-handler')
const Movies = require('../models/movieModel')

//Method: Get all Movies
//Route: Get/api/movies 
//Access: public

const getMovies = asyncHandler(async(req, res) => {
    const movies = await Movies.find({})
    res.json({movies})
})

//Method: Get single Movie
//Route: Get/api/movies/:id 
//Access: public

const getMovieById= asyncHandler(async(req, res) => {
    const movie = await Movies.findById(req.params.id)

    if(movie){
        res.json(movie)
    }else{
        res.status(404)
        throw new Error('Movie Not Found')
    }
})

//Method: Delete a Movie
//Route: Get/api/movies/:id
//Access: public


const deleteMovie = asyncHandler(async(req, res) => {
    const movie = await Movies.findById(req.params.id)
    

    if(movie){
        await movie.remove()
        res.json({message: 'Movie Removed'})
    }else {
        res.status(404)
        throw new Error("Product Not Found")
    }
})

//Method: Create a Movie
//Route: POST/api/movies
//Access: private/admin

const createMovie = asyncHandler(async(req, res) => {
    const movie = new Movies({
        
        movieID: req.body.movieID,
        title: req.body.title,
        producer: req.body.producer,
        releasedYear: req.body.releasedYear,
        
    })

    const createdMovie = await movie.save()
    res.status(201).json(createdMovie)
})



module.exports = {
    getMovies,
    getMovieById,
    deleteMovie,
    createMovie,
}
