const { Server } = require("socket.io");

const initSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "https://lovely-moxie-b11887.netlify.app",
            methods: ["GET", "POST"],
            credentials: true,
        },
        transports: ["websocket", "polling"],
    });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("sendMessage", (data) => {
            socket.broadcast.emit("receiveMessage", data);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });

    return io;
};

module.exports = { initSocket };
