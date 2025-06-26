import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:"https://food-donation-system-w44b.onrender.com",
  withCredentials: true,
  timeout: 10000,
});

