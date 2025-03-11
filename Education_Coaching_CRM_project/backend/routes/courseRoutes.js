const express = require("express");
const {createCourse,getCourses,enrollStudent} = require("../controllers/courseController");
const {protect} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createCourse);
router.get("/", protect, getCourses);
router.post("/:id/enroll", protect, enrollStudent);

module.exports = router;