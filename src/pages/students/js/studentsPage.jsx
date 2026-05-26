import '../../../components/reusable/css/crmReusable.css';
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
  useListPagination,
} from '../../../components/reusable/js/index';

const StudentsPage = () => {
  const {
    title,
    subtitle,
    actions,
    filters,
    students,
    pagination,
    addStudentModal,
  } = studentsPageMock;

  const { isOpen, openModal, closeModal } = useModal();
  const {
    paginatedItems,
    showingText,
    isPreviousDisabled,
    isNextDisabled,
    goToPrevious,
    goToNext,
  } = useListPagination(students, pagination.pageSize, 'students');

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

      <DataTableCard
        footer={(
          <footer className="crmTableFooter">
            <p className="crmTableCount">{showingText}</p>
            <div className="crmPagination">
              <CrmButton
                variant="pagination"
                disabled={isPreviousDisabled}
                onClick={goToPrevious}
              >
                {pagination.previousLabel}
              </CrmButton>
              <CrmButton
                variant="pagination"
                disabled={isNextDisabled}
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
              <th>STUDENT</th>
              <th>CLASS</th>
              <th>PARENT</th>
              <th>PHONE</th>
              <th>FEE STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((student, index) => (
              <tr
                key={student.id}
                className="crmTableRow"
                style={{ animationDelay: `${0.04 * index}s` }}
              >
                <td className="crmTableId">{student.id}</td>
                <td>
                  <PersonCell
                    initials={student.initials}
                    name={student.name}
                    subtext={student.roll}
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
