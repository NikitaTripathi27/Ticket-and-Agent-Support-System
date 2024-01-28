/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "../config/Axios"

export const FetchAgents = async()=>{
    const response = await axiosInstance.get('/support-agents')
    return response.data
}

export const addTicket = async(data:any)=>{
    const response = await axiosInstance.post('/support-tickets', data)
    return response.data
}

export const updateTicket = async(data:any)=>{
    const response = await axiosInstance.put('/support-tickets', data)
    return response.data
}

export const fetchTickets = async(query:any)=>{
    const {
        status,
        assignedTo,
        severity,
        type,
        page,
        limit
      } = query
      const url = `/support-tickets?page=${page}&limit=${limit}&status=${status}&assignedTo=${assignedTo}&type=${type}&severity=${severity}`
    const response = await axiosInstance.get(url)
    return response.data
}

