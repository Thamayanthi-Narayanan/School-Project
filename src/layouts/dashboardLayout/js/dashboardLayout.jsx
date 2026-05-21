import { Outlet } from 'react-router-dom';
import '../css/dashboardLayout.css';
import Sidebar from '../../../components/sidebar/js/sidebar';
import DashboardNavbar from '../../../components/navbar/js/dashboardNavbar';

const DashboardLayout = () => {
  return (
    <div className="dashboardLayout">
      <Sidebar />
      <div className="dashboardMain">
        <DashboardNavbar />
        <main className="dashboardMainScroll">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
