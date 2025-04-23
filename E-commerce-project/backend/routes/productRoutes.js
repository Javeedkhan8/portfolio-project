const express = require("express")
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../controllers/productController.js")
const { protect, adminOnly } = require("../middlewares/authMiddleware.js")

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin routes
router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect,adminOnly,deleteProduct);

module.exports =  router;
