const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    student:{type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    amount: {type: Number, required:true},
    status:{type: String, enum:["pending","paid"],default:"pending"}
},{timestamps:true});

const Payment = mongoose.model("Payment",paymentSchema);

module.exports = {Payment};