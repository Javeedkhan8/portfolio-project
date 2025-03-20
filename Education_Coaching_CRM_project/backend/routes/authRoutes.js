const express = require("express");
const {register,login,getUserRole} = require("../controllers/authController");
const {protect} = require("../middleware/authMiddleware")

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/me", protect, getUserRole);

module.exports = router;