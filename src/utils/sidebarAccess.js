import { USER_ROLES } from '../constants/userRoles';

const ALL_ROLES = Object.values(USER_ROLES);

/**
 * PRD Part P — role visibility for sidebar items.
 * Items without roles are visible to all authenticated users.
 */
export const canAccessSidebarItem = (item, userRole) => {
  if (!item?.roles || item.roles.length === 0) return true;
  const role = userRole ? String(userRole).toUpperCase() : null;
  if (!role) return false;
  return item.roles.includes(role);
};

export const filterSidebarSections = (sections, userRole) =>
  sections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => canAccessSidebarItem(item, userRole)),
    }))
    .filter((section) => section.items.length > 0);

export { ALL_ROLES, USER_ROLES };
