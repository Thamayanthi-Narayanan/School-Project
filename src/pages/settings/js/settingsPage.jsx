import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../../../components/reusable/css/crmReusable.css';
import '../css/settingsPage.css';
import { settingsPageMock } from '../../../data/mocks/settings/settingsPage.mock';
import { PageHeader, CrmButton, FormInput } from '../../../components/reusable/js/index';

const resolveTab = (tabParam, panels, fallback) => {
  if (tabParam && panels[tabParam]) {
    return tabParam;
  }
  return fallback;
};

const SettingsPage = () => {
  const {
    title,
    subtitle,
    tabs,
    defaultTab,
    panels,
  } = settingsPageMock;

  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(() => resolveTab(tabFromUrl, panels, defaultTab));

  useEffect(() => {
    const nextTab = resolveTab(searchParams.get('tab'), panels, defaultTab);
    setActiveTab(nextTab);
  }, [searchParams, panels, defaultTab]);
  const [notificationState, setNotificationState] = useState(() => {
    const initial = {};
    panels.notifications.items.forEach((item) => {
      initial[item.id] = item.enabled;
    });
    return initial;
  });

  const panel = panels[activeTab];
  const isNotifications = activeTab === 'notifications';
  const actionAlign = panel.actionAlign === 'center' ? 'settingsCardActionsCenter' : 'settingsCardActionsEnd';

  const toggleNotification = (id) => {
    setNotificationState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="crmListPage settingsPage">
      <PageHeader title={title} subtitle={subtitle} className="settingsPageHeader" />

      <div className="settingsTabs crmSectionAnimate">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`settingsTab${activeTab === tab.id ? ' settingsTabActive' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <section className="settingsCard crmSectionAnimate settingsSectionDelay1" key={activeTab}>
        <h2 className="settingsCardTitle">{panel.cardTitle}</h2>

        {isNotifications ? (
          <ul className="settingsNotifList">
            {panel.items.map((item) => {
              const isOn = notificationState[item.id];
              return (
                <li key={item.id} className="settingsNotifItem">
                  <span className="settingsNotifLabel">{item.label}</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isOn}
                    className={`settingsToggle${isOn ? ' settingsToggleOn' : ''}`}
                    onClick={() => toggleNotification(item.id)}
                  >
                    <span className="settingsToggleThumb" />
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <>
            <div
              className={`settingsFormGrid${
                activeTab === 'security' ? ' settingsFormGridStacked' : ''
              }`}
            >
              {panel.fields.map((field) => (
                <FormInput
                  key={field.id}
                  label={field.label}
                  type={field.type || 'text'}
                  defaultValue={field.defaultValue}
                  placeholder={field.placeholder}
                />
              ))}
            </div>
            <div className={`settingsCardActions ${actionAlign}`}>
              <CrmButton variant="primary">{panel.primaryActionLabel}</CrmButton>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default SettingsPage;
