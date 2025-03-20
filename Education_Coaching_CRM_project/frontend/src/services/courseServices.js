import axios from "axios";
import { getAuthHeader } from "./authServices";

const API_URL = "https://portfolio-project-3-b7wt.onrender.com/api/courses";

export const getCourses = async () => {
    const response = await axios.get(API_URL, { headers: getAuthHeader() });
    return response.data;
};

export const createCourse = async (courseData) => {
    const response = await axios.post(API_URL, courseData, { headers: getAuthHeader() });
    return response.data;
};

export const enrollStudent = async (courseId, studentId) => {
    const response = await axios.post(`${API_URL}/${courseId}/enroll`, { studentId }, { headers: getAuthHeader() });
    return response.data;
};

export const getEnrolledStudents = async (instructorId) => {
    console.log(" Sending API request with Instructor ID:", instructorId);
    const response = await axios.get(`${API_URL}/students/${instructorId}`, { headers: getAuthHeader() });
    console.log(" Response from API:", response.data); 
    return response.data;
};

export const getInstructorsByStudent = async (studentId) => {
    try {
        const response = await axios.get(`${API_URL}/instructor/${studentId}`, {
            headers: getAuthHeader(),
        });
        console.log(" Response:", response.data);
        return response.data;
    } catch (error) {
        console.error(" Error fetching instructors:", error.response?.data || error.message);
        return [];
    }
};
