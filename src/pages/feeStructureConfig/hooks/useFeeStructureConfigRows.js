import { useMemo, useState } from 'react';
import { useFeeStructureCategories } from '../../feeStructure/hooks/useFeeStructureCategories';

export const useFeeStructureConfigRows = (categoriesCopy, deleteCopy) => {
  const [searchQuery, setSearchQuery] = useState('');
  const categories = useFeeStructureCategories(categoriesCopy, deleteCopy);

  const filteredRows = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return categories.rows;
    return categories.rows.filter((row) =>
      String(row.name ?? '').toLowerCase().includes(query),
    );
  }, [categories.rows, searchQuery]);

  const handleDeleteRow = (row) => {
    if (row.isLocal) {
      categories.removeRowLocal(row.id);
      return;
    }
    categories.openDeleteConfirm(row);
  };

  return {
    ...categories,
    rows: filteredRows,
    allRows: categories.rows,
    searchQuery,
    setSearchQuery,
    handleDeleteRow,
  };
};
