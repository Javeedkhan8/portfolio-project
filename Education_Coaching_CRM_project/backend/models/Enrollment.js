const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    status: { type: String, enum: ["active", "completed"], default: "active" },
    enrolledAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

module.exports = { Enrollment };
