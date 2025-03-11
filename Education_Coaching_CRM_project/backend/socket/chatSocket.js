const { Server } = require("socket.io");

const initSocket = (server) => {
    const io = new Server(server, {cors: {origin: "*"}});

    io.on("connection",(socket) => {
        console.log("User connected: ", socket.id);

        socket.on("sendMessage",(data) => {
            io.emit("receiveMessage", data);
        })
    })
    return io;
}

module.exports = {initSocket}