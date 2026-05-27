import '../../../components/reusable/css/crmReusable.css';
import '../css/reportsPage.css';
import { reportsPageMock } from '../../../data/mocks/reports/reportsPage.mock';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';
import { PageHeader, CrmButton, FormSelect } from '../../../components/reusable/js/index';
import { REPORT_EXPORT_FORMAT } from '../../../utils/reportExportUtils';
import { useReportsList } from '../hooks/useReportsList';
import { useReportsFilters } from '../hooks/useReportsFilters';
import { useReportExport } from '../hooks/useReportExport';

const iconVariantClassMap = {
  blue: 'reportsCardIconBlue',
  green: 'reportsCardIconGreen',
  amber: 'reportsCardIconAmber',
};

const ReportsPage = () => {
  const { title, subtitle, filters, actions, list } = reportsPageMock;

  const { reports, isLoading, loadError, refetch } = useReportsList(list);

  const {
    filters: exportFilters,
    academicYearOptions,
    classOptions,
    monthOptions,
    yearOptions,
    isLoading: filtersLoading,
    setAcademicYearId,
    setClassId,
    setStartMonth,
    setStartYear,
    setEndMonth,
    setEndYear,
  } = useReportsFilters(filters);

  const { exportError, exportReportFile, isExporting, clearExportError } = useReportExport();

  const showMonthYearFilters = reports.some(
    (report) => report.monthYearRangeFilterSupported,
  );

  const filtersDisabled = isLoading || filtersLoading;

  const handleExport = (report, format) => {
    clearExportError();
    exportReportFile(report, format, exportFilters);
  };

  return (
    <div className="crmListPage reportsPage">
      <PageHeader title={title} subtitle={subtitle} className="reportsPageHeader" />

      <section className="reportsFilterCard crmSectionAnimate">
        <div className="reportsFilterRow reportsFilterRowPrimary">
          <FormSelect
            options={academicYearOptions}
            value={exportFilters.academicYearId}
            onChange={(event) => setAcademicYearId(event.target.value)}
            ariaLabel={filters.academicYearAriaLabel}
            variant="filter"
            disabled={filtersDisabled}
          />
          <FormSelect
            options={classOptions}
            value={exportFilters.classId}
            onChange={(event) => setClassId(event.target.value)}
            ariaLabel={filters.classAriaLabel}
            variant="filter"
            disabled={filtersDisabled}
          />
        </div>

        {showMonthYearFilters ? (
          <div className="reportsFilterRow reportsFilterRowRange">
            <FormSelect
              options={monthOptions}
              value={exportFilters.startMonth}
              onChange={(event) => setStartMonth(event.target.value)}
              ariaLabel={filters.startMonthAriaLabel}
              variant="filter"
              disabled={filtersDisabled}
            />
            <FormSelect
              options={yearOptions}
              value={exportFilters.startYear}
              onChange={(event) => setStartYear(event.target.value)}
              ariaLabel={filters.startYearAriaLabel}
              variant="filter"
              disabled={filtersDisabled}
            />
            <FormSelect
              options={monthOptions}
              value={exportFilters.endMonth}
              onChange={(event) => setEndMonth(event.target.value)}
              ariaLabel={filters.endMonthAriaLabel}
              variant="filter"
              disabled={filtersDisabled}
            />
            <FormSelect
              options={yearOptions}
              value={exportFilters.endYear}
              onChange={(event) => setEndYear(event.target.value)}
              ariaLabel={filters.endYearAriaLabel}
              variant="filter"
              disabled={filtersDisabled}
            />
          </div>
        ) : null}
      </section>

      {exportError ? (
        <div className="reportsListAlert">
          <p className="reportsListAlertText" role="alert">
            {exportError}
          </p>
        </div>
      ) : null}

      {loadError ? (
        <div className="reportsListAlert">
          <p className="reportsListAlertText" role="alert">
            {loadError}
          </p>
          <CrmButton variant="secondary" type="button" onClick={refetch}>
            {list.retryLabel}
          </CrmButton>
        </div>
      ) : null}

      <section
        className="reportsGrid crmSectionAnimate reportsSectionDelay1"
        aria-busy={isLoading}
      >
        {isLoading && !loadError ? (
          <p className="reportsGridState">{list.loadingMessage}</p>
        ) : null}

        {!isLoading && !loadError && reports.length === 0 ? (
          <p className="reportsGridState">{list.emptyMessage}</p>
        ) : null}

        {!isLoading && !loadError
          ? reports.map((report) => {
            const IconComponent = DashboardIcons[report.icon];
            const iconVariantClass =
              iconVariantClassMap[report.iconVariant] || iconVariantClassMap.blue;
            const excelLoading = isExporting(report.reportType, REPORT_EXPORT_FORMAT.EXCEL);
            const pdfLoading = isExporting(report.reportType, REPORT_EXPORT_FORMAT.PDF);

            return (
              <article key={report.id} className="reportsCard">
                <span className={`reportsCardIcon ${iconVariantClass}`} aria-hidden="true">
                  {IconComponent ? IconComponent(20) : DashboardIcons.barChart(20)}
                </span>
                <h2 className="reportsCardTitle">{report.title}</h2>
                <p className="reportsCardDesc">{report.description}</p>
                <div className="reportsCardActions">
                  <CrmButton
                    variant="outline"
                    className="reportsExportBtn"
                    type="button"
                    disabled={excelLoading || pdfLoading}
                    onClick={() => handleExport(report, REPORT_EXPORT_FORMAT.EXCEL)}
                  >
                    {DashboardIcons.fileSpreadsheet(16)}
                    {excelLoading ? actions.exportingLabel : actions.excelLabel}
                  </CrmButton>
                  <CrmButton
                    variant="outline"
                    className="reportsExportBtn"
                    type="button"
                    disabled={excelLoading || pdfLoading}
                    onClick={() => handleExport(report, REPORT_EXPORT_FORMAT.PDF)}
                  >
                    {DashboardIcons.fileText(16)}
                    {pdfLoading ? actions.exportingLabel : actions.pdfLabel}
                  </CrmButton>
                  <CrmButton variant="primary" className="reportsRunBtn" type="button">
                    {DashboardIcons.playRun(16)}
                    {actions.runLabel}
                  </CrmButton>
                </div>
              </article>
            );
          })
          : null}
      </section>
    </div>
  );
};

export default ReportsPage;
