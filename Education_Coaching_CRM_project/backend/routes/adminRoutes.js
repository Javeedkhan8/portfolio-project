const express = require("express");
const { getUsers, getPayments, getReports } = require("../controllers/adminController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/users", protect, isAdmin, getUsers);
router.get("/payments", protect, isAdmin, getPayments);
router.get("/reports", protect, isAdmin, getReports);

module.exports = router;
