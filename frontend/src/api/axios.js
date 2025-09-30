// frontend/src/api/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Your backend URL
});

export default axiosInstance;
