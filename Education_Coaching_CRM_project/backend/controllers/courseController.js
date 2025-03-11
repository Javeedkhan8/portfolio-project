const {Course} = require("../models/Course")

const createCourse = async (req,res) => {
    try{
        const {title,description,instructor,students = []} = req.body;
        const course = await Course.create({title,description,instructor,students});
        res.json(course)
    } catch(error){
        res.status(500).json({message: "Error creating course",error})
    }
}

const getCourses = async(req,res) => {
    try{
        const courses = await Course.find().populate("instructor","name email");
        res.json(courses)
    }catch(error){
        res.status(500).json({message: "Error fetching courses", error})
    }
}

const enrollStudent = async (req,res) => {
    try{
        const {studentId} = req.body;
        const course = await Course.findById(req.params.id);

        if(!course) return res.status(404).json({message:"Course not found"});

        course.students.push(studentId);
        await course.save()

        res.json({message:"Student enrolled sucessfully",course})
    } catch(error){
        res.status(500).json({message:"Error enrolling student", error})
    }
}

module.exports = {createCourse,getCourses,enrollStudent}