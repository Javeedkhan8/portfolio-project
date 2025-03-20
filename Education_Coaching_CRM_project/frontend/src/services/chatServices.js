import axios from "axios";
import { getAuthHeader } from "./authServices";

const API_URL = "https://portfolio-project-3-b7wt.onrender.com/api/chat";

/**
 * Sends a message
 * @param {Object} messageData - Contains sender, receiver, and message content
 */
export const sendMessage = async (messageData) => {
    try {
        const response = await axios.post(`${API_URL}/send`, messageData, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        console.error("Error sending message:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Fetches messages between sender and receiver
 * @param {string} sender - Sender user ID
 * @param {string} receiver - Receiver user ID
 */
export const getMessages = async (sender, receiver) => {
    try {
        const response = await axios.get(`${API_URL}/${sender}/${receiver}`, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        console.error("Error fetching messages:", error.response?.data || error.message);
        throw error;
    }
};
