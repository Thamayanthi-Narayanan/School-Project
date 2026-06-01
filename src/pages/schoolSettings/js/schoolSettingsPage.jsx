import { useMemo, useState } from 'react';
import '../../../components/reusable/css/crmReusable.css';
import '../../settings/css/settingsPage.css';
import '../css/schoolSettingsPage.css';
import { schoolSettingsPageMock } from '../../../data/mocks/schoolSettings/schoolSettingsPage.mock';
import {
  PageHeader,
  CrmButton,
  FormInput,
} from '../../../components/reusable/js/index';

const SchoolSettingsPage = () => {
  const { title, subtitle, tabs, defaultTab, panels } = schoolSettingsPageMock;
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [termRows, setTermRows] = useState(panels.terms.rows);

  const panel = panels[activeTab];
  const isProfile = activeTab === 'profile';
  const isTerms = activeTab === 'terms';
  const isSequences = activeTab === 'sequences';

  const termTotal = useMemo(
    () => termRows.reduce((sum, row) => sum + (Number(row.splitPercent) || 0), 0),
    [termRows],
  );

  const handleTermChange = (rowId, field, value) => {
    setTermRows((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, [field]: value } : row)),
    );
  };

  return (
    <div className="crmListPage schoolSettingsPage settingsPage">
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
        {panel.description && (
          <p className="settingsCardDescription">{panel.description}</p>
        )}

        {isProfile && (
          <>
            <div className="schoolSettingsLogoRow">
              <div className="schoolSettingsLogoPreview" aria-hidden="true">
                <span className="schoolSettingsLogoInitials">GV</span>
              </div>
              <CrmButton variant="outline" type="button" aria-label={panel.logo.changeAriaLabel}>
                {panel.logo.changeLabel}
              </CrmButton>
            </div>
            <div className="settingsFormGrid">
              {panel.fields.map((field) => (
                <FormInput
                  key={field.id}
                  label={field.label}
                  type={field.type || 'text'}
                  defaultValue={field.defaultValue}
                />
              ))}
            </div>
          </>
        )}

        {isTerms && (
          <>
            <p className="schoolSettingsWarning" role="note">{panel.warning}</p>
            <div className="schoolSettingsTermTableWrap">
              <table className="crmTable schoolSettingsTermTable">
                <thead>
                  <tr>
                    {panel.columns.map((column) => (
                      <th key={column}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {termRows.map((row, index) => (
                    <tr key={row.id} className="crmTableRow">
                      <td>{`Term ${index + 1}`}</td>
                      <td>
                        <FormInput
                          label="Name"
                          defaultValue={row.name}
                          onChange={(event) => handleTermChange(row.id, 'name', event.target.value)}
                        />
                      </td>
                      <td>
                        <FormInput
                          label="Due date"
                          defaultValue={row.dueDate}
                          onChange={(event) => handleTermChange(row.id, 'dueDate', event.target.value)}
                        />
                      </td>
                      <td>
                        <FormInput
                          label="Split %"
                          defaultValue={row.splitPercent}
                          onChange={(event) => handleTermChange(row.id, 'splitPercent', event.target.value)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p
              className={`schoolSettingsTermTotal${termTotal === 100 ? ' schoolSettingsTermTotalValid' : ' schoolSettingsTermTotalInvalid'}`}
              role="status"
            >
              {termTotal === 100
                ? panel.totalValidLabel
                : `${panel.totalInvalidPrefix} ${termTotal}% ${panel.totalInvalidSuffix}`}
            </p>
          </>
        )}

        {isSequences && (
          <div className="schoolSettingsTermTableWrap">
            <table className="crmTable schoolSettingsTermTable">
              <thead>
                <tr>
                  {panel.columns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {panel.rows.map((row) => (
                  <tr key={row.id} className="crmTableRow">
                    <td>{row.type}</td>
                    <td>
                      <FormInput label="Prefix" defaultValue={row.prefix} />
                    </td>
                    <td>
                      <FormInput
                        label="Starting number"
                        defaultValue={row.startingNumber}
                        disabled={!row.startingEditable}
                      />
                    </td>
                    <td className="schoolSettingsPreviewCell">{row.preview}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="settingsCardActions settingsCardActionsEnd">
          <CrmButton variant="primary" type="button">
            {panel.primaryActionLabel}
          </CrmButton>
        </div>
      </section>
    </div>
  );
};

export default SchoolSettingsPage;
