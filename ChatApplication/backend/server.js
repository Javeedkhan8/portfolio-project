const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const {Server} = require("socket.io")
const connectDB = require("./config/db.js")

require("dotenv").config();

const authRoutes = require("./routes/authRoutes.js");
const messageRoutes = require("./routes/messageRoutes.js")

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.use("/api/users",authRoutes);
app.use("/api/message",messageRoutes);

connectDB()

const io = new Server(server,{
    cors:{
        origin:"https://peaceful-melomakarona-29db18.netlify.app/",
        methods: ["GET","POST"]    
    }
});

io.on("connection",(socket) => {
    console.log("A User connected ", socket.id)

    socket.on("join",(userId) => {
        socket.join(userId);
        console.log(`user joined room : ${userId}`)
    })

    socket.on("send_message",({senderId,receiverId,text}) => {
        io.to(receiverId).emit("receive_message",{
            senderId,
            text,
            createdAt : new Date()
        })
    })
    
    socket.on("disconnected",() => {
        console.log("user disconnected")
    })
    
})


app.get("/",(req,res) => {
    res.send("Chat API is running")
})

const port = process.env.PORT

server.listen(port, () => {
    console.log(`server is running on ${port}`)
})