import { useCallback, useEffect, useState } from 'react';
import { AUTH_EXPIRES_IN_KEY } from '../constants/authStorage';
import { getAuthToken } from '../services/authSession';

const SESSION_WARNING_MS = 5 * 60 * 1000;

const readSessionExpiryMs = () => {
  const raw = localStorage.getItem(AUTH_EXPIRES_IN_KEY);
  const expiresInSeconds = raw ? Number(raw) : null;
  if (!expiresInSeconds || Number.isNaN(expiresInSeconds)) return null;
  return Date.now() + expiresInSeconds * 1000;
};

export const useSessionExpiry = ({ onExtend }) => {
  const [visible, setVisible] = useState(false);
  const [expiryMs, setExpiryMs] = useState(() => readSessionExpiryMs());

  useEffect(() => {
    if (!getAuthToken()) return undefined;

    const interval = window.setInterval(() => {
      const nextExpiry = readSessionExpiryMs();
      setExpiryMs(nextExpiry);

      if (!nextExpiry) {
        setVisible(false);
        return;
      }

      const remaining = nextExpiry - Date.now();
      setVisible(remaining > 0 && remaining <= SESSION_WARNING_MS);
    }, 10000);

    return () => window.clearInterval(interval);
  }, []);

  const extendSession = useCallback(async () => {
    if (onExtend) {
      await onExtend();
    }
    setExpiryMs(readSessionExpiryMs());
    setVisible(false);
  }, [onExtend]);

  return {
    visible,
    expiryMs,
    extendSession,
  };
};

export default useSessionExpiry;
