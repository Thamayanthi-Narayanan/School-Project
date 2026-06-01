import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { routePaths } from '../../../constants/routePaths';
import '../css/dashboardNavbar.css';
import { navbarMock } from '../../../data/mocks/navbar/navbar.mock';
import { resolvePageTitle } from '../../../constants/pageTitles';
import { DashboardIcons } from '../../common/js/dashboardIcons';
import NotificationBellIcon from '../../common/js/notificationBellIcon';
import NotificationPanel from './notificationPanel';
import SessionExpiryBanner from './sessionExpiryBanner';
import { useNotificationContext } from '../../../context/notificationContext';
import useSessionExpiry from '../../../hooks/useSessionExpiry';
import useAuthRole from '../../../hooks/useAuthRole';
import { getAuthUser } from '../../../services/authSession';
import { getRoleLabel } from '../../../constants/userRoles';

const DashboardNavbar = ({ onMenuClick, onLogout }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const {
    schoolName,
    searchPlaceholder,
    searchShortcut,
    quickAddLabel,
    profileMenu,
  } = navbarMock;

  const authUser = getAuthUser();
  const { roleLabel } = useAuthRole();
  const user = authUser
    ? {
        name: authUser.name || authUser.fullName || navbarMock.user.name,
        fullName: authUser.fullName || authUser.name || navbarMock.user.fullName,
        email: authUser.email || navbarMock.user.email,
        role: roleLabel || authUser.role || navbarMock.user.role,
        initials: (authUser.name || authUser.fullName || 'U')
          .split(' ')
          .map((part) => part[0])
          .join('')
          .slice(0, 2)
          .toUpperCase(),
      }
    : navbarMock.user;

  const currentPageTitle = resolvePageTitle(pathname);
  const { unreadCount } = useNotificationContext();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const profileRef = useRef(null);
  const { visible: sessionExpiryVisible, extendSession } = useSessionExpiry({
    onExtend: async () => {
      // Token refresh endpoint wiring when available
    },
  });

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
    <>
      <SessionExpiryBanner visible={sessionExpiryVisible} onExtend={extendSession} />
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
        <button
          type="button"
          className="dashboardNavbarIconBtnNotify"
          aria-label={
            unreadCount > 0
              ? `Notifications, ${unreadCount} unread`
              : 'Notifications'
          }
          onClick={() => setNotificationPanelOpen(true)}
        >
          <NotificationBellIcon size="sm" />
          {unreadCount > 0 ? (
            <span className="dashboardNavbarNotifyBadge" aria-hidden="true">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          ) : null}
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
      <NotificationPanel
        isOpen={notificationPanelOpen}
        onClose={() => setNotificationPanelOpen(false)}
      />
    </>
  );
};

export default DashboardNavbar;
