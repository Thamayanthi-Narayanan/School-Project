import { useCallback, useState } from 'react';
import {
  downloadStudentAdmissionTemplate,
  uploadStudentAdmissionsExcel,
} from '../../../apis/excelUploadApi';
import { bulkUploadPageMock } from '../../../data/mocks/bulkUpload/bulkUploadPage.mock';
import { parseApiError } from '../../../utils/apiError';
import { formatUploadSummaryMessage } from '../../../utils/bulkUploadResults';

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const ACCEPTED_EXTENSION = '.xlsx';

const getExtension = (name) => {
  const dot = name.lastIndexOf('.');
  return dot >= 0 ? name.slice(dot).toLowerCase() : '';
};

const isAcceptedFile = (file) => getExtension(file.name) === ACCEPTED_EXTENSION;

export const useBulkUploadForm = (copy = bulkUploadPageMock) => {
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [uploadResult, setUploadResult] = useState(null);

  const validate = useCallback((selectedFile) => {
    const nextErrors = {};

    if (!selectedFile) {
      nextErrors.file = copy.validation.fileRequired;
    } else if (!isAcceptedFile(selectedFile)) {
      nextErrors.file = copy.validation.fileType;
    } else if (selectedFile.size > MAX_FILE_BYTES) {
      nextErrors.file = copy.validation.fileSize;
    }

    return nextErrors;
  }, [copy.validation]);

  const handleFileSelect = useCallback((nextFile) => {
    setFile(nextFile);
    setSuccessMessage('');
    setUploadResult(null);
    setErrors({});
  }, []);

  const handleDownloadTemplate = useCallback(async () => {
    setIsDownloading(true);
    setErrors({});

    try {
      await downloadStudentAdmissionTemplate();
      return true;
    } catch (error) {
      const { general } = parseApiError(error);
      setErrors({
        general: general || copy.messages.downloadFailed,
      });
      return false;
    } finally {
      setIsDownloading(false);
    }
  }, [copy.messages.downloadFailed]);

  const handleUpload = useCallback(async (fileToUpload = file) => {
    const validationErrors = validate(fileToUpload);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return false;

    setIsUploading(true);
    setSuccessMessage('');
    setUploadResult(null);

    try {
      const response = await uploadStudentAdmissionsExcel(fileToUpload, {
        dryRun: false,
      });

      if (!response?.success) {
        setErrors({
          general: response?.message || copy.messages.uploadFailed,
        });
        return false;
      }

      const payload = response.data ?? null;
      setUploadResult(payload);
      setSuccessMessage(
        response.message || formatUploadSummaryMessage(payload, copy),
      );
      setFile(null);
      return true;
    } catch (error) {
      const { general } = parseApiError(error);
      setErrors({
        general: general || copy.messages.uploadFailed,
      });
      return false;
    } finally {
      setIsUploading(false);
    }
  }, [copy, file, validate]);

  return {
    file,
    errors,
    isUploading,
    isDownloading,
    successMessage,
    uploadResult,
    handleFileSelect,
    handleDownloadTemplate,
    handleUpload,
  };
};
