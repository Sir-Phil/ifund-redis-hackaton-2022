const mongoose = require('mongoose');
const DBconnect = require("./config/db_config")
const movies = require("./Data/movies")
const dotenv = require('dotenv')
const Movies = require("./models/movieModel")

dotenv.config();

DBconnect();

const dataImport = async () => {
    
    try{

        await Movies.deleteMany()

        // const moviesSample = await Movies.insertMany(movies)

        const moviesSample = movies.map((movie) => {
            return{ ...movie}
        })
    
        await Movies.insertMany(moviesSample)

        console.log('Data Imported Successfully!')
        process.exit()
    }catch(error){
        console.error(`${error}`)
        process.exit(1)
    } 
}

const dataDestroy = async () => {
    try
    {
        await Movies.deleteMany()

        console.log('Data Destroyed!')
        process.exit()

    }catch (error){
        console.error(`${error}`)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    dataDestroy()
}else{
    dataImport()
}