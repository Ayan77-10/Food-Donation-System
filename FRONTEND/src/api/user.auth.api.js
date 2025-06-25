import { axiosInstance } from "../helper/axiosInstance";

export const register = async (name, email, password) => {
    try {
        const data = await axiosInstance.post("/auth/register", { name, email, password })
        return data;
    } catch (err) {
        throw err;
    }
}

export const login = async (email, password) => {
    try {
        const data = await axiosInstance.post("/auth/login", { email, password });
        return data;
    } catch (err) {
        throw err;
    }
}

export const logoutUser=async () => {
    try {
        const response =await axiosInstance.get("/auth/logout_user");
        return response;

        
    } catch (error) {
        throw new Error("Logout failed");
        
    }
}