import axios from "axios";
import BASE_URL from "../constant";


export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Add token if needed
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
