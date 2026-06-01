import { useCallback, useEffect, useState } from 'react';

export const useFilterPersistence = (storageKey, initialFilters) => {
  const readStored = () => {
    try {
      const raw = sessionStorage.getItem(storageKey);
      if (!raw) return initialFilters;
      return { ...initialFilters, ...JSON.parse(raw) };
    } catch {
      return initialFilters;
    }
  };

  const [filters, setFilters] = useState(readStored);

  useEffect(() => {
    sessionStorage.setItem(storageKey, JSON.stringify(filters));
  }, [filters, storageKey]);

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  return { filters, updateFilter, resetFilters };
};

export default useFilterPersistence;
