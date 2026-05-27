import { useCallback, useEffect, useState } from 'react';
import { listReports } from '../../../apis/reportsApi';
import { reportsPageMock } from '../../../data/mocks/reports/reportsPage.mock';
import { parseApiError } from '../../../utils/apiError';
import { mapReportsToCards } from '../../../utils/reportsMapper';

export const useReportsList = (listCopy = reportsPageMock.list) => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const fetchReports = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const response = await listReports();

      if (!response?.success) {
        setLoadError(response?.message || listCopy.loadFailed);
        setReports([]);
        return;
      }

      setReports(mapReportsToCards(response.data ?? []));
    } catch (error) {
      const { general, status } = parseApiError(error);

      setLoadError(
        status === 403
          ? listCopy.accessDenied
          : status === 401
            ? listCopy.authFailed
            : general || listCopy.loadFailed,
      );
      setReports([]);
    } finally {
      setIsLoading(false);
    }
  }, [listCopy]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return {
    reports,
    isLoading,
    loadError,
    refetch: fetchReports,
  };
};
