const express = require("express")
const { createOrder, getAllOrders, getOrderById } = require("../controllers/orderController.js")
const { protect, adminOnly } = require("../middlewares/authMiddleware.js")


const router = express.Router();

router.post("/", protect, createOrder);
router.get("/:id", protect, getOrderById);
router.get("/", protect, adminOnly, getAllOrders); // Admin only

module.exports =  router;
