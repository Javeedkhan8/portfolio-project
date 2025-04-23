import API from "./api";

export const createRazorpayOrder = async (amount) => {
  const { data } = await API.post("/payments/order", { amount, currency: "INR" });
  return data;
};

export const verifyPayment = async (paymentData) => {
    const { data } = await API.post("/payments/verify", paymentData);
    return data;
  };
