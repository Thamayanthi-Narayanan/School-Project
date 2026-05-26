import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const authUrl = error.config?.url || '';
    const isAuthRoute = authUrl.includes('/auth/login') || authUrl.includes('/auth/logout');

    if (error?.response?.status === 401 && !isAuthRoute) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      localStorage.removeItem('authExpiresIn');
    }

    return Promise.reject(error);
  },
);

export default apiClient;
