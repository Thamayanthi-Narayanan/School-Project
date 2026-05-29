import '../css/dashboardPage.css';
import { dashboardPageMock } from '../../../data/mocks/dashboard/dashboardPage.mock';
import { DashboardIcons, renderNavIcon } from '../../../components/common/js/dashboardIcons';
import StatusPill from '../../../components/common/js/statusPill';
import { useNavigate } from 'react-router-dom';
import { routePaths } from '../../../constants/routePaths';
import { CrmButton } from '../../../components/reusable/js/index';

const Sparkline = ({ tone = 'green' }) => (
  <div className={`dashboardSparkline dashboardSparkline${tone.charAt(0).toUpperCase() + tone.slice(1)}`} aria-hidden="true">
    <span /><span /><span /><span /><span />
  </div>
);

const MetricCard = ({ metric }) => (
  <article className={`dashboardMetricCard dashboardMetricCardHover dashboardMetricIcon${metric.iconTone.charAt(0).toUpperCase() + metric.iconTone.slice(1)}`}>
    <div className="dashboardMetricTop">
      <span className={`dashboardMetricIconWrap dashboardMetricIconWrap${metric.iconTone.charAt(0).toUpperCase() + metric.iconTone.slice(1)}`}>
        {renderNavIcon(metric.icon, 20)}
      </span>
      <span className={`dashboardMetricTrend ${metric.trendUp ? 'dashboardMetricTrendUp' : 'dashboardMetricTrendDown'}`}>
        {metric.trendUp ? DashboardIcons.trendUp(14) : DashboardIcons.trendDown(14)}
        {metric.trend}
      </span>
    </div>
    <p className="dashboardMetricLabel">{metric.label}</p>
    <p className="dashboardMetricValue">{metric.value}</p>
    <div className="dashboardMetricFooter">
      <span className="dashboardMetricSub">{metric.subtext}</span>
      <Sparkline tone={metric.trendUp ? 'green' : 'red'} />
    </div>
  </article>
);

