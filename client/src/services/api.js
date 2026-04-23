// src/services/api.js
import axios from 'axios';

// Production URL (Vercel env variable se lega)
const BASE_URL = process.env.REACT_APP_API_URL || 'https://property-platform-4xcj.onrender.com/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;