import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://food-donation-system-j7uo.onrender.com/api/",
  withCredentials: true,
  timeout: 10000,
});

// axios.create({
//   baseURL: process.env.REACT_APP_API_BASE_URL,
// });
