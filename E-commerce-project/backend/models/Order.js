const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [
      {
        name: String,
        qty: Number,
        image: String,
        price: Number,
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      },
    ],
    shippingAddress: { type: String, required: true }, 
    paymentMethod: { type: String, required: true }, 
    paymentStatus: { type: String, default: "Pending" },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

const Order =  mongoose.model("Order", orderSchema);

module.exports = {Order}
