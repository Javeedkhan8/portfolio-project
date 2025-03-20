const express = require("express");
const {getStudents,getStudentById,updateStudent,getStudentCourses} = require("../controllers/studentController");
const {protect,studentAuth} = require("../middleware/authMiddleware");

const router = express.Router();


router.get("/courses", protect, studentAuth, getStudentCourses);
router.get("/",protect,getStudents);
router.get("/:id",protect,getStudentById);
router.put("/:id",protect,updateStudent);


module.exports = router;