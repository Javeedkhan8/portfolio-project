const {Course} = require("../models/Course")
const { User } = require("../models/User")
const {Enrollment} = require("../models/Enrollment")

const createCourse = async (req,res) => {
    try{
        const {title,description,instructor,students = []} = req.body;
        const course = await Course.create({title,description,instructor,students});
        res.json(course)
    } catch(error){
        res.status(500).json({message: "Error creating course",error})
    }
}

const getCourses = async (req, res) => {
    try {
        const courses = await Course.find()
            .populate("instructor", "name") 
            .populate("students", "name");  

        res.json(courses);
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ message: "Failed to fetch courses" });
    }
};


const enrollStudent = async (req, res) => {
    try {
        const { studentId } = req.body;
        const course = await Course.findById(req.params.id);
        const student = await User.findById(studentId);

        if (!course) return res.status(404).json({ message: "Course not found" });
        if (!student) return res.status(404).json({ message: "Student not found" });

        // Check if student is already enrolled
        const existingEnrollment = await Enrollment.findOne({ student: studentId, course: course._id });
        if (existingEnrollment) {
            return res.status(400).json({ message: "Student is already enrolled in this course" });
        }

        // Create Enrollment Entry
        await Enrollment.create({ student: studentId, course: course._id });

        // Update student's courses list
        student.courses.push(course._id);
        await student.save();

        // Update course's student list
        course.students.push(studentId);
        await course.save();

        res.json({ message: "Student enrolled successfully", course });
    } catch (error) {
        console.error("Error enrolling student:", error);
        res.status(500).json({ message: "Error enrolling student", error });
    }
};



const getEnrolledStudents = async (req, res) => {
    try {
        const instructorId = req.params.instructorId;
        console.log("🔍 Fetching students for Instructor:", instructorId);

        const courses = await Course.find({ instructor: instructorId }).populate("students", "name");

        if (!courses.length) {
            return res.status(404).json({ message: "No students found" });
        }

        
        const studentSet = new Map();
        courses.forEach(course => {
            course.students.forEach(student => {
                studentSet.set(student._id.toString(), student);
            });
        });

        const uniqueStudents = Array.from(studentSet.values());
        console.log("✅ Unique Students List:", uniqueStudents);

        res.json(uniqueStudents);
    } catch (error) {
        console.error("❌ Error fetching students:", error);
        res.status(500).json({ message: "Error fetching students", error });
    }
};


const getInstructor = async (req, res) => {
    try {
        const studentId = req.params.studentId;
        console.log("🔍 Fetching instructors for student:", studentId);

        // Find all courses where the student is enrolled
        const courses = await Course.find({ students: studentId })
            .populate("instructor", "name _id")
            .exec();

        if (!courses.length) {
            return res.status(404).json({ message: "No instructors found" });
        }

        // Extract unique instructors
        const uniqueInstructors = [];
        const seen = new Set();

        courses.forEach((course) => {
            if (course.instructor && !seen.has(course.instructor._id.toString())) {
                seen.add(course.instructor._id.toString());
                uniqueInstructors.push({ _id: course.instructor._id, name: course.instructor.name });
            }
        });

        res.json(uniqueInstructors);
    } catch (error) {
        console.error("❌ Error fetching instructors:", error);
        res.status(500).json({ message: "Error fetching instructors", error });
    }
};





module.exports = {createCourse,getCourses,enrollStudent,getEnrolledStudents,getInstructor}