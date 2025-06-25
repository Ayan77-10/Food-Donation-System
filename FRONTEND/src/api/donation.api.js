import { axiosInstance } from "../helper/axiosInstance";

export const createDonation = async(formData) =>{
    try {
        const data = await axiosInstance.post("/donate", formData)
        return data;
    } catch (err) {
        throw err;
    }
}


export const getMyDonations = async() =>{
    try {
        const data = await axiosInstance.get("/mydonations")
        return data;    
    } catch (error) {
        throw error
    }
}


