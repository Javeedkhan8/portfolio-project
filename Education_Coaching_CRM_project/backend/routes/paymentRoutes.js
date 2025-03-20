// const express = require("express");
// const {createPayment,getPayment,updatePaymentStatus} = require("../controllers/paymentController");
// const {protect} = require("../middleware/authMiddleware");

// const router = express.Router()

// router.post("/", protect, createPayment);
// router.get("/", protect, getPayment);
// router.put("/:id", protect, updatePaymentStatus);

// module.exports = router

const express = require("express");
const {createOrder,verifyPayment} = require("../controllers/paymentController");

const router = express.Router();

router.post("/order", createOrder);
router.post("/verify", verifyPayment);

module.exports = router