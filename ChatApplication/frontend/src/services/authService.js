import axios from "axios"
const API_URL = "https://portfolio-project-4-h2ne.onrender.com/api/users";

 export const register = (userData) => {
    return axios.post(`${API_URL}/register`,userData)
}

export const login = (credentials) => {
    return axios.post(`${API_URL}/login`,credentials)
}

export const getUsers = (token) => {
    return axios.get(`${API_URL}/users`,{
        headers :{
            Authorization : `Bearer ${token}`
        } 
    })
}