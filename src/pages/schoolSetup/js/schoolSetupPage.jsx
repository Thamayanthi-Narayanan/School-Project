import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../components/reusable/css/crmReusable.css';
import '../css/schoolSetupPage.css';
import { schoolSetupPageMock } from '../../../data/mocks/schoolSetup/schoolSetupPage.mock';
import { routePaths } from '../../../constants/routePaths';
import { setSchoolSetupComplete } from '../../../services/schoolSetupStorage';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';
import {
  CrmButton,
  FormInput,
  FormTextarea,
} from '../../../components/reusable/js/index';

const SchoolSetupPage = () => {
  const navigate = useNavigate();
  const {
    title,
    subtitle,
    steps,
    navigation,
    profile,
    terms,
    sequences,
    admin,
    success,
  } = schoolSetupPageMock;

  const [currentStep, setCurrentStep] = useState(0);
  const [termRows, setTermRows] = useState(() =>
    terms.rows.map((row) => ({
      ...row,
      name: row.defaultName,
      dueDate: row.defaultDueDate,
      splitPercent: row.defaultSplit,
    })),
  );
  const [isComplete, setIsComplete] = useState(false);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const termTotal = useMemo(
    () => termRows.reduce((sum, row) => sum + (Number(row.splitPercent) || 0), 0),
    [termRows],
  );

  const handleTermChange = (rowId, field, value) => {
    setTermRows((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, [field]: value } : row)),
    );
  };

  const handleNext = () => {
    if (isLastStep) {
      setSchoolSetupComplete(true);
      setIsComplete(true);
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleGoToDashboard = () => {
    navigate(routePaths.dashboard);
  };

  if (isComplete) {
    return (
      <div className="crmListPage schoolSetupPage schoolSetupPageSuccess">
        <div className="schoolSetupSuccessCard crmSectionAnimate">
          <span className="schoolSetupSuccessIcon" aria-hidden="true">
            {DashboardIcons.checkCircle(40)}
          </span>
          <h1 className="schoolSetupSuccessTitle">{success.title}</h1>
          <p className="schoolSetupSuccessMessage">{success.message}</p>
          <CrmButton variant="primary" type="button" onClick={handleGoToDashboard}>
            {success.dashboardLabel}
          </CrmButton>
        </div>
      </div>
    );
  }

  const activeStep = steps[currentStep];

  return (
    <div className="crmListPage schoolSetupPage">
      <header className="schoolSetupHeader crmSectionAnimate">
        <h1 className="crmPageTitle">{title}</h1>
        <p className="crmPageSubtitle">{subtitle}</p>
      </header>

      <nav className="schoolSetupStepper crmSectionAnimate schoolSetupSectionDelay1" aria-label="Setup progress">
        {steps.map((step, index) => (
          <div key={step.id} className="schoolSetupStepperItemWrap">
            <button
              type="button"
              className={`schoolSetupStepperItem${index === currentStep ? ' schoolSetupStepperItemActive' : ''}${index < currentStep ? ' schoolSetupStepperItemCompleted' : ''}`}
              onClick={() => index <= currentStep && setCurrentStep(index)}
              aria-current={index === currentStep ? 'step' : undefined}
            >
              {index < currentStep ? (
                <span className="schoolSetupStepperCheck" aria-hidden="true">
                  {DashboardIcons.checkCircle(14)}
                </span>
              ) : (
                <span className="schoolSetupStepperNum">{index + 1}</span>
              )}
              <span className="schoolSetupStepperLabel">{step.label}</span>
            </button>
            {index < steps.length - 1 && (
              <span className="schoolSetupStepperSep" aria-hidden="true">
                {DashboardIcons.chevronRight(14)}
              </span>
            )}
          </div>
        ))}
      </nav>

      <section className="schoolSetupCard crmSectionAnimate schoolSetupSectionDelay2">
        <h2 className="schoolSetupCardTitle">{activeStep.label}</h2>

        {currentStep === 0 && (
          <>
            <p className="schoolSetupCardDescription">{profile.description}</p>
            <div className="schoolSetupLogoUpload">
              <span className="schoolSetupLogoUploadLabel">{profile.logoUploadLabel}</span>
              <p className="schoolSetupLogoUploadHint">{profile.logoUploadHint}</p>
            </div>
            <div className="schoolSetupFormGrid">
              {profile.fields.map((field, index) => (
                field.id === 'address' ? (
                  <FormTextarea
                    key={field.id}
                    label={field.label}
                    placeholder={field.placeholder}
                    rows={3}
                  />
                ) : (
                  <FormInput
                    key={field.id}
                    label={field.label}
                    type={field.type || 'text'}
                    placeholder={field.placeholder}
                    autoFocus={index === 0}
                  />
                )
              ))}
            </div>
          </>
        )}

        {currentStep === 1 && (
          <>
            <p className="schoolSetupWarning" role="note">{terms.warning}</p>
            <div className="schoolSetupTermTableWrap">
              <table className="crmTable">
                <thead>
                  <tr>
                    {terms.columns.map((column) => (
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
                          value={row.name}
                          onChange={(event) => handleTermChange(row.id, 'name', event.target.value)}
                        />
                      </td>
                      <td>
                        <FormInput
                          label="Due date"
                          value={row.dueDate}
                          onChange={(event) => handleTermChange(row.id, 'dueDate', event.target.value)}
                          placeholder="dd - mm - yyyy"
                        />
                      </td>
                      <td>
                        <FormInput
                          label="Split %"
                          value={row.splitPercent}
                          onChange={(event) => handleTermChange(row.id, 'splitPercent', event.target.value)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p
              className={`schoolSetupTermTotal${termTotal === 100 ? ' schoolSetupTermTotalValid' : ''}`}
              role="status"
            >
              {termTotal === 100
                ? terms.totalValidLabel
                : `${terms.totalInvalidPrefix} ${termTotal}% ${terms.totalInvalidSuffix}`}
            </p>
          </>
        )}

        {currentStep === 2 && (
          <>
            <p className="schoolSetupCardDescription">{sequences.description}</p>
            <div className="schoolSetupTermTableWrap">
              <table className="crmTable">
                <thead>
                  <tr>
                    {sequences.columns.map((column) => (
                      <th key={column}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sequences.rows.map((row) => (
                    <tr key={row.id} className="crmTableRow">
                      <td>{row.type}</td>
                      <td>
                        <FormInput label="Prefix" defaultValue={row.defaultPrefix} />
                      </td>
                      <td>
                        <FormInput label="Starting number" defaultValue={row.defaultStart} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="schoolSetupSequencePreview">
              <span>{sequences.previewPrefix}</span>
              {' '}
              <strong>{sequences.previewExample}</strong>
            </p>
          </>
        )}

        {currentStep === 3 && (
          <>
            <p className="schoolSetupCardDescription">{admin.description}</p>
            <div className="schoolSetupFormGrid">
              {admin.fields.map((field, index) => (
                <FormInput
                  key={field.id}
                  label={field.label}
                  type={field.type || 'text'}
                  placeholder={field.placeholder}
                  autoFocus={index === 0}
                />
              ))}
            </div>
          </>
        )}

        <footer className="schoolSetupFooter">
          <CrmButton variant="outline" type="button" onClick={handleBack} disabled={isFirstStep}>
            {navigation.backLabel}
          </CrmButton>
          <CrmButton variant="primary" type="button" onClick={handleNext}>
            {isLastStep ? navigation.completeLabel : navigation.nextLabel}
          </CrmButton>
        </footer>
      </section>
    </div>
  );
};

export default SchoolSetupPage;
