const mongoose = require('mongoose');

const DBconnect = async () => {
    try {
        //to be use for atlas.
        //'mongodb+srv://sirphil:sirphilapp@cluster0.f3efb.mongodb.net/test'
        const con = await mongoose.connect('mongodb://localhost:27017/trackerDB',process.env.MONGO_PATH,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        })
        
        console.log('Database Connected Successfully(MongoDB)')

    }catch(error){
        console.error('Experiencing An Error While Connecting To DB')
        process.exit(1)
    }
    
};

module.exports = DBconnect
