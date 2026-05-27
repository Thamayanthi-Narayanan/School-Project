import { CrmButton, TableRowActions } from '../../../components/reusable/js/index';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';

const formatQuarterCell = (value) => {
  const trimmed = String(value ?? '').trim();
  return trimmed === '' ? '—' : trimmed;
};

const FeeCategoriesViewTable = ({
  categories,
  rows,
  isLoading,
  loadError,
  columnTotals,
  getRowTotalDisplay,
  quarterAria,
  onRetry,
  onEditHead,
  onDeleteHead,
  onEditAmounts,
  variant = 'view',
}) => {
  const { actionHeadings } = categories;
  const isCreateMode = variant === 'create';
  const tableColumns = isCreateMode ? categories.createColumns : categories.columns;
  const trailingColCount = 2;
  const colSpan = tableColumns.length + trailingColCount;

  const renderQuarterCells = (row) => {
    if (isCreateMode) return null;

    return (
      <>
        <td
          className="feeStructureAmountCell"
          role="button"
          tabIndex={0}
          onClick={() => onEditAmounts(row)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onEditAmounts(row);
            }
          }}
        >
          <span className="feeStructureCellText">{formatQuarterCell(row.q1)}</span>
        </td>
        <td
          className="feeStructureAmountCell"
          role="button"
          tabIndex={0}
          onClick={() => onEditAmounts(row)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onEditAmounts(row);
            }
          }}
        >
          <span className="feeStructureCellText">{formatQuarterCell(row.q2)}</span>
        </td>
        <td
          className="feeStructureAmountCell"
          role="button"
          tabIndex={0}
          onClick={() => onEditAmounts(row)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onEditAmounts(row);
            }
          }}
        >
          <span className="feeStructureCellText">{formatQuarterCell(row.q3)}</span>
        </td>
        <td
          className="feeStructureAmountCell"
          role="button"
          tabIndex={0}
          onClick={() => onEditAmounts(row)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onEditAmounts(row);
            }
          }}
          aria-label={`${row.name} ${quarterAria.q4}`}
        >
          <span className="feeStructureCellText">{formatQuarterCell(row.q4)}</span>
        </td>
      </>
    );
  };

  const renderTotalsRow = () => {
    if (isCreateMode) return null;

    return (
      <tr className="feeStructureTotalsRow">
        <td className="feeStructureTotalsLabel">{categories.totalsRow.label}</td>
        <td>{columnTotals.q1}</td>
        <td>{columnTotals.q2}</td>
        <td>{columnTotals.q3}</td>
        <td>{columnTotals.q4}</td>
        <td className="feeStructureGrandTotal">{columnTotals.grandTotal}</td>
        <td />
        <td />
      </tr>
    );
  };

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
              {tableColumns.map((col) => (
                <th key={col}>{col}</th>
              ))}
              <th className="feeStructureTableSubHead">{actionHeadings.edit}</th>
              <th className="feeStructureTableSubHead">{actionHeadings.delete}</th>
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
                  <span className="feeStructureCategoryText">{row.name}</span>
                </td>
                {renderQuarterCells(row)}
                {!isCreateMode ? (
                  <td
                    className="feeStructureRowTotal feeStructureAmountCell"
                    role="button"
                    tabIndex={0}
                    onClick={() => onEditAmounts(row)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onEditAmounts(row);
                      }
                    }}
                  >
                    {getRowTotalDisplay(row)}
                  </td>
                ) : null}
                <td className="feeStructureTableActionCell">
                  <TableRowActions
                    entityName={row.name}
                    showView={false}
                    showDelete={false}
                    onEdit={() => onEditHead(row)}
                  />
                </td>
                <td className="feeStructureTableActionCell">
                  <button
                    type="button"
                    className="crmActionBtn crmActionBtnDanger"
                    aria-label={`Delete ${row.name}`}
                    onClick={() => onDeleteHead(row)}
                  >
                    {DashboardIcons.trash(16)}
                  </button>
                </td>
              </tr>
            ))}
            {!isLoading && !loadError && rows.length > 0 ? renderTotalsRow() : null}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FeeCategoriesViewTable;
