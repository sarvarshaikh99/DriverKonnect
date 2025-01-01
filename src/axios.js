// src/axios.js
import axios from 'axios';

// Replace with your API's base URL
const instance = axios.create({
    baseURL: 'https://your-api-url.com/api', 
});

export default instance;
