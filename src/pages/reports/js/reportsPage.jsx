import '../../../components/reusable/css/crmReusable.css';
import '../css/reportsPage.css';
import { reportsPageMock } from '../../../data/mocks/reports/reportsPage.mock';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';
import { PageHeader, CrmButton, FormSelect } from '../../../components/reusable/js/index';
import { useMasterDataSelect } from '../../../hooks/useMasterDataSelect';
import { MASTER_DATA_KEYS } from '../../../utils/masterDataOptions';

const iconVariantClassMap = {
  blue: 'reportsCardIconBlue',
  green: 'reportsCardIconGreen',
  amber: 'reportsCardIconAmber',
};

const ReportsPage = () => {
  const { title, subtitle, filters, actions, reports } = reportsPageMock;

  const { options: academicYearOptions, isLoading: yearLoading } = useMasterDataSelect(
    MASTER_DATA_KEYS.academicYear,
    { loadingLabel: filters.loadingLabel },
  );
  const { options: classOptions, isLoading: classLoading } = useMasterDataSelect(
    MASTER_DATA_KEYS.class,
    {
      prepend: [{ label: filters.allClassesLabel, value: filters.allClassesLabel }],
      loadingLabel: filters.loadingLabel,
    },
  );
  const { options: monthOptions, isLoading: monthLoading } = useMasterDataSelect(
    MASTER_DATA_KEYS.termType,
    { loadingLabel: filters.loadingLabel },
  );

  return (
    <div className="crmListPage reportsPage">
      <PageHeader title={title} subtitle={subtitle} className="reportsPageHeader" />

      <section className="reportsFilterCard crmSectionAnimate">
        <div className="reportsFilterRow">
          <FormSelect
            options={academicYearOptions}
            defaultValue={academicYearOptions[0]?.value}
            ariaLabel="Academic Year"
            variant="filter"
            disabled={yearLoading}
          />
          <FormSelect
            options={classOptions}
            defaultValue={filters.defaultClass}
            ariaLabel="Class"
            variant="filter"
            disabled={classLoading}
          />
          <FormSelect
            options={monthOptions}
            defaultValue={monthOptions[0]?.value}
            ariaLabel="Month"
            variant="filter"
            disabled={monthLoading}
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
