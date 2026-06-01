import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import '../../../components/reusable/css/crmReusable.css';
import '../css/academicYearsPage.css';
import { academicYearsPageMock } from '../../../data/mocks/academicYears/academicYearsPage.mock';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';
import StatusPill from '../../../components/common/js/statusPill';
import {
  PageHeader,
  CrmButton,
  DataTableCard,
  FormInput,
  useModal,
} from '../../../components/reusable/js/index';

const AcademicYearsPage = () => {
  const {
    title,
    subtitle,
    actions,
    table,
    years: initialYears,
    badges,
    addModal,
    editModal,
    deactivateModal,
  } = academicYearsPageMock;

  const [years, setYears] = useState(initialYears);
  const [editingYear, setEditingYear] = useState(null);
  const [deactivateTarget, setDeactivateTarget] = useState(null);
  const [setAsCurrent, setSetAsCurrent] = useState(false);

  const { isOpen: isFormOpen, openModal: openFormModal, closeModal: closeFormModal } = useModal();
  const {
    isOpen: isDeactivateOpen,
    openModal: openDeactivateModal,
    closeModal: closeDeactivateModal,
  } = useModal();

  const formCopy = editingYear ? editModal : addModal;

  const currentYearName = useMemo(
    () => years.find((year) => year.isCurrent)?.name ?? '',
    [years],
  );

  const handleOpenAdd = () => {
    setEditingYear(null);
    setSetAsCurrent(false);
    openFormModal();
  };

  const handleOpenEdit = (year) => {
    setEditingYear(year);
    setSetAsCurrent(year.isCurrent);
    openFormModal();
  };

  const handleSaveYear = (event) => {
    event.preventDefault();
    if (editingYear) {
      setYears((prev) =>
        prev.map((year) => {
          if (year.id === editingYear.id) {
            return { ...year, isCurrent: setAsCurrent };
          }
          if (setAsCurrent) {
            return { ...year, isCurrent: false };
          }
          return year;
        }),
      );
    }
    closeFormModal();
    setEditingYear(null);
    setSetAsCurrent(false);
  };

  const handleConfirmDeactivate = () => {
    if (!deactivateTarget) return;
    setYears((prev) =>
      prev.map((year) =>
        (year.id === deactivateTarget.id
          ? {
            ...year,
            isDeactivated: true,
            status: 'Inactive',
            isCurrent: false,
          }
          : year),
      ),
    );
    closeDeactivateModal();
    setDeactivateTarget(null);
  };

  const handleCloseForm = () => {
    closeFormModal();
    setEditingYear(null);
    setSetAsCurrent(false);
  };

  return (
    <div className="crmListPage academicYearsPage">
      <PageHeader title={title} subtitle={subtitle}>
        <CrmButton variant="primary" type="button" onClick={handleOpenAdd} aria-label={actions.addAriaLabel}>
          {DashboardIcons.plus(16)}
          {actions.addLabel}
        </CrmButton>
      </PageHeader>

      <DataTableCard className="crmSectionAnimate crmSectionDelay1">
        <table className="crmTable">
          <thead>
            <tr>
              {table.columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {years.length === 0 && (
              <tr>
                <td colSpan={6} className="academicYearsEmpty">
                  {table.emptyMessage}
                </td>
              </tr>
            )}
            {years.map((year) => (
              <tr
                key={year.id}
                className={`crmTableRow${year.isDeactivated ? ' academicYearsRowInactive' : ''}`}
              >
                <td className="academicYearsName">{year.name}</td>
                <td>{year.startDate}</td>
                <td>{year.endDate}</td>
                <td>
                  <StatusPill status={year.status} />
                </td>
                <td>
                  {year.isCurrent && (
                    <span className="academicYearsCurrentBadge">{badges.currentYear}</span>
                  )}
                </td>
                <td>
                  <div className="crmRowActions">
                    <button
                      type="button"
                      className="crmActionBtn crmActionBtnDark"
                      aria-label={`${actions.editAriaLabel} ${year.name}`}
                      onClick={() => handleOpenEdit(year)}
                    >
                      {DashboardIcons.edit(16)}
                    </button>
                    {!year.isDeactivated && (
                      <button
                        type="button"
                        className="crmActionBtn crmActionBtnDanger"
                        aria-label={`${actions.deactivateAriaLabel} ${year.name}`}
                        onClick={() => {
                          setDeactivateTarget(year);
                          openDeactivateModal();
                        }}
                      >
                        {DashboardIcons.trash(16)}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTableCard>

      {isFormOpen && createPortal(
        <div
          className="crmModalOverlay"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) handleCloseForm();
          }}
        >
          <div className="crmModal" role="dialog" aria-modal="true" aria-labelledby="academicYearModalTitle">
            <header className="crmModalHeader">
              <h2 id="academicYearModalTitle" className="crmModalTitle">{formCopy.title}</h2>
              <p className="crmModalSubtitle">{formCopy.subtitle}</p>
            </header>
            <form onSubmit={handleSaveYear}>
              <div className="crmModalGrid">
                {formCopy.fields.map((field, index) => (
                  <FormInput
                    key={field.id}
                    label={field.label}
                    type={field.inputType || 'text'}
                    placeholder={field.placeholder}
                    defaultValue={editingYear?.[field.id] ?? ''}
                    icon={field.icon}
                    autoFocus={index === 0}
                  />
                ))}
              </div>
              <div className="academicYearsCurrentToggle">
                <label className="academicYearsToggleLabel">
                  <input
                    type="checkbox"
                    checked={setAsCurrent}
                    onChange={(event) => setSetAsCurrent(event.target.checked)}
                  />
                  <span>{formCopy.setCurrentLabel}</span>
                </label>
                {setAsCurrent && currentYearName && !editingYear?.isCurrent && (
                  <p className="academicYearsWarning" role="status">
                    {formCopy.currentYearWarning.replace('[previous year name]', currentYearName)}
                  </p>
                )}
              </div>
              <footer className="crmModalFooter">
                <CrmButton variant="outline" type="button" onClick={handleCloseForm}>
                  {formCopy.cancelLabel}
                </CrmButton>
                <CrmButton variant="primary" type="submit">
                  {formCopy.saveLabel}
                </CrmButton>
              </footer>
            </form>
          </div>
        </div>,
        document.body,
      )}

      {isDeactivateOpen && deactivateTarget && createPortal(
        <div
          className="crmModalOverlay"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeDeactivateModal();
          }}
        >
          <div className="crmModal academicYearsConfirmModal" role="dialog" aria-modal="true">
            <header className="crmModalHeader">
              <h2 className="crmModalTitle">{deactivateModal.title}</h2>
            </header>
            <p className="academicYearsConfirmText">
              {deactivateModal.messagePrefix}
              {' '}
              <strong>{deactivateTarget.name}</strong>
              ?
              {' '}
              {deactivateModal.messageSuffix}
            </p>
            <footer className="crmModalFooter">
              <CrmButton variant="outline" type="button" onClick={closeDeactivateModal}>
                {deactivateModal.cancelLabel}
              </CrmButton>
              <CrmButton variant="primary" type="button" onClick={handleConfirmDeactivate}>
                {deactivateModal.confirmLabel}
              </CrmButton>
            </footer>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
};

export default AcademicYearsPage;
