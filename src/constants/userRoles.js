export const USER_ROLES = {
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
  PRINCIPAL: 'PRINCIPAL',
  ACCOUNTANT: 'ACCOUNTANT',
};

export const normalizeUserRole = (role) => {
  if (!role) return null;
  const upper = String(role).trim().toUpperCase();
  return Object.values(USER_ROLES).includes(upper) ? upper : upper;
};

export const getRoleLabel = (role) => {
  const normalized = normalizeUserRole(role);
  const labels = {
    [USER_ROLES.OWNER]: 'Owner',
    [USER_ROLES.ADMIN]: 'Admin',
    [USER_ROLES.PRINCIPAL]: 'Principal',
    [USER_ROLES.ACCOUNTANT]: 'Accountant',
  };
  return labels[normalized] || role || 'User';
};
