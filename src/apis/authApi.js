import apiClient from './apiConfig';

/**
 * POST /api/v1/auth/login
 * Body: exactly one of { email, password } or { phone, password }
 */
export const login = async (payload) => {
  const { data } = await apiClient.post('/auth/login', payload);
  return data;
};

/**
 * POST /api/v1/auth/logout
 * Requires Authorization: Bearer {token}
 */
export const logout = async () => {
  const { data } = await apiClient.post('/auth/logout');
  return data;
};
