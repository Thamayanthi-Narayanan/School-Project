import { useState } from 'react';
import '../../../components/reusable/css/crmReusable.css';
import '../css/studentFeeSetupPage.css';
import { studentFeeSetupPageMock } from '../../../data/mocks/studentFeeSetup/studentFeeSetupPage.mock';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';
import {
  PageHeader,
  CrmButton,
  DataTableCard,
  FormSearchBar,
  FormSelect,
} from '../../../components/reusable/js/index';
import { useMasterDataSelect } from '../../../hooks/useMasterDataSelect';
import { MASTER_DATA_KEYS } from '../../../utils/masterDataOptions';

const StudentFeeSetupPage = () => {
  const {
    title,
    subtitle,
    selectors,
    sections,
    actions,
    sampleStudent,
  } = studentFeeSetupPageMock;

  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [useDefaultSplit, setUseDefaultSplit] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const { options: yearOptions, isLoading: yearLoading } = useMasterDataSelect(
    MASTER_DATA_KEYS.academicYear,
    {
      useIdAsValue: false,
      placeholder: selectors.academicYearPlaceholder,
      loadingLabel: selectors.loadingLabel,
    },
  );

  const studentOptions = [
    { label: sampleStudent.label, value: sampleStudent.id },
  ];

  const showPanel = selectedStudentId === sampleStudent.id;

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 600);
  };

  return (
    <div className="crmListPage studentFeeSetupPage">
      <PageHeader title={title} subtitle={subtitle} />

      <div className="studentFeeSetupSelectors crmSectionAnimate crmSectionDelay1">
        <FormSearchBar
          placeholder={selectors.studentSearchPlaceholder}
          ariaLabel={selectors.studentSearchAriaLabel}
        />
        <FormSelect
          ariaLabel="Select student"
          options={studentOptions}
          placeholder="Select student"
          onChange={(event) => setSelectedStudentId(event.target.value)}
        />
        <FormSelect
          ariaLabel={selectors.academicYearAriaLabel}
          options={yearOptions}
          placeholder={selectors.academicYearPlaceholder}
          disabled={yearLoading}
        />
      </div>

      {!showPanel && (
        <p className="studentFeeSetupHint crmSectionAnimate">{selectors.selectStudentHint}</p>
      )}

      {showPanel && (
        <div className="studentFeeSetupContent crmSectionAnimate crmSectionDelay2">
          <section className="studentFeeSetupSection">
            <h2 className="studentFeeSetupSectionTitle">{sections.classSummary.title}</h2>
            <p className="studentFeeSetupSectionDesc">{sections.classSummary.description}</p>
            <DataTableCard>
              <table className="crmTable">
                <thead>
                  <tr>
                    {sections.classSummary.columns.map((column) => (
                      <th key={column}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sampleStudent.classFeeRows.map((row) => (
                    <tr key={row.feeHead} className="crmTableRow">
                      <td>{row.feeHead}</td>
                      <td>{row.annual}</td>
                      <td>{row.term1}</td>
                      <td>{row.term2}</td>
                      <td>{row.term3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </DataTableCard>
          </section>

          <section className="studentFeeSetupSection">
            <h2 className="studentFeeSetupSectionTitle">{sections.termOverride.title}</h2>
            <label className="studentFeeSetupToggle">
              <input
                type="checkbox"
                checked={useDefaultSplit}
                onChange={(event) => setUseDefaultSplit(event.target.checked)}
              />
              <span>{sections.termOverride.useDefaultLabel}</span>
            </label>
            {!useDefaultSplit && (
              <div className="studentFeeSetupSplitGrid">
                {sections.termOverride.customFields.map((field) => (
                  <div key={field.id} className="studentFeeSetupSplitField">
                    <span className="studentFeeSetupSplitLabel">{field.label}</span>
                    <input type="text" className="crmFormInput" defaultValue="30" aria-label={field.label} />
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="studentFeeSetupSection">
            <header className="studentFeeSetupSectionHeader">
              <div>
                <h2 className="studentFeeSetupSectionTitle">{sections.additionalFees.title}</h2>
                <p className="studentFeeSetupSectionDesc">{sections.additionalFees.description}</p>
              </div>
              <CrmButton variant="outline" type="button">
                {DashboardIcons.plus(16)}
                {sections.additionalFees.addLabel}
              </CrmButton>
            </header>
            <DataTableCard>
              <table className="crmTable">
                <thead>
                  <tr>
                    {sections.additionalFees.columns.map((column) => (
                      <th key={column}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sampleStudent.additionalFeeRows.length === 0 && (
                    <tr>
                      <td colSpan={3} className="studentFeeSetupEmpty">
                        {sections.additionalFees.emptyMessage}
                      </td>
                    </tr>
                  )}
                  {sampleStudent.additionalFeeRows.map((row) => (
                    <tr key={row.id} className="crmTableRow">
                      <td>{row.feeHead}</td>
                      <td>{row.annual}</td>
                      <td>
                        <button type="button" className="crmActionBtn crmActionBtnDanger" aria-label={`Remove ${row.feeHead}`}>
                          {DashboardIcons.trash(16)}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </DataTableCard>
          </section>

          <section className="studentFeeSetupSection">
            <h2 className="studentFeeSetupSectionTitle">{sections.preview.title}</h2>
            <p className="studentFeeSetupSectionDesc">{sections.preview.description}</p>
            <DataTableCard>
              <table className="crmTable">
                <thead>
                  <tr>
                    {sections.preview.columns.map((column) => (
                      <th key={column}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sampleStudent.previewRows.map((row) => (
                    <tr key={`${row.feeHead}-${row.type}`} className="crmTableRow">
                      <td>{row.feeHead}</td>
                      <td>
                        <span className={`studentFeeSetupTypeBadge studentFeeSetupType${row.type}`}>
                          {row.type}
                        </span>
                      </td>
                      <td>{row.term1}</td>
                      <td>{row.term2}</td>
                      <td>{row.term3}</td>
                      <td>{row.annual}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </DataTableCard>
          </section>

          <footer className="studentFeeSetupFooter">
            <CrmButton variant="outline" type="button">
              {actions.cancelLabel}
            </CrmButton>
            <CrmButton variant="primary" type="button" onClick={handleSave} disabled={isSaving}>
              {isSaving ? actions.savingLabel : actions.saveLabel}
            </CrmButton>
          </footer>
        </div>
      )}
    </div>
  );
};

export default StudentFeeSetupPage;
