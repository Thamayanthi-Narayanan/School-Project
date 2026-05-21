import AdmissionFormFields from './admissionFormFields';
import AdmissionDocumentsStep from './admissionDocumentsStep';
import AdmissionReviewStep from './admissionReviewStep';

const AdmissionStepContent = ({ stepId, stepForm }) => {
  if (stepId === 'documents') {
    return (
      <AdmissionDocumentsStep
        upload={stepForm.upload}
        files={stepForm.files}
      />
    );
  }

  if (stepId === 'review') {
    return (
      <AdmissionReviewStep
        subtitle={stepForm.subtitle}
        summary={stepForm.summary}
      />
    );
  }

  return <AdmissionFormFields fields={stepForm.fields} />;
};

export default AdmissionStepContent;
