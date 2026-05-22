import AdmissionStudentStep from './admissionStudentStep';
import AdmissionParentsStep from './admissionParentsStep';
import AdmissionDocumentsStep from './admissionDocumentsStep';
import AdmissionReviewStep from './admissionReviewStep';

const AdmissionStepContent = ({
  stepId,
  stepForm,
  form,
  onStudentChange,
  onParentsChange,
  photoError,
  onPhotoSelect,
  onPhotoClear,
}) => {
  if (stepId === 'studentDetails') {
    return (
      <AdmissionStudentStep
        student={form.student}
        fields={stepForm.fields}
        onChange={onStudentChange}
      />
    );
  }

  if (stepId === 'parentDetails') {
    return (
      <AdmissionParentsStep
        parents={form.parents}
        fields={stepForm.fields}
        onChange={onParentsChange}
      />
    );
  }

  if (stepId === 'documents') {
    return (
      <AdmissionDocumentsStep
        documents={form.documents}
        fields={stepForm.fields}
        photoError={photoError}
        onPhotoSelect={onPhotoSelect}
        onPhotoClear={onPhotoClear}
      />
    );
  }

  if (stepId === 'review') {
    return (
      <AdmissionReviewStep
        subtitle={stepForm.subtitle}
        form={form}
        labels={stepForm.labels}
      />
    );
  }

  return null;
};

export default AdmissionStepContent;
