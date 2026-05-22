import apiClient from './apiConfig';

/**
 * POST /api/v1/students/admissions
 * Creates student + parents + documents in one transaction.
 * Requires Bearer token.
 */
export const admitStudent = async (payload) => {
  const { data } = await apiClient.post('/students/admissions', payload);
  return data;
};
