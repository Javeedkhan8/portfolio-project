import { useState } from "react";
import { createOrder, verifyPayment } from "../services/paymentServices";
import { getCurrentUser } from "../services/authServices";

const PaymentForm = ({ courseId }) => {
    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState("");
    const user = getCurrentUser();

    const handlePayment = async (e) => {
        e.preventDefault();
        try {
            const order = await createOrder(amount);

            const options = {
                key: "rzp_test_JHrZGfRIPK3PfS",
                amount: order.amount,
                currency: order.currency,
                name: "Education CRM",
                description: "Course Payment",
                order_id: order.id,
                handler: async function (response) {
                    const paymentData = {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    };

                    const verify = await verifyPayment(paymentData);
                    if (verify.message === "Payment verified successfully") {
                        setStatus("Payment Successful ");
                    } else {
                        setStatus("Payment Verification Failed");
                    }
                },
                prefill: {
                    name: user?.name || "User",
                    email: user?.email || "user@example.com",
                },
                theme: { color: "#3399cc" },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            setStatus("Payment Failed ",error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 text-center">Make Payment</h3>

                <form onSubmit={handlePayment} className="space-y-4">
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter Amount"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-base sm:text-lg"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all text-lg sm:text-xl"
                    >
                        Pay Now
                    </button>

                    {status && (
                        <p className={`text-center font-semibold mt-2 text-lg ${
                            status.includes("Successful") ? "text-green-600" : "text-red-600"
                        }`}>
                            {status}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default PaymentForm;
