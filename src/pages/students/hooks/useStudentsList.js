import { useCallback, useEffect, useMemo, useState } from 'react';
import { listStudents } from '../../../apis/studentsApi';
import { studentsPageMock } from '../../../data/mocks/students/studentsPage.mock';
import { parseApiError } from '../../../utils/apiError';
import {
  buildStudentsShowingText,
  mapApiStudentToRow,
} from '../../../utils/studentsList';

const errorCopy = studentsPageMock.listErrors;
const defaultPageSize = studentsPageMock.pagination.pageSize;

const emptyMeta = {
  page: 0,
  size: defaultPageSize,
  totalElements: 0,
  totalPages: 0,
  first: true,
  last: true,
};

export const useStudentsList = (pageSize = defaultPageSize) => {
  const [page, setPage] = useState(0);
  const [students, setStudents] = useState([]);
  const [meta, setMeta] = useState(emptyMeta);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudents = useCallback(async (pageIndex) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await listStudents({ page: pageIndex, size: pageSize });

      if (!response?.success || !response?.data) {
        setError(response?.message || errorCopy.loadFailed);
        setStudents([]);
        setMeta(emptyMeta);
        return;
      }

      const { content = [], ...pagination } = response.data;
      setStudents(content.map(mapApiStudentToRow));
      setMeta({
        page: pagination.page ?? pageIndex,
        size: pagination.size ?? pageSize,
        totalElements: pagination.totalElements ?? 0,
        totalPages: pagination.totalPages ?? 0,
        first: pagination.first ?? pageIndex === 0,
        last: pagination.last ?? true,
      });
    } catch (err) {
      const { general, status } = parseApiError(err);

      setError(
        status === 403
          ? errorCopy.accessDenied
          : status === 401
            ? errorCopy.authFailed
            : general || errorCopy.loadFailed,
      );
      setStudents([]);
      setMeta(emptyMeta);
    } finally {
      setIsLoading(false);
    }
  }, [pageSize]);

  useEffect(() => {
    fetchStudents(page);
  }, [page, fetchStudents]);

  const showingText = useMemo(
    () => buildStudentsShowingText(meta.page, meta.size, meta.totalElements),
    [meta.page, meta.size, meta.totalElements],
  );

  const goToPrevious = useCallback(() => {
    setPage((current) => Math.max(0, current - 1));
  }, []);

  const goToNext = useCallback(() => {
    setPage((current) => current + 1);
  }, []);

  return {
    students,
    isLoading,
    error,
    showingText,
    isPreviousDisabled: meta.first,
    isNextDisabled: meta.last,
    goToPrevious,
    goToNext,
    refetch: () => fetchStudents(page),
  };
};
