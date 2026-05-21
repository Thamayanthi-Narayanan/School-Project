import { useState } from 'react';
import '../../../components/reusable/css/crmReusable.css';
import '../css/attendancePage.css';
import { attendancePageMock } from '../../../data/mocks/attendance/attendancePage.mock';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';
import { PageHeader, CrmButton } from '../../../components/reusable/js/index';

const AttendancePage = () => {
  const {
    title,
    subtitle,
    tabs,
    views,
    legend,
  } = attendancePageMock;

  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const view = views[activeTab];

  return (
    <div className="crmListPage attendancePage">
      <PageHeader title={title} subtitle={subtitle} />

      <div className="attendanceTabs crmSectionAnimate">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`attendanceTab${activeTab === tab.id ? ' attendanceTabActive' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <section className="attendanceCalendarCard crmSectionAnimate attendanceSectionDelay1">
        <header className="attendanceCalendarHeader">
          <h2 className="attendanceCalendarTitle">{view.periodLabel}</h2>
          <div className="attendanceCalendarNav">
            <CrmButton variant="icon" ariaLabel="Previous month">
              {DashboardIcons.chevronLeft(16)}
            </CrmButton>
            <CrmButton variant="icon" ariaLabel="Next month">
              {DashboardIcons.chevronRight(16)}
            </CrmButton>
          </div>
        </header>

        <div className="attendanceDaysGrid">
          {view.days.map((day) => (
            <div
              key={day.id}
              className={`attendanceDayCell attendanceDayCell${day.status.charAt(0).toUpperCase() + day.status.slice(1)}`}
            >
              <span className="attendanceDayMonth">{day.monthShort}</span>
              <span className="attendanceDayNum">{day.day}</span>
            </div>
          ))}
        </div>

        <footer className="attendanceLegend">
          {legend.map((item) => (
            <span key={item.id} className="attendanceLegendItem">
              <span className={`attendanceLegendDot attendanceLegendDot${item.status.charAt(0).toUpperCase() + item.status.slice(1)}`} />
              {item.label}
            </span>
          ))}
        </footer>
      </section>

      <section className="attendanceSummaryCard crmSectionAnimate attendanceSectionDelay2">
        <h2 className="attendanceSummaryTitle">{view.summary.title}</h2>
        <div className="attendanceSummaryGrid">
          {view.summary.stats.map((stat) => (
            <div key={stat.id} className="attendanceSummaryStat">
              <span className="attendanceSummaryLabel">{stat.label}</span>
              <span className="attendanceSummaryValue">{stat.value}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AttendancePage;
