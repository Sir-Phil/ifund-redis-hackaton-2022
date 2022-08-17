const express = require("express");
const DBconnect = require("./config/db_config");


//DB activation
DBconnect
const appserv = express();
appserv.use(express.json());



const PORT =process.env.PORT || 2022

//app listening to Database on port 2022
appserv.listen(
    PORT, () => 
    console.log('Dedicated Port 2022 server runing...')
)