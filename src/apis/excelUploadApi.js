import apiClient from './apiConfig';
import {
  downloadBlobAsFile,
  getFileNameFromContentDisposition,
  parseBlobErrorResponse,
} from '../utils/fileDownload';

const TEMPLATE_PATH = '/excel-upload/student-admissions/template';
const UPLOAD_PATH = '/excel-upload/student-admissions/upload';
const DEFAULT_TEMPLATE_NAME = 'student-admission-template.xlsx';

/**
 * XLS-001 — GET /api/v1/excel-upload/student-admissions/template
 * Raw .xlsx bytes (not ApiResponse).
 */
export const downloadStudentAdmissionTemplate = async () => {
  try {
    const response = await apiClient.get(TEMPLATE_PATH, {
      responseType: 'blob',
    });

    const fileName =
      getFileNameFromContentDisposition(response.headers['content-disposition'])
      || DEFAULT_TEMPLATE_NAME;

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

/**
 * XLS-003 — POST /api/v1/excel-upload/student-admissions/upload
 * multipart/form-data: file (required), dryRun (optional, default false)
 */
export const uploadStudentAdmissionsExcel = async (file, { dryRun = false } = {}) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('dryRun', String(dryRun));

  const { data } = await apiClient.post(UPLOAD_PATH, formData, {
    timeout: 120000,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};
