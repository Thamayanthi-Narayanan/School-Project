import apiClient from './apiConfig';

/**
 * GET /api/v1/master-data
 * Returns dropdown option groups (role, class, status, etc.).
 * Authorization required.
 */
export const getMasterData = async () => {
  const { data } = await apiClient.get('/master-data');
  return data;
};
