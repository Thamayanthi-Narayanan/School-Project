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

/**
 * GET /api/v1/students
 * Paginated list of active students. Requires Bearer token.
 * @param {{ page?: number, size?: number }} params — zero-based page, page size (max 50)
 */
export const listStudents = async ({ page = 0, size = 10 } = {}) => {
  const { data } = await apiClient.get('/students', {
    params: { page, size },
  });
  return data;
};
