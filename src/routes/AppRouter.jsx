import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { routePaths } from '../constants/routePaths';
import LoginPage from '../pages/login/js/loginPage';
import DashboardLayout from '../layouts/dashboardLayout/js/dashboardLayout';
import DashboardPage from '../pages/dashboard/js/dashboardPage';
import StudentsPage from '../pages/students/js/studentsPage';
import StaffPage from '../pages/staff/js/staffPage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routePaths.root} element={<Navigate to={routePaths.login} replace />} />
        <Route path={routePaths.login} element={<LoginPage />} />
        <Route element={<DashboardLayout />}>
          <Route path={routePaths.dashboard} element={<DashboardPage />} />
          <Route path={routePaths.students} element={<StudentsPage />} />
          <Route path={routePaths.staff} element={<StaffPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
