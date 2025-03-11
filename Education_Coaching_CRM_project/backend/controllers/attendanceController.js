const {Attendance} = require("../models/Attendance");

const markAttendance = async (req, res) => {
    try {
        const { student, date, status } = req.body;
        const attendance = await Attendance.create({ student, date, status });
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ message: "Error marking attendance", error });
    }
};

const getAttendance = async (req, res) => {
    try {
        const attendanceRecords = await Attendance.find().populate("student", "name email");
        res.json(attendanceRecords);
    } catch (error) {
        res.status(500).json({ message: "Error fetching attendance records", error });
    }
};

module.exports = {markAttendance, getAttendance}