import axios from "axios";

export const BASE_URL = "https://tickets-and-agents.onrender.com/api"

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers:{
        'Content-Type': 'application/json',
    }
})