import { CrmButton, TableRowActions } from '../../../components/reusable/js/index';

const FeeCategoriesEditableTable = ({
  categories,
  rows,
  isLoading,
  loadError,
  columnTotals,
  getRowTotalDisplay,
  quarterAria,
  onRetry,
  onChangeCategory,
  onChangeQuarter,
  onEditRow,
  onDeleteRow,
}) => {
  const { columns, totalsRow } = categories;
  const colSpan = columns.length + 1;

  return (
    <>
      {loadError ? (
        <div className="feeStructureListError" role="alert">
          <p>{loadError}</p>
          <CrmButton variant="outline" onClick={onRetry} disabled={isLoading}>
            {categories.list.retryLabel}
          </CrmButton>
        </div>
      ) : null}

      <div className="feeStructureTableWrap">
        <table className="feeStructureTable">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
              <th className="feeStructureTableActionHead" aria-label="Row actions" />
            </tr>
          </thead>
          <tbody>
            {isLoading && !loadError ? (
              <tr>
                <td colSpan={colSpan} className="feeStructureListState">
                  {categories.list.loadingMessage}
                </td>
              </tr>
            ) : null}
            {!isLoading && !loadError && rows.length === 0 ? (
              <tr>
                <td colSpan={colSpan} className="feeStructureListState">
                  {categories.list.emptyMessage}
                </td>
              </tr>
            ) : null}
            {!isLoading && !loadError && rows.map((row) => (
              <tr key={row.id}>
                <td className="feeStructureCategoryCell">
                  <input
                    type="text"
                    className="feeStructureCellInput feeStructureCategoryInput"
                    value={row.name}
                    onChange={(event) => onChangeCategory(row.id, event.target.value)}
                    aria-label={`${quarterAria.category} ${row.name || 'new'}`}
                    placeholder="Category name"
                  />
                </td>
                {(['q1', 'q2', 'q3', 'q4']).map((key) => (
                  <td key={key}>
                    <input
                      type="text"
                      inputMode="decimal"
                      className="feeStructureCellInput"
                      value={row[key] ?? ''}
                      onChange={(event) => onChangeQuarter(row.id, key, event.target.value)}
                      aria-label={`${row.name || 'Category'} ${quarterAria[key]}`}
                      placeholder="0"
                    />
                  </td>
                ))}
                <td className="feeStructureRowTotal">{getRowTotalDisplay(row)}</td>
                <td className="feeStructureTableActionCell">
                  <TableRowActions
                    entityName={row.name || 'category'}
                    showView={false}
                    onEdit={() => onEditRow(row)}
                    onDelete={() => onDeleteRow(row)}
                  />
                </td>
              </tr>
            ))}
            {!isLoading && !loadError && rows.length > 0 ? (
              <tr className="feeStructureTotalsRow">
                <td className="feeStructureTotalsLabel">{totalsRow.label}</td>
                <td>{columnTotals.q1}</td>
                <td>{columnTotals.q2}</td>
                <td>{columnTotals.q3}</td>
                <td>{columnTotals.q4}</td>
                <td className="feeStructureGrandTotal">{columnTotals.grandTotal}</td>
                <td />
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FeeCategoriesEditableTable;
