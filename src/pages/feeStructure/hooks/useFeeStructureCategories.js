import { useCallback, useEffect, useMemo, useState } from 'react';
import { deleteFeeHead, listFeeHeads } from '../../../apis/feesApi';
import { parseApiError } from '../../../utils/apiError';
import { mapFeeHeadsToCategoryRows } from '../../../utils/feeHeadMapper';
import {
  formatInrOrDash,
  rowHasQuarterInput,
  sumColumnForRows,
  sumRowQuarters,
  tableHasAnyQuarterInput,
} from '../../../utils/feeStructureAmounts';

export const useFeeStructureCategories = (categoriesCopy, deleteCopy) => {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState('');

  const fetchFeeHeads = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const response = await listFeeHeads({ activeOnly: true });

      if (!response?.success) {
        setLoadError(response?.message || categoriesCopy.list.loadFailed);
        setRows([]);
        return;
      }

      setRows((prev) => mapFeeHeadsToCategoryRows(response.data ?? [], prev));
    } catch (error) {
      const { general, status } = parseApiError(error);
      const { list } = categoriesCopy;

      setLoadError(
        status === 403
          ? list.accessDenied
          : status === 401
            ? list.authFailed
            : general || list.loadFailed,
      );
      setRows([]);
    } finally {
      setIsLoading(false);
    }
  }, [categoriesCopy]);

  useEffect(() => {
    fetchFeeHeads();
  }, [fetchFeeHeads]);

  const updateRowQuarters = useCallback((rowId, quarters) => {
    setRows((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, ...quarters } : row)),
    );
  }, []);

  const openDeleteConfirm = useCallback((row) => {
    setDeleteError('');
    setDeleteTarget(row);
  }, []);

  const closeDeleteConfirm = useCallback(() => {
    if (isDeleting) return;
    setDeleteTarget(null);
    setDeleteError('');
  }, [isDeleting]);

  const confirmDelete = useCallback(async () => {
    if (!deleteTarget?.id) return false;

    setIsDeleting(true);
    setDeleteError('');
    setDeleteSuccessMessage('');

    try {
      const response = await deleteFeeHead(deleteTarget.id);

      if (!response?.success) {
        setDeleteError(response?.message || deleteCopy.deleteFailed);
        return false;
      }

      setDeleteSuccessMessage(response.message || deleteCopy.deleteSuccess);
      setDeleteTarget(null);
      await fetchFeeHeads();
      return true;
    } catch (error) {
      const { general } = parseApiError(error);
      setDeleteError(general || deleteCopy.deleteFailed);
      return false;
    } finally {
      setIsDeleting(false);
    }
  }, [deleteCopy, deleteTarget, fetchFeeHeads]);

  const getRowTotalDisplay = useCallback((row) => {
    if (!rowHasQuarterInput(row)) return '—';
    return formatInrOrDash(sumRowQuarters(row));
  }, []);

  const columnTotals = useMemo(() => {
    const q1 = sumColumnForRows(rows, 'q1');
    const q2 = sumColumnForRows(rows, 'q2');
    const q3 = sumColumnForRows(rows, 'q3');
    const q4 = sumColumnForRows(rows, 'q4');
    const hasInput = tableHasAnyQuarterInput(rows);

    return {
      q1: hasInput ? formatInrOrDash(q1) : '—',
      q2: hasInput ? formatInrOrDash(q2) : '—',
      q3: hasInput ? formatInrOrDash(q3) : '—',
      q4: hasInput ? formatInrOrDash(q4) : '—',
      grandTotal: hasInput ? formatInrOrDash(q1 + q2 + q3 + q4) : '—',
    };
  }, [rows]);

  const grossTotalAmount = useMemo(() => {
    if (!tableHasAnyQuarterInput(rows)) return null;
    return rows.reduce((sum, row) => sum + sumRowQuarters(row), 0);
  }, [rows]);

  return {
    rows,
    isLoading,
    loadError,
    columnTotals,
    grossTotalAmount,
    getRowTotalDisplay,
    updateRowQuarters,
    refetchFeeHeads: fetchFeeHeads,
    deleteTarget,
    isDeleting,
    deleteError,
    deleteSuccessMessage,
    openDeleteConfirm,
    closeDeleteConfirm,
    confirmDelete,
  };
};
