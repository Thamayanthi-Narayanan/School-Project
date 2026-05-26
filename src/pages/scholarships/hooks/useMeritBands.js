import { useCallback, useEffect, useState } from 'react';
import { listMeritBands, resolveMeritDiscount } from '../../../apis/scholarshipsApi';
import { parseApiError } from '../../../utils/apiError';
import {
  mapMeritBandsToRows,
  mapMeritResolveToPreview,
} from '../../../utils/scholarshipMapper';

export const useMeritBands = (meritBandsCopy) => {
  const [academicYearId, setAcademicYearId] = useState('');
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [marks, setMarks] = useState('');
  const [preview, setPreview] = useState(null);
  const [previewError, setPreviewError] = useState(null);
  const [isResolving, setIsResolving] = useState(false);

  const fetchBands = useCallback(async (yearId) => {
    if (!yearId) {
      setRows([]);
      setLoadError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setLoadError(null);
    setPreview(null);
    setPreviewError(null);

    try {
      const response = await listMeritBands(yearId);

      if (!response?.success) {
        setLoadError(response?.message || meritBandsCopy.list.loadFailed);
        setRows([]);
        return;
      }

      setRows(mapMeritBandsToRows(response.data ?? []));
    } catch (error) {
      const { general, status } = parseApiError(error);

      setLoadError(
        status === 403
          ? meritBandsCopy.list.accessDenied
          : status === 401
            ? meritBandsCopy.list.authFailed
            : general || meritBandsCopy.list.loadFailed,
      );
      setRows([]);
    } finally {
      setIsLoading(false);
    }
  }, [meritBandsCopy]);

  useEffect(() => {
    if (academicYearId) {
      fetchBands(academicYearId);
    }
  }, [academicYearId, fetchBands]);

  const handleAcademicYearChange = useCallback((value) => {
    setAcademicYearId(value);
    setMarks('');
    setPreview(null);
    setPreviewError(null);
  }, []);

  const resolvePreview = useCallback(async () => {
    const trimmedMarks = marks.trim();
    if (!academicYearId) {
      setPreviewError(meritBandsCopy.preview.selectYear);
      return;
    }
    if (!trimmedMarks) {
      setPreviewError(meritBandsCopy.preview.marksRequired);
      return;
    }

    const parsedMarks = Number.parseFloat(trimmedMarks.replace(/,/g, ''));
    if (!Number.isFinite(parsedMarks) || parsedMarks < 0 || parsedMarks > 100) {
      setPreviewError(meritBandsCopy.preview.marksInvalid);
      return;
    }

    setIsResolving(true);
    setPreviewError(null);
    setPreview(null);

    try {
      const response = await resolveMeritDiscount({
        academicYearId,
        marks: parsedMarks,
      });

      if (!response?.success) {
        setPreviewError(response?.message || meritBandsCopy.preview.resolveFailed);
        return;
      }

      setPreview(mapMeritResolveToPreview(response));
    } catch (error) {
      const { general, status } = parseApiError(error);

      setPreviewError(
        status === 403
          ? meritBandsCopy.preview.accessDenied
          : status === 401
            ? meritBandsCopy.preview.authFailed
            : general || meritBandsCopy.preview.resolveFailed,
      );
    } finally {
      setIsResolving(false);
    }
  }, [academicYearId, marks, meritBandsCopy]);

  return {
    academicYearId,
    setAcademicYearId: handleAcademicYearChange,
    rows,
    isLoading,
    loadError,
    refetchBands: () => fetchBands(academicYearId),
    marks,
    setMarks,
    preview,
    previewError,
    isResolving,
    resolvePreview,
  };
};
