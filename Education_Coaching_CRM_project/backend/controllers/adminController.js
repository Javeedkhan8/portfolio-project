const {User} = require("../models/User");
const {Payment} = require("../models/Payment");
const {Attendance} = require("../models/Attendance");


const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
};

const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching payments" });
    }
};

const getReports = async (req, res) => {
    try {
        const totalStudents = await User.countDocuments({ role: "student" });
        const totalPayments = await Payment.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]);
        const totalAttendance = await Attendance.countDocuments();

        res.json([
            { title: "Total Students", value: totalStudents },
            { title: "Total Payments", value: totalPayments.length ? totalPayments[0].total : 0 },
            { title: "Total Attendance", value: totalAttendance },
        ]);
    } catch (error) {
        res.status(500).json({ message: "Error fetching reports" });
    }
};


module.exports = {getUsers,getPayments,getReports}