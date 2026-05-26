import '../css/notificationBellIcon.css';
import { DashboardIcons } from './dashboardIcons';

const sizeMap = {
  sm: { wrap: 'crmNotificationBellSm', icon: 16 },
  md: { wrap: '', icon: 18 },
  lg: { wrap: 'crmNotificationBellLg', icon: 20 },
};

const NotificationBellIcon = ({ size = 'md', variant = 'filled', className = '' }) => {
  const { wrap, icon } = sizeMap[size] || sizeMap.md;
  const variantClass = variant === 'plain' ? 'crmNotificationBellPlain' : '';
  const wrapClass = ['crmNotificationBell', wrap, variantClass, className].filter(Boolean).join(' ');

  return (
    <span className={wrapClass} aria-hidden="true">
      {DashboardIcons.bellNotification(icon)}
    </span>
  );
};

export default NotificationBellIcon;
