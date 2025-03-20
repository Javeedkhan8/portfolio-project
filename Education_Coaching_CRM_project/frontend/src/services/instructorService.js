import axios from "axios";
import {getAuthHeader} from "./authServices"

const token = localStorage.getItem("token");

const API_URL = "https://portfolio-project-1-54a8.onrender.com/api/instructor";


export const getInstructorCourses = async () => {
    if (!token) {
        console.error(" No token found in localStorage");
        return [];
    }

    try {

        const res = await fetch(`${API_URL}/courses`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        console.log("🔹 Response Status:", res.status, res.statusText);

        if (!res.ok) {
            console.error(" Error fetching instructor courses:", await res.json());
            throw new Error("Failed to fetch instructor courses");
        }

        return await res.json();
    } catch (error) {
        console.error(" Error in getInstructorCourses:", error);
        return [];
    }
};


export const getInstructorAttendance = async () => {
    try {
        const res = await fetch(`${API_URL}/attendance`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) throw new Error("Failed to fetch instructor attendance");
        return await res.json();
    } catch (error) {
        console.error("Error fetching instructor attendance:", error);
        return [];
    }
};

export const getInstructor = async () => {
    const response = await axios.get(API_URL,{headers:getAuthHeader()});
    return response.data
}

