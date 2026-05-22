import '../css/dashboardPage.css';
import { dashboardPageMock } from '../../../data/mocks/dashboard/dashboardPage.mock';
import { DashboardIcons, renderNavIcon } from '../../../components/common/js/dashboardIcons';
import StatusPill from '../../../components/common/js/statusPill';
import { useNavigate } from 'react-router-dom';
import { routePaths } from '../../../constants/routePaths';

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
    metrics,
    summaryStats,
    recentPayments,
    activityFeed,
    recentAdmissions,
    scholarshipApprovals,
    quickActions,
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
          <h1 className="dashboardWelcomeTitle">Welcome back, {welcome.userName} 👋</h1>
          <p className="dashboardWelcomeSubtitle">{welcome.subtitle}</p>
          <div className="dashboardWelcomeMeta">
            <span className="dashboardLiveBadge">{welcome.liveLabel}</span>
            <span className="dashboardWelcomeSync">{welcome.syncText}</span>
          </div>
        </div>
        <div className="dashboardWelcomeActions">
          <button type="button" className="dashboardBtnOutline">
            {DashboardIcons.plus(16)}
            New Admission
          </button>
          <button type="button" className="dashboardBtnPrimary">
            {DashboardIcons.wallet(16)}
            Collect Fee
          </button>
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
              <h2 className="dashboardCardTitle">Recent Payments</h2>
              <p className="dashboardCardSub">Live transactions from the last 7 days</p>
            </div>
            <a href="#payments" className="dashboardCardLink">
              View all {DashboardIcons.arrowRight(14)}
            </a>
          </header>
          <div className="dashboardTableWrap">
            <table className="dashboardTable">
              <thead>
                <tr>
                  <th>RECEIPT</th>
                  <th>STUDENT</th>
                  <th>AMOUNT</th>
                  <th>METHOD</th>
                  <th>STATUS</th>
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
              <h2 className="dashboardCardTitle">Activity Feed</h2>
              <span className="dashboardFeedBadge">4 new</span>
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
              <h2 className="dashboardCardTitle">Recent Admissions</h2>
              <p className="dashboardCardSub">Applications awaiting review</p>
            </div>
            <a href="#admissions" className="dashboardCardLink">
              Manage {DashboardIcons.arrowRight(14)}
            </a>
          </header>
          <div className="dashboardTableWrap">
            <table className="dashboardTable">
              <thead>
                <tr>
                  <th>APPLICATION</th>
                  <th>NAME</th>
                  <th>CLASS</th>
                  <th>STATUS</th>
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
              <h2 className="dashboardCardTitle">Pending Scholarship Approvals</h2>
              <p className="dashboardCardSub">Requires your attention</p>
            </div>
            <a href="#scholarships" className="dashboardCardLink">
              Review {DashboardIcons.arrowRight(14)}
            </a>
          </header>
          <div className="dashboardTableWrap">
            <table className="dashboardTable">
              <thead>
                <tr>
                  <th>STUDENT</th>
                  <th>SCHEME</th>
                  <th>AMOUNT</th>
                  <th>STATUS</th>
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

      <section className="dashboardQuickSection dashboardSectionAnimate dashboardSectionDelay6">
        <header className="dashboardQuickHeader">
          <div className="dashboardQuickTitleRow">
            {DashboardIcons.sparkles(18)}
            <h2 className="dashboardQuickTitle">Quick Actions</h2>
          </div>
          <p className="dashboardQuickSub">Common tasks at your fingertips</p>
        </header>
        <div className="dashboardQuickGrid">
          {quickActions.map((action) => (
            <button key={action.id} type="button" className="dashboardQuickCard dashboardQuickCardAnimate">
              <span className="dashboardQuickCardArrow">{DashboardIcons.arrowUpRight(16)}</span>
              <span className="dashboardQuickCardIcon">{renderNavIcon(action.icon, 22)}</span>
              <span className="dashboardQuickCardLabel">{action.label}</span>
              <span className="dashboardQuickCardSub">{action.subtext}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
