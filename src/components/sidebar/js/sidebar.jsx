import { Link, useLocation } from 'react-router-dom';
import '../css/sidebar.css';
import { sidebarMock } from '../../../data/mocks/sidebar/sidebar.mock';
import { renderNavIcon, DashboardIcons } from '../../common/js/dashboardIcons';
import NotificationBellIcon from '../../common/js/notificationBellIcon';

const Sidebar = () => {
  const { pathname } = useLocation();
  const { brand, sections, footer } = sidebarMock;

  const isActive = (path) => pathname === path;

  return (
    <aside className="sidebar">
      <div className="sidebarBrand">
        <span className="sidebarBrandIcon">{DashboardIcons.graduationCap(20)}</span>
        <div className="sidebarBrandText">
          <span className="sidebarBrandName">{brand.name}</span>
          <span className="sidebarBrandTagline">{brand.tagline}</span>
        </div>
      </div>

      <div className="sidebarNavScroll">
        <nav className="sidebarNav">
          {sections.map((section) => (
            <div key={section.id} className="sidebarSection">
              <p className="sidebarSectionLabel">{section.label}</p>
              <ul className="sidebarMenu">
                {section.items.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={item.path}
                      className={`sidebarLink${isActive(item.path) ? ' sidebarLinkActive' : ''}`}
                    >
                      <span className="sidebarLinkIcon">
                        {item.id === 'notifications' ? (
                          <NotificationBellIcon size="sm" variant="plain" />
                        ) : (
                          renderNavIcon(item.icon)
                        )}
                      </span>
                      <span className="sidebarLinkLabel">{item.label}</span>
                      {item.badge && <span className="sidebarBadge">{item.badge}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="sidebarFooter">
        <Link to={footer.logoutPath} className="sidebarLink sidebarLogout">
          <span className="sidebarLinkIcon">{renderNavIcon('logOut')}</span>
          <span className="sidebarLinkLabel">{footer.logoutLabel}</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
