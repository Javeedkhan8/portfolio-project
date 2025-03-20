const express = require("express");
require("dotenv").config();
const {connectDB} = require("./config/db");
const cors = require("cors");
const port = process.env.PORT
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes")
const instructorRoutes = require("./routes/instructorRoutes")
const adminRoutes = require("./routes/adminRoutes")
const courseRoutes = require("./routes/courseRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const chatRoutes = require("./routes/chatRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const { initSocket } = require("./socket/chatSocket");
const http = require("http");
const { setSocketInstance } = require("./controllers/enrollmentController");


connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/instructor", instructorRoutes);
app.use("/api/admin",adminRoutes)
app.use("/api/courses", courseRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api", enrollmentRoutes);


const server = http.createServer(app);

 const io = initSocket(server);

 setSocketInstance(io)

server.listen(port,
    () => console.log(`server running on port ${port}`));

