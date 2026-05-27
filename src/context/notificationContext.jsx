import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getUnreadNotificationCount } from '../apis/notificationsApi';
import { parseApiError } from '../utils/apiError';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoadingCount, setIsLoadingCount] = useState(false);

  const refetchUnreadCount = useCallback(async () => {
    setIsLoadingCount(true);

    try {
      const response = await getUnreadNotificationCount();

      if (response?.success && response?.data) {
        setUnreadCount(response.data.count ?? 0);
        return response.data.count ?? 0;
      }

      setUnreadCount(0);
      return 0;
    } catch (error) {
      parseApiError(error);
      setUnreadCount(0);
      return 0;
    } finally {
      setIsLoadingCount(false);
    }
  }, []);

  useEffect(() => {
    refetchUnreadCount();
  }, [refetchUnreadCount]);

  const value = useMemo(
    () => ({
      unreadCount,
      isLoadingCount,
      refetchUnreadCount,
    }),
    [unreadCount, isLoadingCount, refetchUnreadCount],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error('useNotificationContext must be used within NotificationProvider');
  }

  return context;
};
