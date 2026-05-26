import { useCallback, useMemo, useState } from 'react';

const useListPagination = (items, pageSize = 8, entityLabel = 'items') => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedItems = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, pageSize, safePage]);

  const showingText = useMemo(() => {
    const start = (safePage - 1) * pageSize + 1;
    const end = Math.min(safePage * pageSize, items.length);
    return `Showing ${start}–${end} of ${items.length} ${entityLabel}`;
  }, [items.length, pageSize, safePage, entityLabel]);

  const goToPrevious = useCallback(() => {
    setCurrentPage((page) => Math.max(1, page - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentPage((page) => Math.min(totalPages, page + 1));
  }, [totalPages]);

  return {
    paginatedItems,
    showingText,
    isPreviousDisabled: safePage <= 1,
    isNextDisabled: safePage >= totalPages,
    goToPrevious,
    goToNext,
  };
};

export default useListPagination;
