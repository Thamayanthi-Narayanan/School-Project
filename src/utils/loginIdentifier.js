const PHONE_MIN_LENGTH = 10;
const PHONE_MAX_LENGTH = 20;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 255;

export const normalizePhoneForApi = (value) => {
  const digits = value.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2);
  return digits;
};

export const isValidPhone = (value) => {
  const phone = normalizePhoneForApi(value);
  return phone.length >= PHONE_MIN_LENGTH && phone.length <= PHONE_MAX_LENGTH;
};

/**
 * Login API expects: { phone, password } or { email, password }
 */
export const buildLoginPayload = (phone, password) => ({
  phone: normalizePhoneForApi(phone),
  password,
});

export const buildPhoneOnlyPayload = (phone) => ({
  phone: normalizePhoneForApi(phone),
});

export const validateLoginForm = (phone, password) => {
  const errors = {};
  const trimmedPhone = phone.trim();

  if (!trimmedPhone) {
    errors.email = 'Phone number is required.';
  } else if (!isValidPhone(trimmedPhone)) {
    errors.email = 'Enter a valid phone number (10 digits).';
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

export const validatePhoneField = (phone) => {
  const trimmed = phone.trim();
  if (!trimmed) return 'Phone number is required.';
  if (!isValidPhone(trimmed)) return 'Enter a valid phone number (10 digits).';
  return null;
};

export const validateOtp = (otp) => {
  if (!otp) return 'OTP is required.';
  if (!/^\d{6}$/.test(otp)) return 'OTP must be exactly 6 digits.';
  return null;
};

export const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const isValidEmailOrPhone = (value) => {
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (isValidEmail(trimmed)) return true;
  return isValidPhone(trimmed);
};

/** Forgot-password and similar flows — prefer phone when input is a phone number. */
export const buildIdentifierOnlyPayload = (identifier) => {
  const trimmed = identifier.trim();
  if (isValidEmail(trimmed)) return { email: trimmed };
  return { phone: normalizePhoneForApi(trimmed) };
};
