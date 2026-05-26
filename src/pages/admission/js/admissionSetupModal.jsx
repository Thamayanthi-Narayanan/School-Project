import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import '../css/admissionPage.css';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';
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
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

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

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  return createPortal(
    <div
      className="admissionSetupOverlay"
      role="presentation"
      onClick={handleOverlayClick}
    >
      <div
        className="admissionSetupModal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admissionSetupTitle"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="admissionSetupHeader">
          <div className="admissionSetupHeaderText">
            <h2 id="admissionSetupTitle" className="admissionSetupTitle">
              {copy.title}
            </h2>
            <p className="admissionSetupSubtitle">{copy.subtitle}</p>
          </div>
          <button
            type="button"
            className="admissionSetupClose"
            aria-label={copy.closeLabel}
            onClick={onClose}
          >
            {DashboardIcons.xClose(20)}
          </button>
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
          <CrmButton variant="outline" type="button" onClick={onClose}>
            {copy.cancelLabel}
          </CrmButton>
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
