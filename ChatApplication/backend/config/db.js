const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        const user = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected")
    } catch (error) {
        console.log("Error occured : ", error.message)
    }
}

module.exports = connectDB