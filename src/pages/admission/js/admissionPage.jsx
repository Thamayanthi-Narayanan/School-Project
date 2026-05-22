import '../../../components/reusable/css/crmReusable.css';
import '../css/admissionPage.css';
import { admissionPageMock } from '../../../data/mocks/admission/admissionPage.mock';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';
import { CrmButton, FormTipsPanel } from '../../../components/reusable/js/index';
import AdmissionStepper from './admissionStepper';
import AdmissionStepContent from './admissionStepContent';
import AdmissionSetupModal from './admissionSetupModal';
import useAdmissionWizard from '../hooks/useAdmissionWizard';
import useAdmissionForm from '../hooks/useAdmissionForm';

const AdmissionPage = () => {
  const {
    title,
    subtitle,
    actions,
    setupModal,
    steps,
    stepForms,
    tips,
  } = admissionPageMock;

  const {
    form,
    setupConfirmed,
    setupClassId,
    setupAcademicYearId,
    setSetupClassId,
    setSetupAcademicYearId,
    updateStudentField,
    updateParentsField,
    profilePhotoError,
    setProfilePhoto,
    confirmSetup,
    resetSetup,
    getPayload,
  } = useAdmissionForm();

  const {
    currentStep,
    isFirstStep,
    isLastStep,
    goToNext,
    goToPrevious,
    goToStep,
  } = useAdmissionWizard(steps.length);

  const activeStep = steps[currentStep];
  const activeForm = stepForms[activeStep.id];

  const handleSubmit = () => {
    getPayload();
    // API integration: POST admission payload when endpoint is ready
  };

  if (!setupConfirmed) {
    return (
      <div className="crmListPage admissionPage admissionPageSetupOnly">
        <header className="admissionPageHeader crmSectionAnimate">
          <div>
            <h1 className="crmPageTitle">{title}</h1>
            <p className="crmPageSubtitle">{subtitle}</p>
          </div>
        </header>

        <AdmissionSetupModal
          isOpen
          copy={setupModal}
          classId={setupClassId}
          academicYearId={setupAcademicYearId}
          onClassChange={setSetupClassId}
          onAcademicYearChange={setSetupAcademicYearId}
          onConfirm={confirmSetup}
        />
      </div>
    );
  }

  return (
    <div className="crmListPage admissionPage">
      <header className="admissionPageHeader crmSectionAnimate">
        <div>
          <h1 className="crmPageTitle">{title}</h1>
          <p className="crmPageSubtitle">{subtitle}</p>
        </div>
        <div className="crmPageActions">
          <CrmButton variant="outline" type="button" onClick={resetSetup}>
            {actions.changeClassLabel}
          </CrmButton>
          <CrmButton variant="outline">
            {DashboardIcons.save(16)}
            {actions.saveDraftLabel}
          </CrmButton>
          <CrmButton variant="primary" onClick={isLastStep ? handleSubmit : undefined}>
            {actions.submitLabel}
          </CrmButton>
        </div>
      </header>

      <AdmissionStepper
        steps={steps}
        currentStep={currentStep}
        onStepClick={goToStep}
      />

      <div className="admissionContent crmSectionAnimate admissionSectionDelay2">
        <div className="admissionFormCard">
          <div className="admissionFormBody">
            <h2 className="admissionFormTitle">{activeForm.sectionTitle}</h2>
            <AdmissionStepContent
              stepId={activeStep.id}
              stepForm={activeForm}
              form={form}
              onStudentChange={updateStudentField}
              onParentsChange={updateParentsField}
              photoError={profilePhotoError}
              onPhotoSelect={setProfilePhoto}
              onPhotoClear={() => setProfilePhoto(null)}
            />
          </div>

          <footer className="admissionFormFooter">
            <CrmButton
              variant="outline"
              onClick={goToPrevious}
              disabled={isFirstStep}
              className="admissionBtnBack"
            >
              {DashboardIcons.chevronLeft(16)}
              {actions.backLabel}
            </CrmButton>
            {isLastStep ? (
              <CrmButton variant="primary" className="admissionBtnContinue" onClick={handleSubmit}>
                {actions.submitLabel}
              </CrmButton>
            ) : (
              <CrmButton variant="primary" onClick={goToNext} className="admissionBtnContinue">
                {actions.continueLabel}
                {DashboardIcons.chevronRight(16)}
              </CrmButton>
            )}
          </footer>
        </div>

        <FormTipsPanel title={tips.title} items={tips.items} />
      </div>
    </div>
  );
};

export default AdmissionPage;
