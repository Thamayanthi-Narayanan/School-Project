import { Navigate } from 'react-router-dom';
import { routePaths } from '../constants/routePaths';
import LoginPage from '../pages/login/js/loginPage';
import DashboardLayout from '../layouts/dashboardLayout/js/dashboardLayout';
import DashboardPage from '../pages/dashboard/js/dashboardPage';
import StudentsPage from '../pages/students/js/studentsPage';
import StaffPage from '../pages/staff/js/staffPage';
import AdmissionPage from '../pages/admission/js/admissionPage';
import AttendancePage from '../pages/attendance/js/attendancePage';

/**
 * Route config reference. Actual routing is in AppRouter.jsx
 * (nested routes require <Route> children, not a flat map).
 */
export const appRoutes = [
  { path: routePaths.root, element: <Navigate to={routePaths.login} replace /> },
  { path: routePaths.login, element: <LoginPage /> },
  {
    element: <DashboardLayout />,
    children: [
      { path: routePaths.dashboard, element: <DashboardPage /> },
      { path: routePaths.students, element: <StudentsPage /> },
      { path: routePaths.staff, element: <StaffPage /> },
      { path: routePaths.admission, element: <AdmissionPage /> },
      { path: routePaths.attendance, element: <AttendancePage /> },
    ],
  },
];
