import { axiosInstance } from "../helper/axiosInstance";

export const getMyRequests = async() =>{
    try {
        const data = await axiosInstance.get("/myrequests")
        return data;
    } catch (error) {
        throw error;
    }
}


export const acceptRequest = async(id, userId) =>{
    try {
        const data = await axiosInstance.post(`/accept/${id}`, {userId : userId}) ; // here we are sending the user id to the backend so that we can update the donation status to claimed.
        return data;
    } catch (error) {
        throw error;
    }
}