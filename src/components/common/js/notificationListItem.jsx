import '../css/notificationListItem.css';
import NotificationBellIcon from './notificationBellIcon';
import { NOTIFICATION_STATUS } from '../../../utils/notificationUtils';

const NotificationListItem = ({
  item,
  isLast = false,
  onClick,
  isActive = false,
  disabled = false,
  className = '',
}) => {
  const isUnread = item?.status === NOTIFICATION_STATUS.UNREAD;
  const Component = onClick ? 'button' : 'li';

  const classNames = [
    'notificationListItem',
    isLast ? 'notificationListItemLast' : '',
    isUnread ? 'notificationListItemUnread' : '',
    isActive ? 'notificationListItemActive' : '',
    onClick ? 'notificationListItemClickable' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <NotificationBellIcon size="md" />
      <div className="notificationListItemContent">
        <p className="notificationListItemTitle">{item.title}</p>
        <p className="notificationListItemDesc">{item.description || item.body}</p>
      </div>
      <time className="notificationListItemTime" dateTime={item.createdAt || undefined}>
        {item.timeLabel}
      </time>
    </>
  );

  if (onClick) {
    return (
      <Component
        type="button"
        className={classNames}
        onClick={onClick}
        disabled={disabled}
        aria-label={`${item.title}. ${item.description || item.body}`}
      >
        {content}
      </Component>
    );
  }

  return <Component className={classNames}>{content}</Component>;
};

export default NotificationListItem;
