import axios from "axios";
// import { getAuthHeader } from "./authService";

const API_URL = "http://localhost:2000/api/payments";

// export const getPayments = async () => {
//     const response = await axios.get(API_URL, { headers: getAuthHeader() });
//     return response.data;
// };

// export const createPayment = async (paymentData) => {
//     const response = await axios.post(API_URL, paymentData, { headers: getAuthHeader() });
//     return response.data;
// };

// export const updatePaymentStatus = async (id, status) => {
//     const response = await axios.put(`${API_URL}/${id}`, { status }, { headers: getAuthHeader() });
//     return response.data;
// };

export const createOrder = async (amount) => {
    const response = await axios.post(`${API_URL}/order`, { amount, currency: "INR" });
    return response.data;
};

export const verifyPayment = async (paymentData) => {
    const response = await axios.post(`${API_URL}/verify`, paymentData);
    return response.data;
};