import { useCallback, useEffect, useState } from 'react';
import { getMasterData } from '../apis/masterDataApi';
import { parseApiError } from '../utils/apiError';

/**
 * Loads GET /api/v1/master-data once per mount (dropdown source for the app).
 * Re-call refetch() after login or when options must be refreshed.
 */
export const useMasterData = (fetchOnMount = true) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(fetchOnMount));
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getMasterData();

      if (!response?.success) {
        setError(response?.message || 'Could not load dropdown options.');
        setData(null);
        return null;
      }

      setData(response.data ?? {});
      return response.data;
    } catch (err) {
      const { general, status } = parseApiError(err);
      setError(
        status === 401
          ? 'Please sign in again.'
          : status === 403
            ? 'You do not have permission to load options.'
            : general || 'Could not load dropdown options.',
      );
      setData(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (fetchOnMount) refetch();
  }, [fetchOnMount, refetch]);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};
