import axios from "axios";

const api = axios.create({
  baseURL: "https://task-manager-backend-d3rs.onrender.com/api", // your backend base URL
});

// Automatically attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // token saved on login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
