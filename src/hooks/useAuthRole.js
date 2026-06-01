import { useMemo } from 'react';
import { getAuthUser } from '../services/authSession';
import { getRoleLabel, normalizeUserRole } from '../constants/userRoles';

export const useAuthRole = () => {
  const user = getAuthUser();

  return useMemo(() => {
    const role = normalizeUserRole(user?.role ?? user?.userRole);
    return {
      user,
      role,
      roleLabel: getRoleLabel(role),
      isAuthenticated: Boolean(user),
    };
  }, [user]);
};

export default useAuthRole;
