import { useCallback, useEffect, useMemo, useState } from 'react';
import { listNotifications, markNotificationAsRead } from '../../../apis/notificationsApi';
import { notificationsPageMock } from '../../../data/mocks/notifications/notificationsPage.mock';
import { parseApiError } from '../../../utils/apiError';
import { mapApiNotificationToItem } from '../../../utils/notificationUtils';

const defaultPageSize = notificationsPageMock.pagination.pageSize;

const emptyMeta = {
  page: 0,
  size: defaultPageSize,
  totalElements: 0,
  totalPages: 0,
  first: true,
  last: true,
};

export const useNotificationsList = (listCopy = notificationsPageMock.list) => {
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(0);
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState(emptyMeta);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [markingId, setMarkingId] = useState(null);

  const fetchNotifications = useCallback(async (pageIndex, status) => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const response = await listNotifications({
        status: status || undefined,
        page: pageIndex,
        size: defaultPageSize,
      });

      if (!response?.success || !response?.data) {
        setLoadError(response?.message || listCopy.loadFailed);
        setItems([]);
        setMeta(emptyMeta);
        return;
      }

      const { content = [], ...pagination } = response.data;

      setItems(content.map(mapApiNotificationToItem));
      setMeta({
        page: pagination.page ?? pageIndex,
        size: pagination.size ?? defaultPageSize,
        totalElements: pagination.totalElements ?? 0,
        totalPages: pagination.totalPages ?? 0,
        first: pagination.first ?? pageIndex === 0,
        last: pagination.last ?? true,
      });
    } catch (error) {
      const { general, status: httpStatus } = parseApiError(error);

      setLoadError(
        httpStatus === 403
          ? listCopy.accessDenied
          : httpStatus === 401
            ? listCopy.authFailed
            : general || listCopy.loadFailed,
      );
      setItems([]);
      setMeta(emptyMeta);
    } finally {
      setIsLoading(false);
    }
  }, [listCopy]);

  useEffect(() => {
    fetchNotifications(page, statusFilter);
  }, [page, statusFilter, fetchNotifications]);

  const setFilter = useCallback((nextStatus) => {
    setStatusFilter(nextStatus);
    setPage(0);
  }, []);

  const markAsRead = useCallback(async (notificationId) => {
    if (!notificationId) return null;

    setMarkingId(notificationId);

    try {
      const response = await markNotificationAsRead(notificationId);

      if (!response?.success) {
        return null;
      }

      const updated = response.data ? mapApiNotificationToItem(response.data) : null;

      setItems((prev) =>
        prev.map((item) =>
          (item.notificationId === notificationId ? (updated ?? { ...item, status: 'READ' }) : item),
        ),
      );

      return updated;
    } catch {
      return null;
    } finally {
      setMarkingId(null);
    }
  }, []);

  const showingText = useMemo(() => {
    if (meta.totalElements === 0) return listCopy.emptyMessage;
    const start = meta.page * meta.size + 1;
    const end = Math.min((meta.page + 1) * meta.size, meta.totalElements);
    return listCopy.showingText
      .replace('{start}', String(start))
      .replace('{end}', String(end))
      .replace('{total}', String(meta.totalElements));
  }, [listCopy.emptyMessage, listCopy.showingText, meta.page, meta.size, meta.totalElements]);

  return {
    items,
    meta,
    isLoading,
    loadError,
    markingId,
    statusFilter,
    setFilter,
    refetch: () => fetchNotifications(page, statusFilter),
    goToPrevious: () => setPage((current) => Math.max(0, current - 1)),
    goToNext: () => setPage((current) => current + 1),
    isPreviousDisabled: meta.first || isLoading,
    isNextDisabled: meta.last || isLoading,
    showingText,
    markAsRead,
  };
};
