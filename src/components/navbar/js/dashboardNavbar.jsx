import '../css/dashboardNavbar.css';
import { navbarMock } from '../../../data/mocks/navbar/navbar.mock';
import { DashboardIcons } from '../../common/js/dashboardIcons';

const DashboardNavbar = ({ pageTitle }) => {
  const {
    schoolName,
    pageTitle: defaultPageTitle,
    searchPlaceholder,
    searchShortcut,
    quickAddLabel,
    user,
  } = navbarMock;

  const currentPageTitle = pageTitle || defaultPageTitle;

  return (
    <header className="dashboardNavbar">
      <div className="dashboardNavbarBreadcrumb">
        <span className="dashboardNavbarSchool">{schoolName}</span>
        <span className="dashboardNavbarSep">/</span>
        <span className="dashboardNavbarPage">{currentPageTitle}</span>
      </div>

      <div className="dashboardNavbarSearch">
        <span className="dashboardNavbarSearchIcon">{DashboardIcons.search(18)}</span>
        <input
          type="search"
          className="dashboardNavbarSearchInput"
          placeholder={searchPlaceholder}
          aria-label="Search"
        />
        <kbd className="dashboardNavbarSearchKbd">{searchShortcut}</kbd>
      </div>

      <div className="dashboardNavbarActions">
        <button type="button" className="dashboardNavbarIconBtn" aria-label="Help">
          {DashboardIcons.help(18)}
        </button>
        <button type="button" className="dashboardNavbarIconBtn dashboardNavbarIconBtnNotify" aria-label="Notifications">
          {DashboardIcons.bell(18)}
          <span className="dashboardNavbarNotifyDot" />
        </button>
        <button type="button" className="dashboardNavbarQuickAdd">
          {DashboardIcons.plus(16)}
          {quickAddLabel}
        </button>
        <div className="dashboardNavbarProfileWrap">
          <span className="dashboardNavbarAvatar">{user.initials}</span>
          <div className="dashboardNavbarProfileText">
            <span className="dashboardNavbarProfileName">{user.name}</span>
            <span className="dashboardNavbarProfileRole">{user.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
