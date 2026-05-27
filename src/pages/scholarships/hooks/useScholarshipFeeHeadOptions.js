import { useCallback, useEffect, useState } from 'react';
import { listFeeHeads } from '../../../apis/feesApi';
import { parseApiError } from '../../../utils/apiError';

export const useScholarshipFeeHeadOptions = (copy, { enabled = true } = {}) => {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);

  const fetchFeeHeads = useCallback(async () => {
    if (!enabled) return;

    setIsLoading(true);
    setLoadError(null);

    try {
      const response = await listFeeHeads({ activeOnly: true });

      if (!response?.success) {
        setLoadError(response?.message || copy.loadFailed);
        setOptions([]);
        return;
      }

      const heads = response.data ?? [];
      setOptions(
        heads
          .map((head) => {
            const id = head.feeHeadId ?? head.id;
            if (id == null) return null;
            const name = head.feeHeadName || head.feeHeadCode || `Head ${id}`;
            return { label: name, value: String(id) };
          })
          .filter(Boolean),
      );
    } catch (error) {
      const { general } = parseApiError(error);
      setLoadError(general || copy.loadFailed);
      setOptions([]);
    } finally {
      setIsLoading(false);
    }
  }, [copy, enabled]);

  useEffect(() => {
    fetchFeeHeads();
  }, [fetchFeeHeads]);

  return {
    options,
    isLoading,
    loadError,
    refetchFeeHeads: fetchFeeHeads,
  };
};
