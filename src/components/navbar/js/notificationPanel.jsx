import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/notificationPanel.css';
import { notificationPanelMock } from '../../../data/mocks/notifications/notificationPanel.mock';
import { routePaths } from '../../../constants/routePaths';
import { CrmButton } from '../../reusable/js/index';
import NotificationListItem from '../../common/js/notificationListItem';
import { useNotificationContext } from '../../../context/notificationContext';
import {
  getScholarshipApplicationId,
  isScholarshipNotification,
  isRefundNotification,
} from '../../../utils/notificationUtils';
import { notificationsPageMock } from '../../../data/mocks/notifications/notificationsPage.mock';
import { useNotificationsList } from '../../../pages/notifications/hooks/useNotificationsList';

const NotificationPanel = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { refetchUnreadCount } = useNotificationContext();
  const copy = notificationPanelMock;

  const {
    items,
    isLoading,
    loadError,
    markingId,
    refetch,
    markAsRead,
    markAllAsRead,
    isMarkingAll,
  } = useNotificationsList(notificationsPageMock.list);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleNotificationClick = useCallback(async (item) => {
    if (markingId === item.notificationId) return;

    if (item.status === 'UNREAD') {
      await markAsRead(item.notificationId);
      refetchUnreadCount();
    }

    onClose();

    if (isScholarshipNotification(item)) {
      const applicationId = getScholarshipApplicationId(item);
      navigate(routePaths.scholarshipRequests, {
        state: {
          fromNotification: item,
          highlightedApplicationId: applicationId,
        },
      });
      return;
    }

    if (isRefundNotification(item)) {
      navigate(routePaths.refunds);
    }
  }, [markAsRead, markingId, navigate, onClose, refetchUnreadCount]);

  const handleMarkAllRead = async () => {
    await markAllAsRead();
    refetchUnreadCount();
  };

  if (!isOpen) return null;

  return (
    <>
      <button
        type="button"
        className="notificationPanelBackdrop"
        aria-label={copy.closeAriaLabel}
        onClick={onClose}
      />
      <aside className="notificationPanel" aria-label={copy.title}>
        <header className="notificationPanelHeader">
          <h2 className="notificationPanelTitle">{copy.title}</h2>
          <div className="notificationPanelHeaderActions">
            <CrmButton
              variant="outline"
              type="button"
              disabled={isMarkingAll || items.length === 0}
              onClick={handleMarkAllRead}
            >
              {copy.markAllReadLabel}
            </CrmButton>
            <button
              type="button"
              className="notificationPanelCloseBtn"
              aria-label={copy.closeAriaLabel}
              onClick={onClose}
            >
              ×
            </button>
          </div>
        </header>

        <div className="notificationPanelBody crmScrollSmooth">
          {loadError && (
            <div className="notificationPanelState">
              <p role="alert">{loadError}</p>
              <CrmButton variant="outline" type="button" onClick={refetch}>
                {copy.retryLabel}
              </CrmButton>
            </div>
          )}

          {isLoading && !loadError && (
            <p className="notificationPanelState" role="status">
              Loading…
            </p>
          )}

          {!isLoading && !loadError && items.length === 0 && (
            <p className="notificationPanelState">{copy.emptyMessage}</p>
          )}

          {!isLoading && !loadError && items.length > 0 && (
            <ul className="notificationPanelList">
              {items.map((item) => (
                <li key={item.notificationId}>
                  <NotificationListItem
                    item={item}
                    isMarking={markingId === item.notificationId}
                    onClick={() => handleNotificationClick(item)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </>
  );
};

export default NotificationPanel;
