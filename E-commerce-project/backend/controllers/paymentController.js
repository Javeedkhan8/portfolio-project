const razorpay = require("../config/razorpay.js") 
const crypto = require("crypto")
const {Order} = require("../models/Order.js");
require("dotenv").config();


// Create Razorpay Order
const createOrder = async (req, res) => {
  try {
    const { amount, currency } = req.body;
    if (!amount || !currency) {
      return res.status(400).json({ message: "Missing amount or currency" });
    }
    console.log(req.body)    

    const options = {
      amount: amount * 100, 
      currency,
      receipt: `order_rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    // const newOrder = new Order({
    //   orderId: order.id,
    //   amount: order.amount,
    //   currency: order.currency,
    //   receipt: order.receipt,
    //   status: "created",
    // });

    // await newOrder.save();
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error creating Razorpay order", error });
  }
};

// Verify Payment Signature
 const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      res.json({ message: "Payment verified successfully", success: true });
    } else {
      res.status(400).json({ message: "Invalid signature", success: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Error verifying payment", error });
  }
};

module.exports = {createOrder,verifyPayment}
