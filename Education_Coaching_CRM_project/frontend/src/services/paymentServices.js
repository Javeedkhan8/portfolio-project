import axios from "axios";


const API_URL = "https://portfolio-project-1-54a8.onrender.com/api/payments";


export const createOrder = async (amount) => {
    const response = await axios.post(`${API_URL}/order`, { amount, currency: "INR" });
    return response.data;
};

export const verifyPayment = async (paymentData) => {
    const response = await axios.post(`${API_URL}/verify`, paymentData);
    return response.data;
};