const EMAIL_MAX_LENGTH = 255;
const PHONE_MIN_LENGTH = 10;
const PHONE_MAX_LENGTH = 20;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 255;

export const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const normalizePhoneForApi = (value) => {
  const digits = value.replace(/\D/g, '');

  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }

  return digits;
};

export const isValidPhone = (value) => {
  const phone = normalizePhoneForApi(value);
  return phone.length >= PHONE_MIN_LENGTH && phone.length <= PHONE_MAX_LENGTH;
};

export const isValidEmailOrPhone = (value) => {
  const trimmed = value.trim();

  if (!trimmed) return false;
  if (trimmed.length > EMAIL_MAX_LENGTH) return false;

  if (isValidEmail(trimmed)) return true;

  return isValidPhone(trimmed);
};

export const buildLoginPayload = (identifier, password) => {
  const trimmed = identifier.trim();

  if (isValidEmail(trimmed)) {
    return { email: trimmed, password };
  }

  return { phone: normalizePhoneForApi(trimmed), password };
};

export const validateLoginForm = (identifier, password) => {
  const errors = {};
  const trimmedIdentifier = identifier.trim();

  if (!trimmedIdentifier) {
    errors.email = 'Email or phone number is required.';
  } else if (trimmedIdentifier.length > EMAIL_MAX_LENGTH) {
    errors.email = 'Email must be at most 255 characters.';
  } else if (!isValidEmailOrPhone(trimmedIdentifier)) {
    errors.email = 'Enter a valid email address or phone number.';
  }

  if (!password) {
    errors.password = 'Password is required.';
  } else if (password.length < PASSWORD_MIN_LENGTH) {
    errors.password = `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`;
  } else if (password.length > PASSWORD_MAX_LENGTH) {
    errors.password = `Password must be at most ${PASSWORD_MAX_LENGTH} characters.`;
  }

  return errors;
};
