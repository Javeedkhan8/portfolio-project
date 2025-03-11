const {User} = require("../models/User");

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

module.exports = {getStudents,getStudentById,updateStudent}