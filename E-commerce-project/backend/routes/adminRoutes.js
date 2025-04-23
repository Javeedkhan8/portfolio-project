const express = require("express")
const { protect, adminOnly }  = require("../middlewares/authMiddleware")

const router = express.Router();

// Example admin-only route
router.get("/dashboard", protect, adminOnly, (req, res) => {
  res.json({ message: "Welcome Admin" });
});

module.exports =  router;
