const {Course} = require("../models/Course");
const {Attendance} = require("../models/Attendance");
const { User } = require("../models/User");

const getInstructorCourses = async (req, res) => {
    try {
        const instructorId = req.user.id;

        const courses = await Course.find({ instructor: instructorId });
        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};



const getInstructorAttendance = async (req, res) => {
    try {
        const instructorId = req.user._id;

        // Find attendance records where the instructor is present
        const attendance = await Attendance.find({ instructor: instructorId })
            .populate("course", "title") // Populate course details
            .select("-student"); // Exclude student field

        res.json(attendance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching instructor attendance" });
    }
};

const getInstructors = async (req,res) => {
    try{
        const instructors = await User.find({role:"instructor"}).select("-password");
        res.json(instructors)
    } catch(error){
        res.status(500).json({message:"Error fetching",error})
    }
}



module.exports = {getInstructorCourses,getInstructorAttendance,getInstructors}