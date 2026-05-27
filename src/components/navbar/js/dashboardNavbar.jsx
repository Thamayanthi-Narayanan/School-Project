import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { routePaths } from '../../../constants/routePaths';
import '../css/dashboardNavbar.css';
import { navbarMock } from '../../../data/mocks/navbar/navbar.mock';
import { pageTitles } from '../../../constants/pageTitles';
import { DashboardIcons } from '../../common/js/dashboardIcons';
import NotificationBellIcon from '../../common/js/notificationBellIcon';
const DashboardNavbar = ({ onMenuClick, onLogout }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const {
    schoolName,
    pageTitle: defaultPageTitle,
    searchPlaceholder,
    searchShortcut,
    quickAddLabel,
    user,
    profileMenu,
  } = navbarMock;

  const currentPageTitle = pageTitles[pathname] || defaultPageTitle;
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    setProfileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!profileOpen) return undefined;

    const handlePointerDown = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [profileOpen]);

  const toggleProfileMenu = () => {
    setProfileOpen((open) => !open);
  };

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
        <button
          type="button"
          className="dashboardNavbarQuickAdd"
          onClick={() => navigate(routePaths.admission)}
        >
          {DashboardIcons.plus(16)}
          {quickAddLabel}
        </button>

        <div className="dashboardNavbarProfile" ref={profileRef}>
          <button
            type="button"
            className={`dashboardNavbarProfileWrap${profileOpen ? ' dashboardNavbarProfileWrapOpen' : ''}`}
            onClick={toggleProfileMenu}
            aria-expanded={profileOpen}
            aria-haspopup="menu"
            aria-controls="dashboardNavbarProfileMenu"
          >
            <span className="dashboardNavbarAvatar">{user.initials}</span>
            <div className="dashboardNavbarProfileText">
              <span className="dashboardNavbarProfileName">{user.name}</span>
              <span className="dashboardNavbarProfileRole">{user.role}</span>
            </div>
          </button>

          {profileOpen && (
            <div
              id="dashboardNavbarProfileMenu"
              className="dashboardNavbarProfileMenu"
              role="menu"
              aria-label="User account menu"
            >
              <div className="dashboardNavbarProfileMenuHeader">
                <p className="dashboardNavbarProfileMenuName">{user.fullName}</p>
                <p className="dashboardNavbarProfileMenuEmail">{user.email}</p>
              </div>

              <div className="dashboardNavbarProfileMenuDivider" role="separator" />

              <p className="dashboardNavbarProfileMenuSectionLabel">{profileMenu.sectionLabel}</p>

              <ul className="dashboardNavbarProfileMenuList">
                {profileMenu.items.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={item.path}
                      className="dashboardNavbarProfileMenuItem"
                      role="menuitem"
                      onClick={() => setProfileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="dashboardNavbarProfileMenuDivider" role="separator" />

              <Link
                to={profileMenu.signOutPath}
                className="dashboardNavbarProfileMenuSignOut"
                role="menuitem"
                onClick={async (event) => {
                  event.preventDefault();
                  setProfileOpen(false);
                  if (onLogout) {
                    await onLogout();
                  }
                }}
              >
                {profileMenu.signOutLabel}
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
