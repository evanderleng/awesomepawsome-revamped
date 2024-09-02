// src/axiosConfig.js
import axios from 'axios';

// Create an instance of axios with the base URL for your API
const axiosInstance = axios.create({
  baseURL: 'https://ap-backend-rosy.vercel.app', // Set your API base URL
});

// Add a request interceptor to include the JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the JWT token from the cookie named 'authToken'
    const cookie = document.cookie.split('; ').find(row => row.startsWith('authToken='));
    const token = cookie ? cookie.split('=')[1] : null;

    // Console log the token for debugging purposes
    console.log('Retrieved Token:', token);


    if (token) {
      // Add the token to the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

axiosInstance.defaults.withCredentials = true;

axios.defaults.baseURL = 'https://ap-backend-rosy.vercel.app';

export default axiosInstance;
