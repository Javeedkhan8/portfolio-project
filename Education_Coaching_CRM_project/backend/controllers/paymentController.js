const {Payment} = require("../models/Payment")
const {sendEmail} = require("../config/email");

const createPayment = async (req,res) => {
    try{
        const {student, amount,status} = req.body;
        const payment = await Payment.create({student,amount,status})

        if(status === "pending"){
            sendEmail(student.email, "payment Due", "Your payment is pending. Please pay soon.");
        }

        res.json(payment);
    } catch(error) {
        res.status(500).json({message:"Error processing payment", error})
    }
}

const getPayment = async (req,res) => {
    try{
        const payments = await Payment.find().populate("student","name email");
        res.json(payments) 
    } catch(error){
        res.status(500).json({message :'Error fetching payments', error})
    }
}

const updatePaymentStatus = async (req,res) => {
    try{
        const payment = await Payment.findByIdAndUpdate(req.params.id,req.body,{new:true});

        if(req.body.status === "paid"){
            sendEmail(payment.student.email,"Your payment has been received. Thankyou")
        }
        res.json(payment)
    } catch(error){
        res.status(500).json({message:"Error updating payment status",error})
    }
}

module.exports = {createPayment, getPayment, updatePaymentStatus}