import axios from "axios";

const API_URL = "http://localhost:2003/api/message/"

export const sendMessage = (message,token) => {
    return axios.post(API_URL,message,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
}

export const getMessages = (receiverId,token) => {
    return axios.get(`${API_URL}${receiverId}`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
}