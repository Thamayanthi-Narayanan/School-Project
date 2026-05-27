import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../components/reusable/css/crmReusable.css';
import '../../../components/common/css/notificationListItem.css';
import '../css/notificationsPage.css';
import { notificationsPageMock } from '../../../data/mocks/notifications/notificationsPage.mock';
import { routePaths } from '../../../constants/routePaths';
import { PageHeader, CrmButton } from '../../../components/reusable/js/index';
import NotificationListItem from '../../../components/common/js/notificationListItem';
import { useNotificationContext } from '../../../context/notificationContext';
import {
  getScholarshipApplicationId,
  isScholarshipNotification,
} from '../../../utils/notificationUtils';
import { useNotificationsList } from '../hooks/useNotificationsList';

const NotificationsPage = () => {
  const navigate = useNavigate();
  const { title, subtitle, filters, pagination, list } = notificationsPageMock;
  const { refetchUnreadCount } = useNotificationContext();

  useEffect(() => {
    refetchUnreadCount();
  }, [refetchUnreadCount]);

  const {
    items,
    isLoading,
    loadError,
    markingId,
    statusFilter,
    setFilter,
    refetch,
    goToPrevious,
    goToNext,
    isPreviousDisabled,
    isNextDisabled,
    showingText,
    markAsRead,
  } = useNotificationsList(list);

  const handleNotificationClick = useCallback(async (item) => {
    if (markingId === item.notificationId) return;

    if (item.status === 'UNREAD') {
      await markAsRead(item.notificationId);
      refetchUnreadCount();
    }

    if (isScholarshipNotification(item)) {
      const applicationId = getScholarshipApplicationId(item);

      navigate(routePaths.scholarshipRequests, {
        state: {
          fromNotification: item,
          highlightedApplicationId: applicationId,
        },
      });
    }
  }, [markAsRead, markingId, navigate, refetchUnreadCount]);

  const filterOptions = [
    { id: '', label: filters.allLabel, ariaLabel: filters.allAriaLabel },
    { id: 'UNREAD', label: filters.unreadLabel, ariaLabel: filters.unreadAriaLabel },
    { id: 'READ', label: filters.readLabel, ariaLabel: filters.readAriaLabel },
  ];

  return (
    <div className="crmListPage notificationsPage">
      <PageHeader title={title} subtitle={subtitle} className="notificationsPageHeader" />

      <div className="notificationsFilterRow" role="tablist" aria-label="Notification filters">
        {filterOptions.map((option) => (
          <button
            key={option.id || 'all'}
            type="button"
            role="tab"
            aria-selected={statusFilter === option.id}
            aria-label={option.ariaLabel}
            className={`notificationsFilterBtn${statusFilter === option.id ? ' notificationsFilterBtnActive' : ''}`}
            onClick={() => setFilter(option.id)}
            disabled={isLoading}
          >
            {option.label}
          </button>
        ))}
      </div>

      {loadError ? (
        <div className="notificationsListAlert">
          <p className="notificationsListAlertText" role="alert">
            {loadError}
          </p>
          <CrmButton variant="secondary" type="button" onClick={refetch}>
            {list.retryLabel}
          </CrmButton>
        </div>
      ) : null}

      <section className="notificationsCard crmSectionAnimate" aria-busy={isLoading}>
        {isLoading && !loadError ? (
          <p className="notificationsListState">{list.loadingMessage}</p>
        ) : null}

        {!isLoading && !loadError && items.length === 0 ? (
          <p className="notificationsListState">{list.emptyMessage}</p>
        ) : null}

        {!isLoading && !loadError && items.length > 0 ? (
          <div className="notificationsList" role="list">
            {items.map((item, index) => (
              <NotificationListItem
                key={item.notificationId}
                item={item}
                isLast={index === items.length - 1}
                onClick={() => handleNotificationClick(item)}
                disabled={markingId === item.notificationId}
              />
            ))}
          </div>
        ) : null}

        {!isLoading && !loadError && items.length > 0 ? (
          <footer className="notificationsListFooter">
            <p className="notificationsListCount">{showingText}</p>
            <div className="notificationsPagination">
              <CrmButton
                variant="pagination"
                disabled={isPreviousDisabled}
                onClick={goToPrevious}
              >
                {pagination.previousLabel}
              </CrmButton>
              <CrmButton variant="pagination" disabled={isNextDisabled} onClick={goToNext}>
                {pagination.nextLabel}
              </CrmButton>
            </div>
          </footer>
        ) : null}
      </section>
    </div>
  );
};

export default NotificationsPage;
