const express = require("express");
const DBconnect = require("./config/db_config");
const dotenv = require('dotenv');
const morgan = require("morgan");
const cors = require('cors');



const projectRoutes = require('./routes/projectsRoutes')
const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/userRoutes');
const issuesRoutes = require('./routes/issuesRoutes')
const uploaderRoutes = require('./routes/uploaderRoutes');



dotenv.config();

//DB activation


DBconnect();
const server = express();

if(process.env.NODE_ENV === 'development'){
    server.use(morgan('dev'))
}

server.use(express.json());
server.use(cors({ origin: 'http://127.0.0.1/'}))


server.use('/api/orders/', orderRoutes)
server.use('/api/projects/', projectRoutes);
server.use('/api/movies/', movieRoutes ) ;
server.use('/api/users/', userRoutes);
server.use('/api/issues/', issuesRoutes);
server.use('api/upload', uploaderRoutes )



const PORT = process.env.PORT || 2022;

//app listening to Database on port 2022
server.listen(
    PORT, () => 
    console.log(`Dedicated ${PORT} server running on ${process.env.NODE_ENV}...`)
    
);