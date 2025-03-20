const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // Nullable for instructor
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // New field
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    status: { type: String, enum: ["Present", "Absent", "Late"], required: true },
},{ timestamps: true });

const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = { Attendance };
