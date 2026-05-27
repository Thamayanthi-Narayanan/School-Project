import { useCallback, useEffect, useState } from 'react';
import { listFeeTypes } from '../../../apis/feesApi';
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
      const response = await listFeeTypes({ activeOnly: true });

      if (!response?.success) {
        setLoadError(response?.message || copy.loadFailed);
        setOptions([]);
        return;
      }

      const types = response.data ?? [];
      setOptions(
        types
          .map((type) => {
            const id = type.feeTypeId ?? type.feeHeadId ?? type.id;
            if (id == null) return null;
            const name =
              type.feeTypeName
              || type.feeHeadName
              || type.feeTypeCode
              || type.feeHeadCode
              || `Type ${id}`;
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
