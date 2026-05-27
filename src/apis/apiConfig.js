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
    const isLoginVerifyOtp = authUrl.includes('/auth/login/verify-otp');
    const isPublicAuthRoute =
      authUrl.includes('/auth/login')
      || authUrl.includes('/auth/logout')
      || authUrl.includes('/auth/forgot-password')
      || authUrl.includes('/auth/reset-password')
      || (authUrl.includes('/auth/verify-otp') && !isLoginVerifyOtp);

    if (error?.response?.status === 401 && !isPublicAuthRoute) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      localStorage.removeItem('authExpiresIn');
    }

    return Promise.reject(error);
  },
);

export default apiClient;
