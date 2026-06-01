import { Outlet } from 'react-router-dom';
import '../css/dashboardLayout.css';
import Sidebar from '../../../components/sidebar/js/sidebar';
import DashboardNavbar from '../../../components/navbar/js/dashboardNavbar';
import LogoutPopup from '../../../components/reusable/js/logoutPopup';
import SchoolSetupBlocker from '../../../components/common/js/schoolSetupBlocker';
import { sidebarMock } from '../../../data/mocks/sidebar/sidebar.mock';
import { logoutPopupMock } from '../../../data/mocks/auth/logout.mock';
import useSidebarDrawer from '../hooks/useSidebarDrawer';
import useLogoutFlow from '../hooks/useLogoutFlow';
import { MasterDataProvider } from '../../../context/masterDataContext';
import { NotificationProvider } from '../../../context/notificationContext';

const DashboardLayout = () => {
  const { isOpen, toggle, close } = useSidebarDrawer();
  const { logoutPopupVisible, handleLogout } = useLogoutFlow(sidebarMock.footer.logoutPath);

  return (
    <MasterDataProvider>
    <NotificationProvider>
    <div className={`dashboardLayout${isOpen ? ' dashboardLayoutSidebarOpen' : ''}`}>
      <button
        type="button"
        className="dashboardSidebarBackdrop"
        aria-label="Close menu"
        onClick={close}
      />
      <Sidebar isOpen={isOpen} onNavigate={close} onLogout={handleLogout} />
      <div className="dashboardMain">
        <DashboardNavbar onMenuClick={toggle} onLogout={handleLogout} />
        <main className="dashboardMainScroll">
          <Outlet />
        </main>
      </div>
      <LogoutPopup
        visible={logoutPopupVisible}
        title={logoutPopupMock.title}
        message={logoutPopupMock.message}
      />
      <SchoolSetupBlocker />
    </div>
    </NotificationProvider>
    </MasterDataProvider>
  );
};

export default DashboardLayout;
