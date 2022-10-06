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
//Access: Private/Admin


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
        
        title: req.body.title,
        producer: req.body.producer,
        releasedYear: req.body.releasedYear,
        
    })

    const createdMovie = await movie.save()
    res.status(201).json(createdMovie)
})

//Method: Update a Movie
//Route: PUT/api/movies/:id
//Access: private/admin

const upDateMovie = asyncHandler(async(req, res) => {
    const {
        
        title,
        producer,
        releasedYear,
    } = req.body

    const movie = await Movies.findById(req.params.id)

    if(movie) {
       
        movie.title = title
        movie.producer = producer
        movie.releasedYear = releasedYear

        const updatedMovie = await movie.save()
        res.json(updatedMovie)
    }else {
        res.status(404)
        throw new Error('Movie not found')
    }
})

//Method: Create a new review
//Route: POST/api/movies/:id/reviews
//Access: private
const createMovieReview = asyncHandler(async(req, res) => {
    const {rating, comment, weeklyMovieTarget, totalMinutesWatch} = req.body

    const movie = await Movies.findById(req.params.id)

    if(movie) {
        const alreadyViewed = movie.views.find(
            (v) => v.user.toString() === req.user._id.toString()
        )

        if(alreadyViewed){
            res.status(400)
            throw new Error('Movie Already Viewed')
        }

        const view = {
            name: req.user.name,
            totalMinutesWatch,
            weeklyMovieTarget,
            rating: Number(rating),
            comment,
            user: req.user._id,
        }

        movie.views.push(view)

        movie.rating = movie.views.reduce((acc, item) => item.rating + acc, 0)/
        movie.views.length

        await movie.save()
        res.status(201).json({message: 'Views Added'})

    }else{
        res.status(404)
        throw new Error('Movies Not found')
    }
})

//Method: Get Top rated new movies
//Route: Get/api/movies/top
//Access: public

const getTopMovie = asyncHandler(async(req, res) => {
    const movies = await Movies.find({}).sort({rating: -1}).limit(3)

    res.json(movies)
})



module.exports = {
    getMovies,
    getMovieById,
    deleteMovie,
    createMovie,
    upDateMovie,
    createMovieReview,
    getTopMovie,
}
