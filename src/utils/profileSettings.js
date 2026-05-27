import { mapApiUserToLocal } from './createUser';

const formatRoleLabel = (role) => {
  if (!role) return '';
  const normalized = String(role).trim();
  if (!normalized) return '';
  return normalized.charAt(0) + normalized.slice(1).toLowerCase();
};

export const formatPhoneForDisplay = (phone) => {
  const digits = String(phone || '').replace(/\D/g, '');
  if (!digits) return '';

  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  }

  return String(phone).trim();
};

export const mapApiProfileToForm = (apiUser) => {
  const mapped = mapApiUserToLocal(apiUser);

  return {
    fullName: mapped.userName || '',
    username: mapped.username || '',
    role: formatRoleLabel(mapped.userRole),
    email: mapped.userEmail || '',
    phone: formatPhoneForDisplay(mapped.userPhone),
    status: mapped.status || '',
  };
};
