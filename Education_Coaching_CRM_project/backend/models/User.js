const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{type: String, required:true},
    email:{type:String, unique:true, required:true},
    password:{type: String, required:true},
    role:{type: String, enum: ["student","instructor","admin"],required: true},
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    assignedInstructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // Only for students
},{timestamps:true});

const User = mongoose.model("User",userSchema);

module.exports = { User };