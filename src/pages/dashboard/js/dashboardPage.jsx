import '../css/dashboardPage.css';
import { dashboardPageMock } from '../../../data/mocks/dashboard/dashboardPage.mock';
import { DashboardIcons, renderNavIcon } from '../../../components/common/js/dashboardIcons';
import { useNavigate } from 'react-router-dom';
import { routePaths } from '../../../constants/routePaths';
import { CrmButton } from '../../../components/reusable/js/index';
import useAuthRole from '../../../hooks/useAuthRole';
import { USER_ROLES } from '../../../constants/userRoles';

const MetricCard = ({ metric, onClick }) => {
  const className = `dashboardMetricCard dashboardMetricCardHover dashboardMetricIcon${metric.iconTone.charAt(0).toUpperCase() + metric.iconTone.slice(1)}${onClick ? ' dashboardMetricCardClickable' : ''}`;

  const content = (
    <>
      <div className="dashboardMetricTop">
        <span className={`dashboardMetricIconWrap dashboardMetricIconWrap${metric.iconTone.charAt(0).toUpperCase() + metric.iconTone.slice(1)}`}>
          {renderNavIcon(metric.icon, 20)}
        </span>
      </div>
      <p className="dashboardMetricLabel">{metric.label}</p>
      <p className="dashboardMetricValue">{metric.value}</p>
      {metric.subtext && <p className="dashboardMetricSub">{metric.subtext}</p>}
    </>
  );

  if (onClick) {
    return (
      <button type="button" className={className} onClick={onClick}>
        {content}
      </button>
    );
  }

  return <article className={className}>{content}</article>;
};

const DashboardPage = () => {
  const { welcome, widgets, recentPayments } = dashboardPageMock;
  const navigate = useNavigate();
  const { role } = useAuthRole();

  const widgetList = Object.values(widgets).filter((widget) => {
    if (!widget.roles) return true;
    return widget.roles.includes(role || USER_ROLES.ADMIN);
  });

  const navigateForWidget = (widget) => {
    if (widget.navigateTo === 'scholarshipRequests') {
      navigate(routePaths.scholarshipRequests);
      return;
    }
    if (widget.navigateTo === 'refunds') {
      navigate(routePaths.refunds);
    }
  };

  return (
    <div className="dashboardPage">
      <section className="dashboardWelcome dashboardSectionAnimate">
        <div className="dashboardWelcomeText">
          <h1 className="dashboardWelcomeTitle">
            {welcome.titleTemplate.replace('{userName}', welcome.userName)}
          </h1>
          <p className="dashboardWelcomeSubtitle">{welcome.subtitle}</p>
          <p className="dashboardWelcomeSync">{welcome.academicYearLabel}</p>
        </div>
        <div className="dashboardWelcomeActions">
          <CrmButton
            variant="outline"
            type="button"
            className="dashboardWelcomeActionBtn"
            onClick={() => navigate(routePaths.admission)}
          >
            {DashboardIcons.plus(16)}
            {welcome.actions.admitStudentLabel}
          </CrmButton>
          <CrmButton
            variant="primary"
            type="button"
            className="dashboardWelcomeActionBtn"
            onClick={() => navigate(routePaths.payments)}
          >
            {DashboardIcons.wallet(16)}
            {welcome.actions.collectFeeLabel}
          </CrmButton>
        </div>
      </section>

      <section className="dashboardMetricsGrid dashboardSectionAnimate dashboardSectionDelay1">
        {widgetList.map((metric) => (
          <MetricCard
            key={metric.id}
            metric={metric}
            onClick={metric.navigateTo ? () => navigateForWidget(metric) : undefined}
          />
        ))}
      </section>

      <section className="dashboardPaymentsRow dashboardSectionAnimate dashboardSectionDelay2">
        <article className="dashboardCard dashboardCardAnimate">
          <header className="dashboardCardHeader">
            <div>
              <h2 className="dashboardCardTitle">{recentPayments.title}</h2>
              <p className="dashboardCardSub">{recentPayments.subtitle}</p>
            </div>
          </header>
          <div className="dashboardTableWrap">
            <table className="dashboardTable">
              <thead>
                <tr>
                  {recentPayments.columns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentPayments.rows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.receipt}</td>
                    <td>{row.student}</td>
                    <td>{row.amount}</td>
                    <td>{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </div>
  );
};

export default DashboardPage;
