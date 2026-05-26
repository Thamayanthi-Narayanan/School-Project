import {
  AUTH_TOKEN_KEY,
  AUTH_USER_KEY,
  AUTH_EXPIRES_IN_KEY,
  REMEMBER_LOGIN_KEY,
  PENDING_OTP_IDENTIFIER_KEY,
  FIRST_LOGIN_PASSWORD_STEP_KEY,
  OTP_LOGIN_NOTICE_KEY,
  PENDING_RESET_IDENTIFIER_KEY,
  FORGOT_PASSWORD_NOTICE_KEY,
  PASSWORD_RESET_TOKEN_KEY,
} from '../constants/authStorage';

export const setAuthSession = ({ token, user, expiresIn }) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);

  if (user) {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  }

  if (expiresIn != null) {
    localStorage.setItem(AUTH_EXPIRES_IN_KEY, String(expiresIn));
  }
};

export const clearAuthSession = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
  localStorage.removeItem(AUTH_EXPIRES_IN_KEY);
};

export const getAuthToken = () => localStorage.getItem(AUTH_TOKEN_KEY);

export const getAuthUser = () => {
  const raw = localStorage.getItem(AUTH_USER_KEY);

  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const setRememberedLogin = (identifier) => {
  localStorage.setItem(REMEMBER_LOGIN_KEY, identifier);
};

export const getRememberedLogin = () => localStorage.getItem(REMEMBER_LOGIN_KEY);

export const clearRememberedLogin = () => {
  localStorage.removeItem(REMEMBER_LOGIN_KEY);
};

export const setPendingOtpIdentifier = (identifier) => {
  sessionStorage.setItem(PENDING_OTP_IDENTIFIER_KEY, identifier.trim());
};

export const getPendingOtpIdentifier = () =>
  sessionStorage.getItem(PENDING_OTP_IDENTIFIER_KEY);

export const clearPendingOtpIdentifier = () => {
  sessionStorage.removeItem(PENDING_OTP_IDENTIFIER_KEY);
};

export const setFirstLoginPasswordStep = () => {
  sessionStorage.setItem(FIRST_LOGIN_PASSWORD_STEP_KEY, '1');
};

export const isFirstLoginPasswordStep = () =>
  sessionStorage.getItem(FIRST_LOGIN_PASSWORD_STEP_KEY) === '1';

export const clearFirstLoginPasswordStep = () => {
  sessionStorage.removeItem(FIRST_LOGIN_PASSWORD_STEP_KEY);
};

export const setOtpLoginNotice = (message) => {
  if (message) {
    sessionStorage.setItem(OTP_LOGIN_NOTICE_KEY, message);
  }
};

export const getOtpLoginNotice = () => sessionStorage.getItem(OTP_LOGIN_NOTICE_KEY);

export const clearOtpLoginNotice = () => {
  sessionStorage.removeItem(OTP_LOGIN_NOTICE_KEY);
};

export const setPendingResetIdentifier = (identifier) => {
  sessionStorage.setItem(PENDING_RESET_IDENTIFIER_KEY, identifier.trim());
};

export const getPendingResetIdentifier = () =>
  sessionStorage.getItem(PENDING_RESET_IDENTIFIER_KEY);

export const clearPendingResetIdentifier = () => {
  sessionStorage.removeItem(PENDING_RESET_IDENTIFIER_KEY);
};

export const setForgotPasswordNotice = (message) => {
  if (message) {
    sessionStorage.setItem(FORGOT_PASSWORD_NOTICE_KEY, message);
  }
};

export const getForgotPasswordNotice = () =>
  sessionStorage.getItem(FORGOT_PASSWORD_NOTICE_KEY);

export const clearForgotPasswordNotice = () => {
  sessionStorage.removeItem(FORGOT_PASSWORD_NOTICE_KEY);
};

export const setPasswordResetToken = (token) => {
  sessionStorage.setItem(PASSWORD_RESET_TOKEN_KEY, token);
};

export const getPasswordResetToken = () =>
  sessionStorage.getItem(PASSWORD_RESET_TOKEN_KEY);

export const clearPasswordResetToken = () => {
  sessionStorage.removeItem(PASSWORD_RESET_TOKEN_KEY);
};

export const clearForgotPasswordFlow = () => {
  clearPendingResetIdentifier();
  clearForgotPasswordNotice();
  clearPasswordResetToken();
};

export const requiresOtpVerification = (responseOrData) => {
  if (!responseOrData) return false;

  if (responseOrData.otpRequired === true) return true;

  const data = responseOrData.data ?? responseOrData;

  if (data.otpRequired === true) return true;
  if (data.user?.otpVerified === false) return true;

  return false;
};
