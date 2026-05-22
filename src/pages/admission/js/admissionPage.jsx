import '../../../components/reusable/css/crmReusable.css';
import '../css/admissionPage.css';
import { admissionPageMock } from '../../../data/mocks/admission/admissionPage.mock';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';
import { CrmButton, FormTipsPanel } from '../../../components/reusable/js/index';
import AdmissionStepper from './admissionStepper';
import AdmissionStepContent from './admissionStepContent';
import AdmissionSetupModal from './admissionSetupModal';
import AdmissionSuccessPopup from './admissionSuccessPopup';
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
    profilePhotoError,
    errors,
    isSubmitting,
    successResult,
    successCopy,
    setSetupClassId,
    setSetupAcademicYearId,
    updateStudentField,
    updateParentsField,
    setProfilePhoto,
    confirmSetup,
    resetSetup,
    submitAdmission,
    dismissSuccess,
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

  const handleSubmit = async () => {
    await submitAdmission();
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
      <AdmissionSuccessPopup
        result={successResult}
        copy={successCopy}
        onDismiss={dismissSuccess}
      />

      <header className="admissionPageHeader crmSectionAnimate">
        <div>
          <h1 className="crmPageTitle">{title}</h1>
          <p className="crmPageSubtitle">{subtitle}</p>
        </div>
        <div className="crmPageActions">
          <CrmButton variant="outline" type="button" onClick={resetSetup}>
            {actions.changeClassLabel}
          </CrmButton>
          <CrmButton variant="outline" type="button" disabled={isSubmitting}>
            {DashboardIcons.save(16)}
            {actions.saveDraftLabel}
          </CrmButton>
          <CrmButton
            variant="primary"
            type="button"
            disabled={isSubmitting}
            onClick={isLastStep ? handleSubmit : undefined}
          >
            {isSubmitting ? actions.submittingLabel : actions.submitLabel}
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

            {errors.general && (
              <p className="admissionAlert admissionAlertError" role="alert">
                {errors.general}
              </p>
            )}

            <AdmissionStepContent
              stepId={activeStep.id}
              stepForm={activeForm}
              form={form}
              errors={errors}
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
              disabled={isFirstStep || isSubmitting}
              className="admissionBtnBack"
            >
              {DashboardIcons.chevronLeft(16)}
              {actions.backLabel}
            </CrmButton>
            {isLastStep ? (
              <CrmButton
                variant="primary"
                className="admissionBtnContinue"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? actions.submittingLabel : actions.submitLabel}
              </CrmButton>
            ) : (
              <CrmButton
                variant="primary"
                onClick={goToNext}
                className="admissionBtnContinue"
                disabled={isSubmitting}
              >
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
