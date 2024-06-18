import axios from 'axios';
import { getToken } from 'services/firebase';

const baseURL = process.env.REACT_APP_ADMIN_API_BASE;

export const adminApiClient = axios.create({
  baseURL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

adminApiClient.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default adminApiClient;