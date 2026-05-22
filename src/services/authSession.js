import {
  AUTH_TOKEN_KEY,
  AUTH_USER_KEY,
  AUTH_EXPIRES_IN_KEY,
  REMEMBER_LOGIN_KEY,
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
