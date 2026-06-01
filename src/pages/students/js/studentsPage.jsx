import { useNavigate } from 'react-router-dom';
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
import { MASTER_DATA_KEYS } from '../../../utils/masterDataOptions';
import { routePaths, buildStudentDetailPath } from '../../../constants/routePaths';
import { useFilterPersistence } from '../../../hooks/useFilterPersistence';

const StudentsPage = () => {
  const navigate = useNavigate();
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

  const { filters: persistedFilters, updateFilter } = useFilterPersistence('studentsListFilters', {
    class: filters.defaultClass,
    section: filters.defaultSection,
    year: filters.defaultYear,
    status: filters.defaultStatus,
    search: '',
  });

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

  const statusOptions = [
    { label: filters.allStatusesLabel, value: filters.allStatusesLabel },
    { label: filters.activeStatusLabel, value: filters.activeStatusLabel },
    { label: filters.discontinuedStatusLabel, value: filters.discontinuedStatusLabel },
  ];

  const filterSelects = [
    {
      id: 'class',
      ariaLabel: filters.classAriaLabel,
      options: classOptions,
      value: persistedFilters.class,
      onChange: (event) => updateFilter('class', event.target.value),
      disabled: classLoading,
    },
    {
      id: 'section',
      ariaLabel: filters.sectionAriaLabel,
      options: sectionOptions,
      value: persistedFilters.section,
      onChange: (event) => updateFilter('section', event.target.value),
      disabled: sectionLoading,
    },
    {
      id: 'year',
      ariaLabel: filters.yearAriaLabel,
      options: yearOptions,
      value: persistedFilters.year,
      onChange: (event) => updateFilter('year', event.target.value),
      disabled: yearLoading,
    },
    {
      id: 'status',
      ariaLabel: filters.statusAriaLabel,
      options: statusOptions,
      value: persistedFilters.status,
      onChange: (event) => updateFilter('status', event.target.value),
    },
  ];

  const handleRowClick = (student) => {
    navigate(buildStudentDetailPath(student.displayId || student.id));
  };

  return (
    <div className="crmListPage studentsPage">
      <PageHeader title={title} subtitle={subtitle}>
        <CrmButton
          variant="outline"
          type="button"
          aria-label={actions.bulkUploadAriaLabel}
          onClick={() => navigate(routePaths.bulkUpload)}
        >
          {DashboardIcons.upload(16)}
          {actions.bulkUploadLabel}
        </CrmButton>
        <CrmButton
          variant="primary"
          type="button"
          onClick={() => navigate(routePaths.admission)}
        >
          {DashboardIcons.userPlus(16)}
          {actions.admitStudentLabel}
        </CrmButton>
      </PageHeader>

      <FilterToolbar
        searchPlaceholder={filters.searchPlaceholder}
        searchAriaLabel={filters.searchAriaLabel}
        searchValue={persistedFilters.search}
        onSearchChange={(event) => updateFilter('search', event.target.value)}
        selects={filterSelects}
        showExport
        exportAriaLabel="Export students"
      />

      {error && (
        <div className="studentsListAlert">
          <p className="studentsListAlertText" role="alert">
            {error}
          </p>
          <CrmButton variant="outline" type="button" onClick={refetch}>
            {studentsPageMock.listErrors.retryLabel}
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
              {list.columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading && !error && (
              <tr>
                <td colSpan={8} className="studentsListState">
                  {list.loadingMessage}
                </td>
              </tr>
            )}
            {!isLoading && !error && students.length === 0 && (
              <tr>
                <td colSpan={8} className="studentsListState">
                  {list.emptyMessage}
                </td>
              </tr>
            )}
            {!isLoading && !error && students.map((student) => (
              <tr
                key={student.id}
                className="crmTableRow studentsTableRowClickable"
                onClick={() => handleRowClick(student)}
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
                <td>{student.sectionName}</td>
                <td>{student.academicYear}</td>
                <td className="crmTablePhone">
                  <PhoneCell phone={student.phone} />
                </td>
                <td>
                  <StatusPill status={student.feeStatus} type="fee" />
                </td>
                <td onClick={(event) => event.stopPropagation()}>
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
