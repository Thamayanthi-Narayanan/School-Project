import { Outlet } from 'react-router-dom';
import '../css/dashboardLayout.css';
import Sidebar from '../../../components/sidebar/js/sidebar';
import DashboardNavbar from '../../../components/navbar/js/dashboardNavbar';
import useSidebarDrawer from '../hooks/useSidebarDrawer';
import { UserCreationPanelProvider } from '../context/userCreationPanelContext';

const DashboardLayout = () => {
  const { isOpen, toggle, close } = useSidebarDrawer();

  return (
    <UserCreationPanelProvider>
      <div className={`dashboardLayout${isOpen ? ' dashboardLayoutSidebarOpen' : ''}`}>
        <button
          type="button"
          className="dashboardSidebarBackdrop"
          aria-label="Close menu"
          onClick={close}
        />
        <Sidebar isOpen={isOpen} onNavigate={close} />
        <div className="dashboardMain">
          <DashboardNavbar onMenuClick={toggle} />
          <main className="dashboardMainScroll">
            <Outlet />
          </main>
        </div>
      </div>
    </UserCreationPanelProvider>
  );
};

export default DashboardLayout;
