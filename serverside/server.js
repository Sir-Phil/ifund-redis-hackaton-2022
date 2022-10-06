const express = require("express");
const DBconnect = require("./config/db_config");
const dotenv = require('dotenv');

const projectRoutes = require('./routes/projectsRoutes')
const movieRoutes = require('./routes/movieRoutes')
const userRoutes = require('./routes/userRoutes')

//DB activation
DBconnect();
dotenv.config();
const server = express();


server.use(express.json());
server.use('/api/projects/', projectRoutes);
server.use('/api/movies/', movieRoutes );
server.use('/api/users', userRoutes)



const port = process.env.PORT || 2022;

//app listening to Database on port 2022
server.listen(
    port, () => 
    console.log(`Dedicated ${port} server running on ${process.env.NODE_ENV}...`)
);