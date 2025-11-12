import axios from "axios";

// Create an Axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api", // change this for production or Docker
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Interceptor: attach token dynamically before each request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // get latest token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Optional: global error handler
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);

    // You can optionally handle 401/403 errors globally
    if (error.response && error.response.status === 401) {
      // e.g., redirect to login or clear invalid token
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;
