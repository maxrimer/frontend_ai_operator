import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/', // Set your API base URL here if needed
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance; 