const mongoose = require('mongoose')

const connDB = async () => {
    try{
        //mongoose.set('debug', true)
        await mongoose.connect(process.env.DB_URI);
    }catch (err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connDB