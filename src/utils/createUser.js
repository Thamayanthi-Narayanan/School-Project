import { normalizePhoneForApi, isValidEmail } from './loginIdentifier';

const NAME_MIN_LENGTH = 3;
const NAME_MAX_LENGTH = 50;
const UPDATE_NAME_MAX_LENGTH = 150;
const EMAIL_MAX_LENGTH = 255;
const PHONE_MIN_LENGTH = 10;
const PHONE_MAX_LENGTH = 20;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 255;

export const ROLE_SELECT_PLACEHOLDER = 'Select role';

export const USER_STATUS_OPTIONS = [];

export const buildCreateUserPayload = (form) => {
  const name = form.userName.trim();

  return {
    username: name,
    fullName: name,
    email: form.userEmail.trim().toLowerCase(),
    phone: normalizePhoneForApi(form.userPhone),
    password: form.password,
    role: form.userRole,
  };
};

export const mapApiUserToLocal = (apiUser) => ({
  id: apiUser.id,
  userName: apiUser.fullName,
  username: apiUser.username,
  userEmail: apiUser.email,
  userPhone: apiUser.phone,
  userRole: apiUser.role,
  status: apiUser.status,
});

export const mapApiUsersListToLocal = (apiUsers) =>
  (Array.isArray(apiUsers) ? apiUsers : []).map(mapApiUserToLocal);

export const validateCreateUserForm = (form, errorCopy) => {
  const errors = {};
  const name = form.userName.trim();
  const email = form.userEmail.trim();
  const phone = form.userPhone.trim();

  if (!name) {
    errors.userName = errorCopy.userNameRequired;
  } else if (name.length < NAME_MIN_LENGTH) {
    errors.userName = errorCopy.userNameMin;
  } else if (name.length > NAME_MAX_LENGTH) {
    errors.userName = errorCopy.userNameMax;
  }

  if (!email) {
    errors.userEmail = errorCopy.emailRequired;
  } else if (!isValidEmail(email)) {
    errors.userEmail = errorCopy.emailInvalid;
  } else if (email.length > EMAIL_MAX_LENGTH) {
    errors.userEmail = errorCopy.emailMax;
  }

  if (!phone) {
    errors.userPhone = errorCopy.phoneRequired;
  } else {
    const normalized = normalizePhoneForApi(phone);
    if (normalized.length < PHONE_MIN_LENGTH || normalized.length > PHONE_MAX_LENGTH) {
      errors.userPhone = errorCopy.phoneInvalid;
    }
  }

  if (!form.userRole || form.userRole === ROLE_SELECT_PLACEHOLDER) {
    errors.userRole = errorCopy.roleRequired;
  }

  if (!form.password) {
    errors.password = errorCopy.passwordRequired;
  } else if (form.password.length < PASSWORD_MIN_LENGTH) {
    errors.password = errorCopy.passwordMin;
  } else if (form.password.length > PASSWORD_MAX_LENGTH) {
    errors.password = errorCopy.passwordMax;
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = errorCopy.confirmPasswordRequired;
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = errorCopy.passwordMismatch;
  }

  return errors;
};

export const buildUpdateUserPayload = (form) => {
  const payload = {};
  const name = form.userName.trim();
  const email = form.userEmail.trim();
  const phone = form.userPhone.trim();

  if (name) payload.fullName = name;
  if (email) payload.email = email.toLowerCase();
  if (phone) payload.phone = normalizePhoneForApi(phone);
  if (form.userRole && form.userRole !== ROLE_SELECT_PLACEHOLDER) {
    payload.role = form.userRole;
  }
  if (form.userStatus) payload.status = form.userStatus;

  return payload;
};

const hasUpdateChanges = (form, original) => {
  if (!original) return true;

  return (
    form.userName.trim() !== (original.userName || '').trim()
    || form.userEmail.trim().toLowerCase() !== (original.userEmail || '').trim().toLowerCase()
    || normalizePhoneForApi(form.userPhone) !== normalizePhoneForApi(original.userPhone || '')
    || form.userRole !== original.userRole
    || form.userStatus !== original.status
  );
};

export const validateUpdateUserForm = (form, original, errorCopy) => {
  const errors = {};
  const name = form.userName.trim();
  const email = form.userEmail.trim();
  const phone = form.userPhone.trim();

  if (!name) {
    errors.userName = errorCopy.userNameRequired;
  } else if (name.length < NAME_MIN_LENGTH) {
    errors.userName = errorCopy.userNameMin;
  } else if (name.length > UPDATE_NAME_MAX_LENGTH) {
    errors.userName = errorCopy.userNameMaxUpdate;
  }

  if (!email) {
    errors.userEmail = errorCopy.emailRequired;
  } else if (!isValidEmail(email)) {
    errors.userEmail = errorCopy.emailInvalid;
  } else if (email.length > EMAIL_MAX_LENGTH) {
    errors.userEmail = errorCopy.emailMax;
  }

  if (!phone) {
    errors.userPhone = errorCopy.phoneRequired;
  } else {
    const normalized = normalizePhoneForApi(phone);
    if (normalized.length < PHONE_MIN_LENGTH || normalized.length > PHONE_MAX_LENGTH) {
      errors.userPhone = errorCopy.phoneInvalid;
    }
  }

  if (!form.userRole || form.userRole === ROLE_SELECT_PLACEHOLDER) {
    errors.userRole = errorCopy.roleRequired;
  }

  if (!form.userStatus) {
    errors.userStatus = errorCopy.statusRequired;
  } else if (!form.userStatus.trim()) {
    errors.userStatus = errorCopy.statusInvalid;
  }

  if (Object.keys(errors).length === 0 && !hasUpdateChanges(form, original)) {
    errors.general = errorCopy.noChanges;
  }

  return errors;
};
