const express = require("express");
require("dotenv").config();
const {connectDB} = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes")
const courseRoutes = require("./routes/courseRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { initSocket } = require("./socket/chatSocket");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/chat", chatRoutes);

const server = app.listen(port,
    () => console.log(`server running on port ${port}`));

initSocket(server)