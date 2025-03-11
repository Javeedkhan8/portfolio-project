const mongoose = require("mongoose")
require("dotenv").config();

const connectDB = async() => {
    try{
        const user = await mongoose.connect(process.env.MONGO_URI,{
        });
        console.log("MongoDB connected")
    }catch(error){
        console.log(`Error : ${error.message}`)
        process.exit(1)
    }
}

module.exports = {connectDB}
