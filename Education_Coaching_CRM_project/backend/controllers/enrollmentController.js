const Enrollment = require("../models/Enrollment");

let io; 

const setSocketInstance = (socketInstance) => {
    io = socketInstance; 
};

// Enroll a student in a course
const enrollStudent = async (req, res) => {
    try {
        const { studentId, courseId } = req.body;

        // Validate IDs
        if (!studentId || !courseId) {
            return res.status(400).json({ message: "Student ID and Course ID are required." });
        }

        // Check if IDs are valid MongoDB ObjectIds
        const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);
        if (!isValidObjectId(studentId) || !isValidObjectId(courseId)) {
            return res.status(400).json({ message: "Invalid Student ID or Course ID." });
        }

        // Check if enrollment already exists
        const existingEnrollment = await Enrollment.findOne({ student: studentId, course: courseId });
        if (existingEnrollment) {
            return res.status(400).json({ message: "Student is already enrolled in this course." });
        }

        // Create a new enrollment
        const newEnrollment = new Enrollment({ student: studentId, course: courseId });
        await newEnrollment.save();

        res.status(201).json({ message: "Enrollment successful", enrollment: newEnrollment });
    } catch (error) {
        console.error("Enrollment Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


module.exports = { enrollStudent, setSocketInstance };
