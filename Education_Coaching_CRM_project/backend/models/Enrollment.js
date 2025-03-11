const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
    student: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    course: {type: mongoose.Schema.Types.ObjectId, ref:"Course",required:true},
    status: {type: String, enum: ["active", "completed"],default: "active"},
},{timestamps: true});

module.exports = {enrollmentSchema};