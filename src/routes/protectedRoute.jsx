import { Navigate, useLocation } from 'react-router-dom';
import { routePaths } from '../constants/routePaths';
import { getAuthToken } from '../services/authSession';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = getAuthToken();

  if (!token) {
    return (
      <Navigate
        to={routePaths.login}
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
