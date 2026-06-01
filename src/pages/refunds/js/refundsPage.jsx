import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import '../../../components/reusable/css/crmReusable.css';
import '../css/refundsPage.css';
import { refundsPageMock } from '../../../data/mocks/refunds/refundsPage.mock';
import StatusPill from '../../../components/common/js/statusPill';
import {
  PageHeader,
  CrmButton,
  DataTableCard,
  FormSelect,
  FormTextarea,
  useModal,
} from '../../../components/reusable/js/index';

const RefundsPage = () => {
  const {
    title,
    subtitle,
    filters,
    table,
    rows: initialRows,
    completeModal,
    actions,
  } = refundsPageMock;

  const [rows, setRows] = useState(initialRows);
  const [statusFilter, setStatusFilter] = useState(filters.defaultStatus);
  const [completeTarget, setCompleteTarget] = useState(null);
  const [remarks, setRemarks] = useState('');

  const { isOpen: isCompleteOpen, openModal: openCompleteModal, closeModal: closeCompleteModal } = useModal();

  const filteredRows = useMemo(() => {
    if (statusFilter === 'all') return rows;
    return rows.filter((row) => row.status.toLowerCase() === statusFilter);
  }, [rows, statusFilter]);

  const handleOpenComplete = (row) => {
    setCompleteTarget(row);
    setRemarks('');
    openCompleteModal();
  };

  const handleConfirmComplete = () => {
    if (!completeTarget) return;
    setRows((prev) =>
      prev.map((row) =>
        (row.id === completeTarget.id ? { ...row, status: 'Completed' } : row),
      ),
    );
    closeCompleteModal();
    setCompleteTarget(null);
    setRemarks('');
  };

  return (
    <div className="crmListPage refundsPage">
      <PageHeader title={title} subtitle={subtitle} />

      <div className="refundsFilter crmSectionAnimate crmSectionDelay1">
        <FormSelect
          ariaLabel={filters.statusAriaLabel}
          options={filters.statusOptions}
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          variant="filter"
        />
      </div>

      <DataTableCard className="crmSectionAnimate crmSectionDelay2">
        <table className="crmTable">
          <thead>
            <tr>
              {table.columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRows.length === 0 && (
              <tr>
                <td colSpan={8} className="refundsEmpty">
                  {table.emptyMessage}
                </td>
              </tr>
            )}
            {filteredRows.map((row) => (
              <tr key={row.id} className="crmTableRow">
                <td className="refundsStudentName">{row.studentName}</td>
                <td className="crmTableId">{row.admissionNo}</td>
                <td>{row.className}</td>
                <td className="refundsAmount">{row.amount}</td>
                <td>{row.reason}</td>
                <td>{row.dateTriggered}</td>
                <td>
                  <StatusPill status={row.status} type="workflow" />
                </td>
                <td>
                  {row.status === 'Pending' && (
                    <CrmButton
                      variant="outline"
                      type="button"
                      onClick={() => handleOpenComplete(row)}
                      aria-label={`${actions.completeAriaLabel} ${row.studentName}`}
                    >
                      {actions.completeLabel}
                    </CrmButton>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTableCard>

      {isCompleteOpen && completeTarget && createPortal(
        <div
          className="crmModalOverlay"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeCompleteModal();
          }}
        >
          <div className="crmModal refundsConfirmModal" role="dialog" aria-modal="true">
            <header className="crmModalHeader">
              <h2 className="crmModalTitle">{completeModal.title}</h2>
            </header>
            <p className="refundsConfirmText">
              {completeModal.messagePrefix}
              {' '}
              <strong>{completeTarget.amount}</strong>
              {' '}
              {completeModal.messageMiddle}
              {' '}
              <strong>{completeTarget.studentName}</strong>
              {' '}
              {completeModal.messageSuffix}
            </p>
            <div className="refundsRemarksField">
              <FormTextarea
                label={completeModal.remarksLabel}
                placeholder={completeModal.remarksPlaceholder}
                value={remarks}
                onChange={(event) => setRemarks(event.target.value)}
                rows={3}
              />
            </div>
            <footer className="crmModalFooter">
              <CrmButton variant="outline" type="button" onClick={closeCompleteModal}>
                {completeModal.cancelLabel}
              </CrmButton>
              <CrmButton variant="primary" type="button" onClick={handleConfirmComplete}>
                {completeModal.confirmLabel}
              </CrmButton>
            </footer>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
};

export default RefundsPage;
