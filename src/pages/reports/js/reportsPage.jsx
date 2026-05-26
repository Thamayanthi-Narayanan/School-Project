import '../../../components/reusable/css/crmReusable.css';
import '../css/reportsPage.css';
import { reportsPageMock } from '../../../data/mocks/reports/reportsPage.mock';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';
import { PageHeader, CrmButton, FormSelect } from '../../../components/reusable/js/index';

const iconVariantClassMap = {
  blue: 'reportsCardIconBlue',
  green: 'reportsCardIconGreen',
  amber: 'reportsCardIconAmber',
};

const ReportsPage = () => {
  const { title, subtitle, filters, actions, reports } = reportsPageMock;

  return (
    <div className="crmListPage reportsPage">
      <PageHeader title={title} subtitle={subtitle} className="reportsPageHeader" />

      <section className="reportsFilterCard crmSectionAnimate">
        <div className="reportsFilterRow">
          <FormSelect
            options={filters.academicYearOptions}
            defaultValue={filters.defaultAcademicYear}
            ariaLabel="Academic Year"
            variant="filter"
          />
          <FormSelect
            options={filters.classOptions}
            defaultValue={filters.defaultClass}
            ariaLabel="Class"
            variant="filter"
          />
          <FormSelect
            options={filters.monthOptions}
            defaultValue={filters.defaultMonth}
            ariaLabel="Month"
            variant="filter"
          />
        </div>
      </section>

      <section className="reportsGrid crmSectionAnimate reportsSectionDelay1">
        {reports.map((report) => {
          const IconComponent = DashboardIcons[report.icon];
          const iconVariantClass = iconVariantClassMap[report.iconVariant] || iconVariantClassMap.blue;

          return (
            <article key={report.id} className="reportsCard">
              <span className={`reportsCardIcon ${iconVariantClass}`} aria-hidden="true">
                {IconComponent ? IconComponent(20) : DashboardIcons.barChart(20)}
              </span>
              <h2 className="reportsCardTitle">{report.title}</h2>
              <p className="reportsCardDesc">{report.description}</p>
              <div className="reportsCardActions">
                <CrmButton variant="outline" className="reportsExportBtn">
                  {DashboardIcons.fileSpreadsheet(16)}
                  {actions.excelLabel}
                </CrmButton>
                <CrmButton variant="outline" className="reportsExportBtn">
                  {DashboardIcons.fileText(16)}
                  {actions.pdfLabel}
                </CrmButton>
                <CrmButton variant="primary" className="reportsRunBtn">
                  {DashboardIcons.playRun(16)}
                  {actions.runLabel}
                </CrmButton>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default ReportsPage;
