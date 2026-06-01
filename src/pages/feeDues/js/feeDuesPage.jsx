import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../../../components/reusable/css/crmReusable.css';
import '../css/feeDuesPage.css';
import { feeDuesPageMock } from '../../../data/mocks/feeDues/feeDuesPage.mock';
import { buildStudentDetailPath } from '../../../constants/routePaths';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';
import {
  PageHeader,
  CrmButton,
  FilterToolbar,
  DataTableCard,
} from '../../../components/reusable/js/index';
import { useMasterDataSelect } from '../../../hooks/useMasterDataSelect';
import { MASTER_DATA_KEYS } from '../../../utils/masterDataOptions';

const FeeDuesPage = () => {
  const { title, subtitle, filters, table, rows, summaryTotal } = feeDuesPageMock;

  const { options: yearOptions, isLoading: yearLoading } = useMasterDataSelect(
    MASTER_DATA_KEYS.academicYear,
    {
      prepend: [{ label: filters.defaultAcademicYear, value: filters.defaultAcademicYear }],
      useIdAsValue: false,
      loadingLabel: filters.loadingLabel,
    },
  );

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
      useIdAsValue: false,
      loadingLabel: filters.loadingLabel,
    },
  );

  const termOptions = useMemo(
    () => [
      { label: filters.allTermsLabel, value: filters.allTermsLabel },
      { label: 'Term 1', value: 'term1' },
      { label: 'Term 2', value: 'term2' },
      { label: 'Term 3', value: 'term3' },
    ],
    [filters.allTermsLabel],
  );

  const filterSelects = [
    {
      id: 'year',
      ariaLabel: filters.academicYearAriaLabel,
      options: yearOptions,
      defaultValue: filters.defaultAcademicYear,
      disabled: yearLoading,
    },
    {
      id: 'class',
      ariaLabel: filters.classAriaLabel,
      options: classOptions,
      defaultValue: filters.allClassesLabel,
      disabled: classLoading,
    },
    {
      id: 'section',
      ariaLabel: filters.sectionAriaLabel,
      options: sectionOptions,
      defaultValue: filters.allSectionsLabel,
      disabled: sectionLoading,
    },
    {
      id: 'term',
      ariaLabel: filters.termAriaLabel,
      options: termOptions,
      defaultValue: filters.allTermsLabel,
    },
  ];

  const handleExportCsv = () => {
    const header = table.columns.join(',');
    const body = rows
      .map((row) =>
        [
          row.name,
          row.admissionNo,
          row.className,
          row.section,
          row.term1Due,
          row.term2Due,
          row.term3Due,
          row.totalOutstanding,
        ].join(','),
      )
      .join('\n');
    const blob = new Blob([`${header}\n${body}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'fee-dues.csv';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="crmListPage feeDuesPage">
      <PageHeader title={title} subtitle={subtitle}>
        <CrmButton
          variant="outline"
          type="button"
          onClick={handleExportCsv}
          aria-label={filters.exportAriaLabel}
        >
          {DashboardIcons.download(16)}
          {filters.exportLabel}
        </CrmButton>
      </PageHeader>

      <FilterToolbar
        searchPlaceholder={filters.searchPlaceholder}
        searchAriaLabel={filters.searchAriaLabel}
        selects={filterSelects}
      />

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
            {rows.length === 0 && (
              <tr>
                <td colSpan={8} className="feeDuesEmpty">
                  {table.emptyMessage}
                </td>
              </tr>
            )}
            {rows.map((row) => (
              <tr key={row.id} className="crmTableRow">
                <td>
                  <Link
                    className="feeDuesStudentLink"
                    to={`${buildStudentDetailPath(row.studentId)}?tab=fees`}
                  >
                    {row.name}
                  </Link>
                </td>
                <td className="crmTableId">{row.admissionNo}</td>
                <td>{row.className}</td>
                <td>{row.section}</td>
                <td className="feeDuesAmount">{row.term1Due}</td>
                <td className="feeDuesAmount">{row.term2Due}</td>
                <td className="feeDuesAmount">{row.term3Due}</td>
                <td className="feeDuesTotal">{row.totalOutstanding}</td>
              </tr>
            ))}
          </tbody>
          {rows.length > 0 && (
            <tfoot>
              <tr className="feeDuesSummaryRow">
                <td colSpan={7}>{table.summaryLabel}</td>
                <td className="feeDuesTotal">{summaryTotal}</td>
              </tr>
            </tfoot>
          )}
        </table>
      </DataTableCard>
    </div>
  );
};

export default FeeDuesPage;
