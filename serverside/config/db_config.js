const mongoose = require('mongoose');


const DBconnect = async () => {
    try {
        const con = await mongoose.connect('mongodb+srv://sirphil:sirphilapp@cluster0.f3efb.mongodb.net/test', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        
        console.log('Database Connected Successfully(MongoDB)')

    }catch(error){
        console.error('An Error Occuered While Connecting To DB')
        process.exit(1)
    }
    
}

module.exports = DBconnect
