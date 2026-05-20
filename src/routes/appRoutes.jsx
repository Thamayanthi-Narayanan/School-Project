import { Navigate } from 'react-router-dom';
import { routePaths } from '../constants/routePaths';
import LoginPage from '../pages/login/js/loginPage';

export const appRoutes = [
  {
    path: routePaths.root,
    element: <Navigate to={routePaths.login} replace />,
  },
  {
    path: routePaths.login,
    element: <LoginPage />,
  },
];
