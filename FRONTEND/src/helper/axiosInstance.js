import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://food-donation-system-6k8i.onrender.com/api/",
  withCredentials: true,
  timeout: 10000,
});

// axios.create({
//   baseURL: process.env.REACT_APP_API_BASE_URL,
// });
