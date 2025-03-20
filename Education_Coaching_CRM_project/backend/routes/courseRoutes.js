const express = require("express");
const {createCourse,getCourses,enrollStudent,getEnrolledStudents,getInstructor} = require("../controllers/courseController");
const {protect,instructorAuth,studentAuth} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createCourse);
router.get("/", protect, getCourses);
router.post("/:id/enroll", protect, enrollStudent);
router.get("/students/:instructorId", protect, getEnrolledStudents);
router.get("/instructor/:studentId",protect,getInstructor)

module.exports = router;