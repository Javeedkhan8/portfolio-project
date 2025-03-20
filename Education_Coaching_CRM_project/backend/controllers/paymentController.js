// const {Payment} = require("../models/Payment")
// const {sendEmail} = require("../config/email");

// const createPayment = async (req,res) => {
//     try{
//         const {student, amount,status} = req.body;
//         const payment = await Payment.create({student,amount,status})

//         if(status === "pending"){
//             sendEmail(student.email, "payment Due", "Your payment is pending. Please pay soon.");
//         }

//         res.json(payment);
//     } catch(error) {
//         res.status(500).json({message:"Error processing payment", error})
//     }
// }

// const getPayment = async (req,res) => {
//     try{
//         const payments = await Payment.find().populate("student","name email");
//         res.json(payments) 
//     } catch(error){
//         res.status(500).json({message :'Error fetching payments', error})
//     }
// }

// const updatePaymentStatus = async (req,res) => {
//     try{
//         const payment = await Payment.findByIdAndUpdate(req.params.id,req.body,{new:true});

//         if(req.body.status === "paid"){
//             sendEmail(payment.student.email,"Your payment has been received. Thankyou")
//         }
//         res.json(payment)
//     } catch(error){
//         res.status(500).json({message:"Error updating payment status",error})
//     }
// }

// module.exports = {createPayment, getPayment, updatePaymentStatus}

const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


const createOrder = async (req, res) => {
    try {
        const { amount, currency } = req.body;
        const options = {
            amount: amount * 100, 
            currency,
            receipt: `order_rcptid_${Math.random().toString(36).substring(7)}`,
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Failed to create order", error });
    }
};


const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const generatedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature === razorpay_signature) {
            res.status(200).json({ message: "Payment verified successfully" });
        } else {
            res.status(400).json({ message: "Invalid payment signature" });
        }
    } catch (error) {
        res.status(500).json({ message: "Payment verification failed", error });
    }
};

module.exports = {createOrder,verifyPayment}