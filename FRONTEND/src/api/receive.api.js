import { axiosInstance } from "../helper/axiosInstance";

export const getAvailableDonations= async() =>{
    try{
        const data = await axiosInstance.get("/available-donations")
        console.log("the available donations is:" ,data)
        return data;
    }catch(err)
    {
        throw err;
    }
}

export const getAllDonations = async() =>{
    try{
        const data = await axiosInstance.get("/all-donations")
        return data;
    }catch(err)
    {
        throw err;
    }
}


export const requestDonation =async(donationId) =>{
    try{
        const data = await axiosInstance.post(`/request/${donationId}`)
        return data;
    }catch(err)
    {
        throw err;
    }
}

export const getClaimedDonations=async() =>{
    try{
        const data = await axiosInstance.get("/claimed-donations")
        return data
    }catch(err){
        throw err;
    }
}