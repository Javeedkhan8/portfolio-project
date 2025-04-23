import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import { createRazorpayOrder, verifyPayment } from "../services/paymentService";

const BuyNowCheckout = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProductById(id).then(setProduct);
  }, [id]);

  const handlePayment = async () => {
    const totalAmount = product.price * quantity;

    setLoading(true);
    try {
      const order = await createRazorpayOrder(totalAmount); 

      const options = {
        key: "rzp_test_JHrZGfRIPK3PfS",
        amount: order.amount,
        currency: "INR",
        order_id: order.id,
        handler: async function (response) {
          await verifyPayment(response);
          alert("Payment Successful!");
        },
        prefill: {
          name: "Your Name",
          email: "your@email.com",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-4">Buy Now - {product.name}</h1>
      <p className="mb-2">Price per item: ₹{product.price}</p>
      <label className="block mb-4">
        Quantity:
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border px-3 py-2 ml-2 w-20"
        />
      </label>
      <p className="text-lg font-semibold mb-6">
        Total: ₹{product.price * quantity}
      </p>
      <button
        onClick={handlePayment}
        className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
        disabled={loading}
      >
        {loading ? "Processing..." : "Confirm Order & Pay"}
      </button>
    </div>
  );
};

export default BuyNowCheckout;
