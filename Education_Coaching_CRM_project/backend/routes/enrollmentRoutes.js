const express = require("express");
const { enrollStudent } = require("../controllers/enrollmentController");

const router = express.Router();

// Route for student enrollment
router.post("/enroll", enrollStudent);

module.exports = router;
