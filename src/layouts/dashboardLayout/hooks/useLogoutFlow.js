import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { performLogout } from '../../../services/authLogout';

const MIN_POPUP_MS = 1200;

const useLogoutFlow = (logoutPath = '/login') => {
  const navigate = useNavigate();
  const [logoutPopupVisible, setLogoutPopupVisible] = useState(false);
  const runningRef = useRef(false);

  const handleLogout = useCallback(
    async ({ onNavigate } = {}) => {
      if (runningRef.current) return;
      runningRef.current = true;
      setLogoutPopupVisible(true);

      const startedAt = Date.now();
      try {
        await performLogout();
      } catch {
        // Session is cleared locally even when the API call fails.
      }

      const remaining = MIN_POPUP_MS - (Date.now() - startedAt);
      if (remaining > 0) {
        await new Promise((resolve) => {
          setTimeout(resolve, remaining);
        });
      }

      setLogoutPopupVisible(false);
      onNavigate?.();
      navigate(logoutPath);
      runningRef.current = false;
    },
    [logoutPath, navigate]
  );

  return { logoutPopupVisible, handleLogout };
};

export default useLogoutFlow;