const DashboardPage = () => {
  const {
    welcome,
    sections,
    metrics,
    summaryStats,
    recentPayments,
    activityFeed,
    recentAdmissions,
    scholarshipApprovals,
    workspace,
  } = dashboardPageMock;

  const navigate = useNavigate();

  const handleWorkspaceAction = (action) => {
    if (action === 'userCreation') {
      navigate(routePaths.userCreation);
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
          <div className="dashboardWelcomeMeta">
            <span className="dashboardLiveBadge">{welcome.liveLabel}</span>
            <span className="dashboardWelcomeSync">{welcome.syncText}</span>
          </div>
        </div>
        <div className="dashboardWelcomeActions">
          <CrmButton
            variant="outline"
            type="button"
            className="dashboardWelcomeActionBtn"
            onClick={() => navigate(routePaths.admission)}
          >
            {DashboardIcons.plus(16)}
            {welcome.actions.newAdmissionLabel}
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
        {metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </section>

      <section className="dashboardSummaryStrip dashboardSectionAnimate dashboardSectionDelay2">
        {summaryStats.map((stat, index) => (
          <div key={stat.id} className="dashboardSummaryItem">
            {index > 0 && <span className="dashboardSummaryDivider" aria-hidden="true" />}
            <div className="dashboardSummaryContent">
              <div className="dashboardSummaryLabelRow">
                {renderNavIcon(stat.icon, 16)}
                <span className="dashboardSummaryLabel">{stat.label}</span>
              </div>
              <p className="dashboardSummaryValue">{stat.value}</p>
              {stat.subtext && <p className="dashboardSummarySub">{stat.subtext}</p>}
            </div>
          </div>
        ))}
      </section>

      <section className="dashboardPaymentsRow dashboardSectionAnimate dashboardSectionDelay3">
        <article className="dashboardCard dashboardCardAnimate">
          <header className="dashboardCardHeader">
            <div>
              <h2 className="dashboardCardTitle">{sections.recentPayments.title}</h2>
              <p className="dashboardCardSub">{sections.recentPayments.subtitle}</p>
            </div>
            <a href="#payments" className="dashboardCardLink">
              {sections.recentPayments.viewAllLabel} {DashboardIcons.arrowRight(14)}
            </a>
          </header>
          <div className="dashboardTableWrap">
            <table className="dashboardTable">
              <thead>
                <tr>
                  {sections.recentPayments.columns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentPayments.map((row) => (
                  <tr key={row.id}>
                    <td className="dashboardTableMono">{row.receipt}</td>
                    <td>
                      <div className="dashboardStudentCell">
                        <span className="dashboardAvatar">{row.initials}</span>
                        <div>
                          <span className="dashboardStudentName">{row.student}</span>
                          <span className="dashboardStudentClass">{row.className}</span>
                        </div>
                      </div>
                    </td>
                    <td className="dashboardTableStrong">{row.amount}</td>
                    <td>{row.method}</td>
                    <td>
                      <StatusPill status={row.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="dashboardCard dashboardCardAnimate">
          <header className="dashboardCardHeader">
            <div className="dashboardCardTitleRow">
              <h2 className="dashboardCardTitle">{sections.activityFeed.title}</h2>
              <span className="dashboardFeedBadge">{sections.activityFeed.badgeLabel}</span>
            </div>
          </header>
          <ul className="dashboardActivityList">
            {activityFeed.map((item) => (
              <li key={item.id} className="dashboardActivityItem">
                <span className="dashboardActivityDot" />
                <div className="dashboardActivityBody">
                  <p className="dashboardActivityTitle">{item.title}</p>
                  <p className="dashboardActivityDesc">{item.description}</p>
                </div>
                <span className="dashboardActivityTime">{item.time}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="dashboardTwoCol dashboardSectionAnimate dashboardSectionDelay4">
        <article className="dashboardCard dashboardCardAnimate">
          <header className="dashboardCardHeader">
            <div>
              <h2 className="dashboardCardTitle">{sections.recentAdmissions.title}</h2>
              <p className="dashboardCardSub">{sections.recentAdmissions.subtitle}</p>
            </div>
            <a href="#admissions" className="dashboardCardLink">
              {sections.recentAdmissions.manageLabel} {DashboardIcons.arrowRight(14)}
            </a>
          </header>
          <div className="dashboardTableWrap">
            <table className="dashboardTable">
              <thead>
                <tr>
                  {sections.recentAdmissions.columns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentAdmissions.map((row) => (
                  <tr key={row.id}>
                    <td className="dashboardTableMono">{row.application}</td>
                    <td className="dashboardTableStrong">{row.name}</td>
                    <td>{row.className}</td>
                    <td>
                      <StatusPill status={row.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="dashboardCard dashboardCardAnimate">
          <header className="dashboardCardHeader">
            <div>
              <h2 className="dashboardCardTitle">{sections.scholarshipApprovals.title}</h2>
              <p className="dashboardCardSub">{sections.scholarshipApprovals.subtitle}</p>
            </div>
            <a href="#scholarships" className="dashboardCardLink">
              {sections.scholarshipApprovals.reviewLabel} {DashboardIcons.arrowRight(14)}
            </a>
          </header>
          <div className="dashboardTableWrap">
            <table className="dashboardTable">
              <thead>
                <tr>
                  {sections.scholarshipApprovals.columns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {scholarshipApprovals.map((row) => (
                  <tr key={row.id}>
                    <td className="dashboardTableStrong">{row.student}</td>
                    <td>{row.scheme}</td>
                    <td>{row.amount}</td>
                    <td>
                      <StatusPill status={row.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>

      <section className="dashboardWorkspaceSection dashboardSectionAnimate dashboardSectionDelay5">
        <header className="dashboardWorkspaceHeader">
          <p className="dashboardWorkspaceEyebrow">{workspace.sectionLabel}</p>
          <h2 className="dashboardWorkspaceTitle">{workspace.title}</h2>
          <p className="dashboardWorkspaceSub">{workspace.subtitle}</p>
        </header>
        <div className="dashboardWorkspaceGrid">
          {workspace.actions.map((action) => (
            <button
              key={action.id}
              type="button"
              className="dashboardWorkspaceCard dashboardQuickCardAnimate"
              onClick={() => handleWorkspaceAction(action.action)}
            >
              <span className="dashboardWorkspaceCardArrow">{DashboardIcons.arrowUpRight(16)}</span>
              <span className="dashboardWorkspaceCardIcon">{renderNavIcon(action.icon, 22)}</span>
              <span className="dashboardWorkspaceCardLabel">{action.label}</span>
              <span className="dashboardWorkspaceCardSub">{action.subtext}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
