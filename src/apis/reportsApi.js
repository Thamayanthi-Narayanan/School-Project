import apiClient from './apiConfig';
import {
  downloadBlobAsFile,
  getFileNameFromContentDisposition,
  parseBlobErrorResponse,
} from '../utils/fileDownload';

/**
 * RPT-001 — GET /api/v1/reports
 * Lists report types available in the UI (metadata only).
 */
export const listReports = async () => {
  const { data } = await apiClient.get('/reports');
  return data;
};

/**
 * RPT-002 — GET /api/v1/reports/{reportType}/export
 * Downloads report as Excel or PDF (binary — not ApiResponse).
 */
export const exportReport = async (reportType, params) => {
  try {
    const response = await apiClient.get(`/reports/${reportType}/export`, {
      params,
      responseType: 'blob',
      timeout: 120000,
    });

    const fileName =
      getFileNameFromContentDisposition(response.headers['content-disposition'])
      || `${String(reportType).toLowerCase()}-report`;

    downloadBlobAsFile(response.data, fileName);
  } catch (error) {
    const parsed = await parseBlobErrorResponse(error);
    if (parsed?.message) {
      const wrapped = new Error(parsed.message);
      wrapped.response = error.response;
      throw wrapped;
    }
    throw error;
  }
};
