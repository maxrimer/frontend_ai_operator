import axios from 'axios';

import { appConfig } from './app.config';

const axiosInstance = axios.create({
  baseURL: appConfig.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance; 