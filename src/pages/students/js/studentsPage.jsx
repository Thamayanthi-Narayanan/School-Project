import '../../../components/reusable/css/crmReusable.css';
import '../css/studentsPage.css';
import { studentsPageMock } from '../../../data/mocks/students/studentsPage.mock';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';
import StatusPill from '../../../components/common/js/statusPill';
import {
  PageHeader,
  CrmButton,
  FilterToolbar,
  DataTableCard,
  PersonCell,
  PhoneCell,
  TableRowActions,
  EntityFormModal,
  useModal,
} from '../../../components/reusable/js/index';
import { useStudentsList } from '../hooks/useStudentsList';

const StudentsPage = () => {
  const {
    title,
    subtitle,
    actions,
    filters,
    pagination,
    addStudentModal,
    list,
  } = studentsPageMock;

  const { isOpen, openModal, closeModal } = useModal();
  const {
    students,
    isLoading,
    error,
    showingText,
    isPreviousDisabled,
    isNextDisabled,
    goToPrevious,
    goToNext,
    refetch,
  } = useStudentsList(pagination.pageSize);

  const filterSelects = [
    {
      id: 'class',
      ariaLabel: 'Filter by class',
      options: filters.classOptions,
      defaultValue: filters.defaultClass,
    },
    {
      id: 'section',
      ariaLabel: 'Filter by section',
      options: filters.sectionOptions,
      defaultValue: filters.defaultSection,
    },
    {
      id: 'year',
      ariaLabel: 'Filter by academic year',
      options: filters.yearOptions,
      defaultValue: filters.defaultYear,
    },
  ];

  return (
    <div className="crmListPage studentsPage">
      <PageHeader title={title} subtitle={subtitle}>
        <CrmButton variant="outline">
          {DashboardIcons.upload(16)}
          {actions.bulkUploadLabel}
        </CrmButton>
        <CrmButton variant="primary" onClick={openModal}>
          {DashboardIcons.plus(16)}
          {actions.addStudentLabel}
        </CrmButton>
      </PageHeader>

      <FilterToolbar
        searchPlaceholder={filters.searchPlaceholder}
        searchAriaLabel="Search students"
        selects={filterSelects}
        showExport
        exportAriaLabel="Export students"
      />

      {error && (
        <div className="studentsListAlert">
          <p className="studentsListAlertText" role="alert">
            {error}
          </p>
          <CrmButton variant="secondary" type="button" onClick={refetch}>
            Try again
          </CrmButton>
        </div>
      )}

      <DataTableCard
        footer={(
          <footer className="crmTableFooter">
            <p className="crmTableCount">{showingText}</p>
            <div className="crmPagination">
              <CrmButton
                variant="pagination"
                disabled={isPreviousDisabled || isLoading}
                onClick={goToPrevious}
              >
                {pagination.previousLabel}
              </CrmButton>
              <CrmButton
                variant="pagination"
                disabled={isNextDisabled || isLoading}
                onClick={goToNext}
              >
                {pagination.nextLabel}
              </CrmButton>
            </div>
          </footer>
        )}
      >
        <table className="crmTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>STUDENT NAME</th>
              <th>CLASS</th>
              <th>PARENT NAME</th>
              <th>PHONE NUMBER</th>
              <th>FEE STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && !error && (
              <tr>
                <td colSpan={7} className="studentsListState">
                  {list.loadingMessage}
                </td>
              </tr>
            )}
            {!isLoading && !error && students.length === 0 && (
              <tr>
                <td colSpan={7} className="studentsListState">
                  {list.emptyMessage}
                </td>
              </tr>
            )}
            {!isLoading && !error && students.map((student, index) => (
              <tr
                key={student.id}
                className="crmTableRow"
                style={{ animationDelay: `${0.04 * index}s` }}
              >
                <td className="crmTableId">{student.displayId}</td>
                <td>
                  <PersonCell
                    initials={student.initials}
                    name={student.name}
                    tone="blue"
                  />
                </td>
                <td>{student.className}</td>
                <td>{student.parent}</td>
                <td className="crmTablePhone">
                  <PhoneCell phone={student.phone} />
                </td>
                <td>
                  <StatusPill status={student.feeStatus} type="fee" />
                </td>
                <td>
                  <TableRowActions entityName={student.name} showDelete={false} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTableCard>

      <EntityFormModal
        isOpen={isOpen}
        onClose={closeModal}
        modalData={addStudentModal}
      />
    </div>
  );
};

export default StudentsPage;
