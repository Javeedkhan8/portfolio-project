import axios from "axios";
import {jwtDecode} from "jwt-decode";

const API_URL = "http://localhost:2000/api/auth";

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });

        if (response.data?.token) {
            let userData = {
                _id: response.data.user._id,
                name: response.data.user.name,
                email: response.data.user.email,
                role: response.data.user.role,
                token: response.data.token,
            };

          
            if (!userData._id) {
                const decodedToken = jwtDecode(response.data.token);
                userData._id = decodedToken?.id || decodedToken?._id;
            }

            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("token", response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error("Login Error:", error.response?.data || error.message);
        throw error;
    }
};

export const register = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

export const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
};

export const getCurrentUser = () => {
    const user = localStorage.getItem("user");

    if (!user) return null;

    try {
        const parsedUser = JSON.parse(user);

        // Ensure _id is always available
        if (!parsedUser._id && parsedUser.token) {
            const decodedToken = jwtDecode(parsedUser.token);
            parsedUser._id = decodedToken?.id || decodedToken?._id;
            localStorage.setItem("user", JSON.stringify(parsedUser)); // Update storage
        }

        return parsedUser;
    } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        logout();
        return null;
    }
};

export const getAuthHeader = () => {
    const user = getCurrentUser();
    return user && user.token ? { Authorization: `Bearer ${user.token}` } : {};
};

export const getUserRole = async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const res = await fetch(`${API_URL}/me`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        return data.role;
    } catch (error) {
        console.error("Error fetching user role:", error);
        return null;
    }
};
