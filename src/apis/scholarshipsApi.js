import apiClient from './apiConfig';

/**
 * POST /api/v1/scholarships
 * Creates a school scholarship/discount scheme. Roles: ADMIN, PRINCIPAL.
 */
export const createScholarship = async (payload) => {
  const { data } = await apiClient.post('/scholarships', payload);
  return data;
};

/**
 * GET /api/v1/scholarships
 * Active, non-deleted schemes ordered by name. Roles: ADMIN, PRINCIPAL.
 */
export const listScholarships = async () => {
  const { data } = await apiClient.get('/scholarships');
  return data;
};

/**
 * GET /api/v1/scholarships/{schemeId}
 * Single active scheme. Roles: ADMIN, PRINCIPAL.
 */
export const getScholarshipById = async (schemeId) => {
  const { data } = await apiClient.get(`/scholarships/${schemeId}`);
  return data;
};

/**
 * PUT /api/v1/scholarships/{schemeId}
 * Partial update; at least one field required. Roles: ADMIN, PRINCIPAL.
 */
export const updateScholarship = async (schemeId, payload) => {
  const { data } = await apiClient.put(`/scholarships/${schemeId}`, payload);
  return data;
};

/**
 * DELETE /api/v1/scholarships/{schemeId}
 * Soft-deletes / deactivates scheme. Roles: ADMIN, PRINCIPAL.
 */
export const deleteScholarship = async (schemeId) => {
  const { data } = await apiClient.delete(`/scholarships/${schemeId}`);
  return data;
};

/**
 * GET /api/v1/scholarships/merit-bands?academicYearId=
 * Mark-based tuition waiver bands for an academic year.
 */
export const listMeritBands = async (academicYearId) => {
  const { data } = await apiClient.get('/scholarships/merit-bands', {
    params: { academicYearId },
  });
  return data;
};

/**
 * GET /api/v1/scholarships/merit-bands/resolve?academicYearId=&marks=
 * Maps exam marks to discount % using configured bands.
 */
export const resolveMeritDiscount = async ({ academicYearId, marks }) => {
  const { data } = await apiClient.get('/scholarships/merit-bands/resolve', {
    params: { academicYearId, marks },
  });
  return data;
};
