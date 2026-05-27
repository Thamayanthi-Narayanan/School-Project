import '../../../components/reusable/css/crmReusable.css';
import '../css/notificationsPage.css';
import { notificationsPageMock } from '../../../data/mocks/notifications/notificationsPage.mock';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';
import NotificationBellIcon from '../../../components/common/js/notificationBellIcon';
import { PageHeader } from '../../../components/reusable/js/index';

const NotificationsPage = () => {
  const { title, subtitle, actions, items } = notificationsPageMock;

  return (
    <div className="crmListPage notificationsPage">
      <PageHeader title={title} subtitle={subtitle} className="notificationsPageHeader">
        <button type="button" className="notificationsMarkAllBtn">
          {DashboardIcons.checksDouble(16)}
          {actions.markAllReadLabel}
        </button>
      </PageHeader>

      <section className="notificationsCard crmSectionAnimate">
        <ul className="notificationsList">
          {items.map((item, index) => (
            <li
              key={item.id}
              className={`notificationsItem${index < items.length - 1 ? '' : ' notificationsItemLast'}`}
            >
              <NotificationBellIcon size="md" />
              <div className="notificationsContent">
                <p className="notificationsTitle">{item.title}</p>
                <p className="notificationsDesc">{item.description}</p>
              </div>
              <time className="notificationsTime" dateTime={item.time}>
                {item.time}
              </time>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default NotificationsPage;
