import { useCallback, useState } from 'react';
import { deleteScholarship } from '../../../apis/scholarshipsApi';
import { parseApiError } from '../../../utils/apiError';
import { getSchemeId } from '../../../utils/scholarshipMapper';

export const useScholarshipSchemeDelete = (deleteCopy, onDeleted) => {
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState('');

  const openDeleteConfirm = useCallback((scheme) => {
    setDeleteError('');
    setDeleteTarget(scheme);
  }, []);

  const closeDeleteConfirm = useCallback(() => {
    if (isDeleting) return;
    setDeleteTarget(null);
    setDeleteError('');
  }, [isDeleting]);

  const confirmDelete = useCallback(async () => {
    const schemeId = getSchemeId(deleteTarget?.raw) ?? deleteTarget?.id;
    if (!schemeId) return false;

    setIsDeleting(true);
    setDeleteError('');
    setDeleteSuccessMessage('');

    try {
      const response = await deleteScholarship(schemeId);

      if (!response?.success) {
        setDeleteError(response?.message || deleteCopy.deleteFailed);
        return false;
      }

      setDeleteSuccessMessage(response.message || deleteCopy.deleteSuccess);
      setDeleteTarget(null);
      if (onDeleted) await onDeleted();
      return true;
    } catch (error) {
      const { general, status } = parseApiError(error);
      setDeleteError(
        status === 404
          ? deleteCopy.notFound
          : general || deleteCopy.deleteFailed,
      );
      return false;
    } finally {
      setIsDeleting(false);
    }
  }, [deleteCopy, deleteTarget, onDeleted]);

  return {
    deleteTarget,
    isDeleting,
    deleteError,
    deleteSuccessMessage,
    openDeleteConfirm,
    closeDeleteConfirm,
    confirmDelete,
    setDeleteSuccessMessage,
  };
};
