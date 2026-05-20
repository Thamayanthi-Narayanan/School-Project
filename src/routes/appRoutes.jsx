import { Navigate } from 'react-router-dom';
import { routePaths } from '../constants/routePaths';
import LoginPage from '../pages/login/js/loginPage';
import DashboardLayout from '../layouts/dashboardLayout/js/dashboardLayout';
import DashboardPage from '../pages/dashboard/js/dashboardPage';

/**
 * Route config reference. Actual routing is in AppRouter.jsx
 * (nested routes require <Route> children, not a flat map).
 */
export const appRoutes = [
  { path: routePaths.root, element: <Navigate to={routePaths.login} replace /> },
  { path: routePaths.login, element: <LoginPage /> },
  {
    path: routePaths.dashboard,
    element: <DashboardLayout />,
    children: [{ index: true, element: <DashboardPage /> }],
  },
];
