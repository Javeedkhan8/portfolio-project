import axios from "axios";
import { getAuthHeader } from "./authServices"; 

const token = localStorage.getItem("token");


const API_URL = "https://portfolio-project-1-54a8.onrender.com/api/students";

export const getStudents = async () => {
    const response = await axios.get(API_URL,{headers:getAuthHeader()});
    return response.data
}

export const getStudentById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`,{headers:getAuthHeader()});
    return response.data
}

export const updateStudent = async (id,studentData) => {
    const response = await axios.put(`${API_URL}/${id}`,studentData,{headers:getAuthHeader()});
    return response.data
}

export const getStudentCourses = async () => {
    if (!token) {
        console.error("🚨 No token found in localStorage");
        return [];
    }

    try{
        const res = await fetch(`${API_URL}/courses`,{
            method:"GET",
            headers:{
                "Authorization" : `Bearer ${token}`,
                "Content-Type" : "application/json",
            }
        })
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
}

