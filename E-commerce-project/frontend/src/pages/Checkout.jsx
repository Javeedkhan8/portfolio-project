import { useState } from "react";
import { createRazorpayOrder, verifyPayment } from "../services/paymentService";

const Checkout = () => {
  const [amount, setAmount] = useState();

  const handlePayment = async () => {
    const order = await createRazorpayOrder(amount);

    const options = {
      key: "rzp_test_JHrZGfRIPK3PfS",
      amount: order.amount,
      currency: "INR",
      order_id: order.id,
      handler: async function (response) {
        await verifyPayment(response);
        alert("Payment Successful!");
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Checkout</h1>

        <div className="mb-4">
          <input
            type="number"
            placeholder="Enter amount"
            value={amount || ""}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <p className="text-lg font-medium text-gray-700 mb-6">Total Amount: ₹{amount || 0}</p>

        <button
          onClick={handlePayment}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Checkout;
