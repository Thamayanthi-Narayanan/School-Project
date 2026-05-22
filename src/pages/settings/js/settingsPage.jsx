import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../../../components/reusable/css/crmReusable.css';
import '../css/settingsPage.css';
import { settingsPageMock } from '../../../data/mocks/settings/settingsPage.mock';
import { PageHeader, CrmButton, FormInput } from '../../../components/reusable/js/index';
import { useChangePasswordForm } from '../hooks/useChangePasswordForm';
import { useSettingsProfile } from '../hooks/useSettingsProfile';

const resolveTab = (tabParam, panels, fallback) => {
  if (tabParam && panels[tabParam]) {
    return tabParam;
  }
  return fallback;
};

const ProfilePanel = ({ panel }) => {
  const { profile, isLoading, error, refetch } = useSettingsProfile(true);

  return (
    <>
      {panel.description && (
        <p className="settingsCardDescription">{panel.description}</p>
      )}

      {error && (
        <div className="settingsProfileErrorWrap">
          <p className="settingsAlert settingsAlertError" role="alert">
            {error}
          </p>
          <CrmButton variant="secondary" type="button" onClick={refetch}>
            {panel.retryLabel}
          </CrmButton>
        </div>
      )}

      {isLoading && !error && (
        <p className="settingsProfileLoading" role="status">
          {panel.loadingLabel}
        </p>
      )}

      <div
        className={`settingsFormGrid${isLoading ? ' settingsFormGridLoading' : ''}`}
        aria-busy={isLoading}
      >
        {panel.fields.map((field) => (
          <FormInput
            key={field.id}
            label={field.label}
            type={field.type || 'text'}
            value={profile[field.id] ?? ''}
            disabled
          />
        ))}
      </div>
    </>
  );
};

const SecurityPanel = ({ panel }) => {
  const { form, errors, isSubmitting, updateField, resetForm, handleSubmit } =
    useChangePasswordForm();

  useEffect(() => () => resetForm(), [resetForm]);

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    await handleSubmit();
  };

  return (
    <form onSubmit={handleSubmitForm} noValidate>
      {panel.description && (
        <p className="settingsCardDescription">{panel.description}</p>
      )}

      {errors.general && (
        <p className="settingsAlert settingsAlertError" role="alert">
          {errors.general}
        </p>
      )}

      <div className="settingsFormGrid settingsFormGridStacked">
        {panel.fields.map((field, index) => (
          <FormInput
            key={field.id}
            label={field.label}
            type={field.type || 'text'}
            placeholder={field.placeholder}
            value={form[field.id]}
            onChange={(e) => updateField(field.id, e.target.value)}
            error={errors[field.id]}
            autoFocus={index === 0}
          />
        ))}
      </div>

      <div className="settingsCardActions settingsCardActionsEnd">
        <CrmButton variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? panel.submittingLabel : panel.primaryActionLabel}
        </CrmButton>
      </div>
    </form>
  );
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
  const isProfile = activeTab === 'profile';
  const isNotifications = activeTab === 'notifications';
  const isSecurity = activeTab === 'security';

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
        ) : isSecurity ? (
          <SecurityPanel panel={panel} />
        ) : isProfile ? (
          <ProfilePanel panel={panel} />
        ) : (
          <>
            <div className="settingsFormGrid">
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
            <div className="settingsCardActions settingsCardActionsEnd">
              <CrmButton variant="primary">{panel.primaryActionLabel}</CrmButton>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default SettingsPage;
