import { normalizePhoneForApi, isValidEmail } from './loginIdentifier';

const NAME_MIN_LENGTH = 3;
const NAME_MAX_LENGTH = 50;
const EMAIL_MAX_LENGTH = 255;
const PHONE_MIN_LENGTH = 10;
const PHONE_MAX_LENGTH = 20;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 255;

const ROLE_SELECT_PLACEHOLDER = 'Select role';

const ASSIGNABLE_ROLES = {
  ADMIN: ['ADMIN', 'PRINCIPAL', 'CORRESPONDENT'],
  PRINCIPAL: ['CORRESPONDENT'],
};

export const getAssignableRoleOptions = (callerRole) => {
  const roles = ASSIGNABLE_ROLES[callerRole] ?? ASSIGNABLE_ROLES.PRINCIPAL;
  return [ROLE_SELECT_PLACEHOLDER, ...roles];
};

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
