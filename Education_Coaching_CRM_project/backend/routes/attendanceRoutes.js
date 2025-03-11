const express = require("express");
const {markAttendance,getAttendance} = require("../controllers/attendanceController");
const {protect} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, markAttendance);
router.get("/", protect, getAttendance);

module.exports = router;