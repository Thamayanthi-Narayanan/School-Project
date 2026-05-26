import { buildRoleLoadingOptions } from './masterDataOptions';

export { buildRoleLoadingOptions };

/**
 * Create-user role dropdown: placeholder + all roles from GET /api/v1/master-data (data.role).
 */
export const buildCreateRoleSelectOptions = (apiRoleOptions, placeholder = 'Select role') => {
  const roles = Array.isArray(apiRoleOptions) ? apiRoleOptions : [];

  return [
    { label: placeholder, value: placeholder },
    ...roles,
  ];
};

/**
 * Edit-user role dropdown: all API roles; keeps current role visible if missing from API list.
 */
export const buildEditRoleSelectOptions = (apiRoleOptions, currentRole) => {
  const roles = Array.isArray(apiRoleOptions) ? [...apiRoleOptions] : [];

  if (currentRole && !roles.some((option) => option.value === currentRole)) {
    roles.unshift({ label: currentRole, value: currentRole });
  }

  return roles;
};
