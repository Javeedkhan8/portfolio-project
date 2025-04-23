import axios from "axios";

const API = axios.create({
    baseURL:"https://portfolio-project-6.onrender.com/api"
})

export default API;