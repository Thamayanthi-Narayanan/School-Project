import apiClient from './apiConfig';

/**
 * NTF-001 — GET /api/v1/notifications
 */
export const listNotifications = async ({ status, page = 0, size = 20 } = {}) => {
  const params = { page, size };
  if (status) params.status = status;

  const { data } = await apiClient.get('/notifications', { params });
  return data;
};

/**
 * NTF-002 — GET /api/v1/notifications/unread-count
 */
export const getUnreadNotificationCount = async () => {
  const { data } = await apiClient.get('/notifications/unread-count');
  return data;
};

/**
 * NTF-003 — PATCH /api/v1/notifications/{notificationId}/read
 */
export const markNotificationAsRead = async (notificationId) => {
  const { data } = await apiClient.patch(`/notifications/${notificationId}/read`);
  return data;
};
