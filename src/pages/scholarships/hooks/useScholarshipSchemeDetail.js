import { useCallback, useState } from 'react';
import { getScholarshipById } from '../../../apis/scholarshipsApi';
import { parseApiError } from '../../../utils/apiError';
import {
  getSchemeId,
  mapScholarshipToSchemeCard,
} from '../../../utils/scholarshipMapper';

export const useScholarshipSchemeDetail = (detailCopy) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scheme, setScheme] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);

  const fetchScheme = useCallback(async (schemeId, fallbackCard) => {
    if (!schemeId) return;

    setIsLoading(true);
    setLoadError(null);
    setScheme(fallbackCard ?? null);

    try {
      const response = await getScholarshipById(schemeId);

      if (!response?.success) {
        setLoadError(response?.message || detailCopy.loadFailed);
        if (fallbackCard) {
          setScheme(fallbackCard);
        }
        return;
      }

      const mapped = mapScholarshipToSchemeCard(response.data ?? {});
      setScheme({
        ...mapped,
        raw: response.data,
      });
    } catch (error) {
      const { general, status } = parseApiError(error);

      setLoadError(
        status === 404
          ? detailCopy.notFound
          : status === 403
            ? detailCopy.accessDenied
            : status === 401
              ? detailCopy.authFailed
              : general || detailCopy.loadFailed,
      );

      if (fallbackCard) {
        setScheme(fallbackCard);
      }
    } finally {
      setIsLoading(false);
    }
  }, [detailCopy]);

  const openScheme = useCallback((card) => {
    const schemeId = getSchemeId(card?.raw) ?? card?.id;
    setIsOpen(true);
    fetchScheme(schemeId, card);
  }, [fetchScheme]);

  const closeScheme = useCallback(() => {
    setIsOpen(false);
    setScheme(null);
    setLoadError(null);
    setIsLoading(false);
  }, []);

  return {
    scheme,
    isLoading,
    loadError,
    openScheme,
    closeScheme,
    isOpen,
  };
};
