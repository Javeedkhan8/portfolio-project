const express = require("express");

const app = express();

app.get("/",(req,res) => {
    res.send("Hello world ")
})

let PORT = 2005

app.listen(PORT,() => {
    console.log(`server Starts ${PORT}`)
})

const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        const user = await mongoose.connect("url");
        console.log("connected")
    }
    catch(error){
        console.log("Error Occured : ",error.message )
    }
}
