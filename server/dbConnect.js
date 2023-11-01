const dotenv = require('dotenv');
dotenv.config();


const mongoose = require('mongoose');
// const { MongoClient, ServerApiVersion } = require('mongodb');

module.exports = async () => {

    try {
        const mongouri = process.env.MONGO_URL;
        const connect = await mongoose.connect(mongouri);
        console.log(`MongoDB connected: ${connect.connection.host}`)
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}