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
} from '../../../components/reusable/js/index';
import { useStudentsList } from '../hooks/useStudentsList';
import { useMasterDataSelect } from '../../../hooks/useMasterDataSelect';
import { downloadStudentsImportTemplate } from '../../../utils/studentsImportTemplate';
import { MASTER_DATA_KEYS } from '../../../utils/masterDataOptions';

const StudentsPage = () => {
  const {
    title,
    subtitle,
    actions,
    filters,
    pagination,
    list,
  } = studentsPageMock;

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

  const { options: classOptions, isLoading: classLoading } = useMasterDataSelect(
    MASTER_DATA_KEYS.class,
    {
      prepend: [{ label: filters.allClassesLabel, value: filters.allClassesLabel }],
      useIdAsValue: false,
      loadingLabel: filters.loadingLabel,
    },
  );

  const { options: sectionOptions, isLoading: sectionLoading } = useMasterDataSelect(
    MASTER_DATA_KEYS.section,
    {
      prepend: [{ label: filters.allSectionsLabel, value: filters.allSectionsLabel }],
      loadingLabel: filters.loadingLabel,
    },
  );

  const { options: yearOptions, isLoading: yearLoading } = useMasterDataSelect(
    MASTER_DATA_KEYS.academicYear,
    {
      prepend: [{ label: filters.defaultYear, value: filters.defaultYear }],
      useIdAsValue: false,
      loadingLabel: filters.loadingLabel,
    },
  );

  const filterSelects = [
    {
      id: 'class',
      ariaLabel: 'Filter by class',
      options: classOptions,
      defaultValue: filters.defaultClass,
      disabled: classLoading,
    },
    {
      id: 'section',
      ariaLabel: 'Filter by section',
      options: sectionOptions,
      defaultValue: filters.defaultSection,
      disabled: sectionLoading,
    },
    {
      id: 'year',
      ariaLabel: 'Filter by academic year',
      options: yearOptions,
      defaultValue: filters.defaultYear,
      disabled: yearLoading,
    },
  ];

  const handleDownloadFormat = () => {
    downloadStudentsImportTemplate(actions.templateFileName);
  };

  return (
    <div className="crmListPage studentsPage">
      <PageHeader title={title} subtitle={subtitle}>
        <CrmButton variant="outline" type="button" aria-label={actions.bulkUploadAriaLabel}>
          {DashboardIcons.upload(16)}
          {actions.bulkUploadLabel}
        </CrmButton>
        <CrmButton
          variant="primary"
          type="button"
          onClick={handleDownloadFormat}
          aria-label={actions.downloadFormatAriaLabel}
        >
          {DashboardIcons.download(16)}
          {actions.downloadFormatLabel}
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
    </div>
  );
};

export default StudentsPage;
