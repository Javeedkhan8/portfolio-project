const express = require("express");
const {sendMessage,getMessages} = require("../controllers/chatController");
const {protect} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/send", protect, sendMessage);
router.get("/:senderId/:receiverId", protect, getMessages);

module.exports = router;