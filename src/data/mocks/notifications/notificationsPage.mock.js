export const notificationsPageMock = {
  title: 'Notifications',
  subtitle: 'System alerts and recent activity for your account.',
  filters: {
    allLabel: 'All',
    unreadLabel: 'Unread',
    readLabel: 'Read',
    allAriaLabel: 'Show all notifications',
    unreadAriaLabel: 'Show unread notifications',
    readAriaLabel: 'Show read notifications',
  },
  pagination: {
    pageSize: 20,
    previousLabel: 'Previous',
    nextLabel: 'Next',
  },
  list: {
    loadingMessage: 'Loading notifications…',
    emptyMessage: 'No notifications found.',
    loadFailed: 'Could not load notifications. Please try again.',
    accessDenied: 'You do not have permission to view notifications.',
    authFailed: 'Please sign in again to view notifications.',
    retryLabel: 'Try again',
    showingText: 'Showing {start}–{end} of {total} notifications',
  },
};
