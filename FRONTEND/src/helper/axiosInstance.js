import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

axios.create({
  baseURL: process.env.VITE_API_BASE_URL,
});
