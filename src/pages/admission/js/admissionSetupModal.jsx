import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import '../css/admissionPage.css';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';
import { CrmButton, FormScrollSelect } from '../../../components/reusable/js/index';
import { useMasterDataSelect } from '../../../hooks/useMasterDataSelect';
import {
  ADMISSION_ACADEMIC_YEARS,
  ADMISSION_CLASSES,
} from '../../../utils/admissionForm';
import { buildRoleLoadingOptions, MASTER_DATA_KEYS } from '../../../utils/masterDataOptions';

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
  const classPlaceholder = copy.classPlaceholder;
  const yearPlaceholder = copy.academicYearPlaceholder;

  const { options: apiClassOptions, isLoading: classLoading } = useMasterDataSelect(
    MASTER_DATA_KEYS.class,
    { includeEmpty: true, placeholder: classPlaceholder, useIdAsValue: true },
  );

  const { options: apiYearOptions, isLoading: yearLoading } = useMasterDataSelect(
    MASTER_DATA_KEYS.academicYear,
    { includeEmpty: true, placeholder: yearPlaceholder, useIdAsValue: true },
  );

  const classOptions = useMemo(() => {
    if (classLoading) return buildRoleLoadingOptions();
    if (apiClassOptions.length > 1) return apiClassOptions;
    return [
      { label: classPlaceholder, value: '' },
      ...ADMISSION_CLASSES.map((item) => ({
        value: String(item.id),
        label: item.label,
      })),
    ];
  }, [apiClassOptions, classLoading, classPlaceholder]);

  const yearOptions = useMemo(() => {
    if (yearLoading) return buildRoleLoadingOptions();
    if (apiYearOptions.length > 1) return apiYearOptions;
    return [
      { label: yearPlaceholder, value: '' },
      ...ADMISSION_ACADEMIC_YEARS.map((item) => ({
        value: String(item.id),
        label: item.label,
      })),
    ];
  }, [apiYearOptions, yearLoading, yearPlaceholder]);

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

  const canConfirm = classId !== '' && academicYearId !== '';

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) onClose?.();
  };

  return createPortal(
    <div
      className="crmModalOverlay admissionSetupOverlay"
      role="presentation"
      onClick={handleOverlayClick}
    >
      <div
        className="crmModal admissionSetupModal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admissionSetupTitle"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="crmModalHeader">
          <h2 id="admissionSetupTitle" className="crmModalTitle">{copy.title}</h2>
          <p className="crmModalSubtitle">{copy.subtitle}</p>
        </header>

        <div className="admissionSetupModalBody">
          <FormScrollSelect
            label={copy.academicYearLabel}
            placeholder={yearPlaceholder}
            options={yearOptions}
            value={academicYearId}
            onChange={(e) => onAcademicYearChange(e.target.value)}
            disabled={yearLoading}
          />
          <FormScrollSelect
            label={copy.classLabel}
            placeholder={classPlaceholder}
            options={classOptions}
            value={classId}
            onChange={(e) => onClassChange(e.target.value)}
            disabled={classLoading}
          />
        </div>

        <footer className="crmModalFooter">
          <CrmButton variant="outline" type="button" onClick={onClose}>
            {copy.cancelLabel}
          </CrmButton>
          <CrmButton
            variant="primary"
            type="button"
            onClick={onConfirm}
            disabled={!canConfirm || classLoading || yearLoading}
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
