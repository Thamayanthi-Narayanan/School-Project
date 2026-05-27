import apiClient from './apiConfig';

const FEE_TYPES_PATH = '/fees/types';

/**
 * GET /api/v1/fees/types
 * List fee types (optional activeOnly).
 */
export const listFeeTypes = async ({ activeOnly = false } = {}) => {
  const params = activeOnly ? { activeOnly: true } : undefined;
  const { data } = await apiClient.get(FEE_TYPES_PATH, { params });
  return data;
};

/**
 * GET /api/v1/fees/types/{id}
 * Get one fee type.
 */
export const getFeeTypeById = async (id) => {
  const { data } = await apiClient.get(`${FEE_TYPES_PATH}/${id}`);
  return data;
};

/**
 * POST /api/v1/fees/types
 * Create fee type.
 */
export const createFeeType = async (payload) => {
  const { data } = await apiClient.post(FEE_TYPES_PATH, payload);
  return data;
};

/**
 * POST /api/v1/fees/types/bulk
 * Bulk create fee types.
 */
export const bulkCreateFeeTypes = async (payload) => {
  const { data } = await apiClient.post(`${FEE_TYPES_PATH}/bulk`, payload);
  return data;
};

/**
 * PUT /api/v1/fees/types/{id}
 * Update fee type.
 */
export const updateFeeType = async (id, payload) => {
  const { data } = await apiClient.put(`${FEE_TYPES_PATH}/${id}`, payload);
  return data;
};

/**
 * DELETE /api/v1/fees/types/{id}
 * Soft delete fee type.
 */
export const deleteFeeType = async (id) => {
  const { data } = await apiClient.delete(`${FEE_TYPES_PATH}/${id}`);
  return data;
};

/** @deprecated Use listFeeTypes */
export const listFeeHeads = listFeeTypes;

/** @deprecated Use getFeeTypeById */
export const getFeeHeadById = getFeeTypeById;

/** @deprecated Use createFeeType */
export const createFeeHead = createFeeType;

/** @deprecated Use bulkCreateFeeTypes */
export const bulkCreateFeeHeads = bulkCreateFeeTypes;

/** @deprecated Use updateFeeType */
export const updateFeeHead = updateFeeType;

/** @deprecated Use deleteFeeType */
export const deleteFeeHead = deleteFeeType;
