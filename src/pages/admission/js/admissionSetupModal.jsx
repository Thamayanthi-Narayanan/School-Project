import { createPortal } from 'react-dom';
import '../css/admissionPage.css';
import { CrmButton, FormScrollSelect } from '../../../components/reusable/js/index';
import {
  ADMISSION_CLASSES,
  ADMISSION_ACADEMIC_YEARS,
} from '../../../utils/admissionForm';

const AdmissionSetupModal = ({
  isOpen,
  copy,
  classId,
  academicYearId,
  onClassChange,
  onAcademicYearChange,
  onConfirm,
}) => {
  if (!isOpen) return null;

  const classPlaceholder = copy.classPlaceholder;
  const yearPlaceholder = copy.academicYearPlaceholder;
  const canConfirm = classId !== '' && academicYearId !== '';

  const classOptions = ADMISSION_CLASSES.map((item) => ({
    value: String(item.id),
    label: item.label,
  }));

  const yearOptions = ADMISSION_ACADEMIC_YEARS.map((item) => ({
    value: String(item.id),
    label: item.label,
  }));

  return createPortal(
    <div className="admissionSetupOverlay" role="presentation">
      <div
        className="admissionSetupModal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admissionSetupTitle"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="admissionSetupHeader">
          <h2 id="admissionSetupTitle" className="admissionSetupTitle">
            {copy.title}
          </h2>
          <p className="admissionSetupSubtitle">{copy.subtitle}</p>
        </header>

        <div className="admissionSetupFields">
          <FormScrollSelect
            label={copy.classLabel}
            placeholder={classPlaceholder}
            options={classOptions}
            value={classId}
            onChange={onClassChange}
          />
          <FormScrollSelect
            label={copy.academicYearLabel}
            placeholder={yearPlaceholder}
            options={yearOptions}
            value={academicYearId}
            onChange={onAcademicYearChange}
          />
        </div>

        <footer className="admissionSetupFooter">
          <CrmButton
            variant="primary"
            type="button"
            disabled={!canConfirm}
            onClick={onConfirm}
          >
            {copy.confirmLabel}
          </CrmButton>
        </footer>
      </div>
    </div>,
    document.body,
  );
};

export default AdmissionSetupModal;
