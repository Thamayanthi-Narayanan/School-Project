import { useCallback, useState } from 'react';
import { exportReport } from '../../../apis/reportsApi';
import { reportsPageMock } from '../../../data/mocks/reports/reportsPage.mock';
import { parseApiError } from '../../../utils/apiError';
import {
  buildReportExportParams,
  getFirstExportValidationError,
  validateReportExportFilters,
} from '../../../utils/reportExportUtils';

export const useReportExport = (
  validationCopy = reportsPageMock.validation,
  exportCopy = reportsPageMock.export,
) => {
  const [exportError, setExportError] = useState(null);
  const [exportingKey, setExportingKey] = useState(null);

  const clearExportError = useCallback(() => {
    setExportError(null);
  }, []);

  const exportReportFile = useCallback(async (report, format, filters) => {
    const validationErrors = validateReportExportFilters(report, filters, validationCopy);
    const validationMessage = getFirstExportValidationError(validationErrors);

    if (validationMessage) {
      setExportError(validationMessage);
      return false;
    }

    const exportKey = `${report.reportType}-${format}`;
    setExportingKey(exportKey);
    setExportError(null);

    try {
      const params = buildReportExportParams(
        format,
        filters,
        Boolean(report.monthYearRangeFilterSupported),
      );

      await exportReport(report.reportType, params);
      return true;
    } catch (error) {
      const { general } = parseApiError(error);
      setExportError(general || exportCopy.failed);
      return false;
    } finally {
      setExportingKey(null);
    }
  }, [exportCopy.failed, validationCopy]);

  const isExporting = useCallback(
    (reportType, format) => exportingKey === `${reportType}-${format}`,
    [exportingKey],
  );

  return {
    exportError,
    exportReportFile,
    isExporting,
    clearExportError,
  };
};
