import { useCallback, useEffect, useState } from 'react';
import { listScholarships } from '../../../apis/scholarshipsApi';
import { parseApiError } from '../../../utils/apiError';
import { mapScholarshipsToSchemeCards } from '../../../utils/scholarshipMapper';

export const useScholarshipSchemes = (listCopy) => {
  const [schemes, setSchemes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const fetchSchemes = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const response = await listScholarships();

      if (!response?.success) {
        setLoadError(response?.message || listCopy.loadFailed);
        setSchemes([]);
        return;
      }

      setSchemes(mapScholarshipsToSchemeCards(response.data ?? []));
    } catch (error) {
      const { general, status } = parseApiError(error);

      setLoadError(
        status === 403
          ? listCopy.accessDenied
          : status === 401
            ? listCopy.authFailed
            : general || listCopy.loadFailed,
      );
      setSchemes([]);
    } finally {
      setIsLoading(false);
    }
  }, [listCopy]);

  useEffect(() => {
    fetchSchemes();
  }, [fetchSchemes]);

  return {
    schemes,
    isLoading,
    loadError,
    refetchSchemes: fetchSchemes,
  };
};
