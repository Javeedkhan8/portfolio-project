const {User} = require("../models/User");
const {Course} = require("../models/Course");
const {Enrollment} = require("../models/Enrollment")

const getStudents = async (req,res) => {
    try{
        const students = await User.find({role: "student"}).select("-password");
        res.json(students)
    } catch(error){
        res.status(500).json({message: "Error fetching",error})
    }
}

const getStudentById = async (req,res) => {
    try{
        const student = await User.findById(req.params.id).select("-password");
        if(!student) return res.status(404).json({message : "Student not found"});

        res.json(student)
    } catch(error){
        res.status(500).json({message:'Error fetching student', error});
    }
}

const updateStudent = async (req,res) => {
    try{
        const student = await User.findByIdAndUpdate(req.params.id, req.body,{new: true});
        res.json(student)
    } catch (error){
        res.status(500).json({message : "Error updating student", error})
    }
}


// const getStudentCourses = async (req, res) => {
//     try {
//         console.log("Extracted user from request:", req.user);

//         if (!req.user || !req.user._id) {
//             return res.status(401).json({ message: "Unauthorized: User not authenticated" });
//         }

//         const studentId = req.user._id;
//         console.log("Fetching enrolled courses for student ID:", studentId);

        
//         const enrollments = await Enrollment.find({ student: studentId }).populate("course");
//         console.log("Enrollments found:", enrollments);

//         if (!enrollments.length) {
//             return res.json([]); 
//         }

        
//         const courses = enrollments.map(enrollment => enrollment.course);
//         console.log("Courses found:", courses);

//         res.json(courses);
//     } catch (error) {
//         console.error("Error fetching student courses:", error);
//         res.status(500).json({ message: "Internal server error", error: error.message });
//     }
// };

const getStudentCourses = async (req,res) => {
    try{
        const studentId = req.user.id;

        const courses = await Course.find({ students : studentId})
        res.json(courses);
    } catch(error){
        console.error(error);
        res.status(500).json({message : "Server error"})
    }
}


module.exports = {getStudents,getStudentById,updateStudent,getStudentCourses}