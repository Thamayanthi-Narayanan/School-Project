import { useLocation } from 'react-router-dom';
import '../css/dashboardNavbar.css';
import { navbarMock } from '../../../data/mocks/navbar/navbar.mock';
import { pageTitles } from '../../../constants/pageTitles';
import { DashboardIcons } from '../../common/js/dashboardIcons';
import NotificationBellIcon from '../../common/js/notificationBellIcon';

const DashboardNavbar = ({ onMenuClick }) => {
  const { pathname } = useLocation();
  const {
    schoolName,
    pageTitle: defaultPageTitle,
    searchPlaceholder,
    searchShortcut,
    quickAddLabel,
    user,
  } = navbarMock;

  const currentPageTitle = pageTitles[pathname] || defaultPageTitle;

  return (
    <header className="dashboardNavbar">
      <button
        type="button"
        className="dashboardNavbarMenuBtn"
        aria-label="Open menu"
        onClick={onMenuClick}
      >
        {DashboardIcons.menu(20)}
      </button>
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
        <button type="button" className="dashboardNavbarIconBtnNotify" aria-label="Notifications">
          <NotificationBellIcon size="sm" />
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
