import { logout as logoutApi } from '../apis/authApi';
import { clearAuthSession, getAuthToken } from './authSession';

/**
 * Calls POST /auth/logout when a token exists, then clears local session.
 * Local session is always cleared even if the API returns 401.
 */
export const performLogout = async () => {
  try {
    if (getAuthToken()) {
      await logoutApi();
    }
  } catch {
    // Expired or missing Redis session — still sign out locally
  } finally {
    clearAuthSession();
  }
};
