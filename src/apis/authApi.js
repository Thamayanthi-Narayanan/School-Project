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
 * POST /api/v1/auth/login/send-otp
 * Public — first-login OTP for users pending verification.
 */
export const sendLoginOtp = async (payload) => {
  const { data } = await apiClient.post('/auth/login/send-otp', payload);
  return data;
};

/**
 * POST /api/v1/auth/login/resend-otp
 * Public — 30s cooldown enforced server-side.
 */
export const resendLoginOtp = async (payload) => {
  const { data } = await apiClient.post('/auth/login/resend-otp', payload);
  return data;
};

/**
 * POST /api/v1/auth/login/verify-otp
 * Public — verifies OTP and returns login token payload.
 */
export const verifyLoginOtp = async (payload) => {
  const { data } = await apiClient.post('/auth/login/verify-otp', payload);
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

/**
 * POST /api/v1/auth/users
 * Requires Bearer token; ADMIN or PRINCIPAL only.
 */
export const createUser = async (payload) => {
  const { data } = await apiClient.post('/auth/users', payload);
  return data;
};

/**
 * GET /api/v1/auth/users
 * Requires Bearer token; ADMIN or PRINCIPAL only.
 */
export const listUsers = async () => {
  const { data } = await apiClient.get('/auth/users');
  return data;
};

/**
 * GET /api/v1/auth/users/{id}
 * Returns one non-deleted user. Requires Bearer token; ADMIN or PRINCIPAL only.
 * Used for user edit/view and Settings → Profile (logged-in user's id).
 */
export const getUserById = async (id) => {
  const { data } = await apiClient.get(`/auth/users/${id}`);
  return data;
};

/**
 * PUT /api/v1/auth/users/{id}
 * Requires Bearer token; ADMIN or PRINCIPAL only.
 */
export const updateUser = async (id, payload) => {
  const { data } = await apiClient.put(`/auth/users/${id}`, payload);
  return data;
};

/**
 * DELETE /api/v1/auth/users/{id}
 * Soft-deletes user. Requires Bearer token; ADMIN or PRINCIPAL only.
 */
export const deleteUser = async (id) => {
  const { data } = await apiClient.delete(`/auth/users/${id}`);
  return data;
};

/**
 * POST /api/v1/auth/change-password
 * Requires Bearer token. Any authenticated role.
 */
export const changePassword = async (payload) => {
  const { data } = await apiClient.post('/auth/change-password', payload);
  return data;
};

/**
 * POST /api/v1/auth/forgot-password
 * Sends reset OTP. Public; generic success message always.
 */
export const forgotPassword = async (payload) => {
  const { data } = await apiClient.post('/auth/forgot-password', payload);
  return data;
};

/**
 * POST /api/v1/auth/verify-otp
 * Forgot-password flow — returns resetToken (not login token).
 */
export const verifyForgotPasswordOtp = async (payload) => {
  const { data } = await apiClient.post('/auth/verify-otp', payload);
  return data;
};

/**
 * POST /api/v1/auth/reset-password
 * Sets new password using resetToken from verify-otp.
 */
export const resetPassword = async (payload) => {
  const { data } = await apiClient.post('/auth/reset-password', payload);
  return data;
};
