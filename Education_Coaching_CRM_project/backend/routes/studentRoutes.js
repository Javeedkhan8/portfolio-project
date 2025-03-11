const express = require("express");
const {getStudents,getStudentById,updateStudent} = require("../controllers/studentController");
const {protect} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/",protect,getStudents);
router.get("/:id",protect,getStudentById);
router.put("/:id",protect,updateStudent);

module.exports = router;