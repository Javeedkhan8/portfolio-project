const express = require("express");
const {getInstructorCourses,getInstructorAttendance,getInstructors} = require("../controllers/instructorController");
const {protect,instructorAuth} = require("../middleware/authMiddleware");



const router = express.Router();

router.get("/courses", protect, instructorAuth, getInstructorCourses);
router.get("/attendance", protect, instructorAuth, getInstructorAttendance);
router.get("/",protect,getInstructors)


module.exports = router