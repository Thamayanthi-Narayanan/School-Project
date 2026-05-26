import apiClient from './apiConfig';

/**
 * GET /api/v1/fees/heads
 * Returns fee head master records. Roles: ADMIN, PRINCIPAL, ACCOUNTANT.
 */
export const listFeeHeads = async ({ activeOnly = false } = {}) => {
  const params = activeOnly ? { activeOnly: true } : undefined;
  const { data } = await apiClient.get('/fees/heads', { params });
  return data;
};

/**
 * POST /api/v1/fees/heads
 * Creates one fee head master row. Requires ADMIN or PRINCIPAL.
 */
export const createFeeHead = async (payload) => {
  const { data } = await apiClient.post('/fees/heads', payload);
  return data;
};

/**
 * PUT /api/v1/fees/heads/{id}
 * Partial update of a fee head. Requires ADMIN or PRINCIPAL.
 */
export const updateFeeHead = async (id, payload) => {
  const { data } = await apiClient.put(`/fees/heads/${id}`, payload);
  return data;
};

/**
 * DELETE /api/v1/fees/heads/{id}
 * Soft-deletes a fee head (sets active = false). Requires ADMIN or PRINCIPAL.
 */
export const deleteFeeHead = async (id) => {
  const { data } = await apiClient.delete(`/fees/heads/${id}`);
  return data;
};
