export const NOTIFICATION_STATUS = {
  UNREAD: 'UNREAD',
  READ: 'READ',
};

export const SCHOLARSHIP_NOTIFICATION_TYPES = new Set([
  'SCHOLARSHIP_SUBMITTED',
  'SCHOLARSHIP_APPROVED',
  'SCHOLARSHIP_REJECTED',
]);

export const parseNotificationPayload = (payloadJson) => {
  if (!payloadJson || typeof payloadJson !== 'string') return null;

  try {
    return JSON.parse(payloadJson);
  } catch {
    return null;
  }
};

export const mapApiNotificationToItem = (notification) => {
  const payload = parseNotificationPayload(notification?.payloadJson);

  return {
    id: notification?.notificationId ?? notification?.id,
    notificationId: notification?.notificationId ?? notification?.id,
    notificationType: notification?.notificationType ?? '',
    title: notification?.title ?? '',
    description: notification?.body ?? '',
    body: notification?.body ?? '',
    status: notification?.status ?? NOTIFICATION_STATUS.READ,
    referenceType: notification?.referenceType ?? '',
    referenceId: notification?.referenceId ?? null,
    payload,
    readAt: notification?.readAt ?? null,
    createdAt: notification?.createdAt ?? null,
    timeLabel: formatNotificationTime(notification?.createdAt),
  };
};

export const isScholarshipNotification = (notification) => {
  if (!notification) return false;

  const type = notification.notificationType ?? '';
  const referenceType = notification.referenceType ?? '';

  return (
    SCHOLARSHIP_NOTIFICATION_TYPES.has(type)
    || referenceType === 'SCHOLARSHIP_APPLICATION'
    || type.startsWith('SCHOLARSHIP_')
  );
};

export const getScholarshipApplicationId = (notification) => {
  if (!notification) return null;

  const fromPayload =
    notification.payload?.applicationId
    ?? parseNotificationPayload(notification.payloadJson)?.applicationId;

  if (fromPayload != null) return Number(fromPayload);

  if (notification.referenceType === 'SCHOLARSHIP_APPLICATION' && notification.referenceId != null) {
    return Number(notification.referenceId);
  }

  return null;
};

export const formatNotificationTime = (isoDate) => {
  if (!isoDate) return '';

  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return '';

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
};
