import { createPortal } from 'react-dom';
import { CrmButton } from '../../../components/reusable/js/index';
import ScholarshipSchemeFormFields from './scholarshipSchemeFormFields';
import '../css/scholarshipSchemeFormModal.css';

const ScholarshipSchemeFormModal = ({
  isOpen,
  copy,
  form,
  errors,
  isSubmitting,
  isFormLoading,
  loadError,
  schemeName,
  titleId = 'scholarshipSchemeFormTitle',
  schemeTypeOptions,
  schemeTypeLoading,
  discountTypeOptions,
  discountTypeLoading,
  applicableToOptions,
  applicableToLoading,
  academicYearOptions,
  academicYearLoading,
  feeHeadOptions,
  feeHeadLoading,
  onClose,
  onChange,
  onSubmit,
}) => {
  if (!isOpen) return null;

  const subtitle = copy.subtitle?.includes('{name}')
    ? copy.subtitle.replace('{name}', schemeName || copy.fallbackName || '')
    : copy.subtitle;

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget && !isSubmitting) onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isFormLoading) return;
    const isSuccess = await onSubmit();
    if (isSuccess) onClose();
  };

  return createPortal(
    <div className="crmModalOverlay" role="presentation" onClick={handleOverlayClick}>
      <div
        className="crmModal scholarshipSchemeFormModal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <header className="crmModalHeader">
          <h2 id={titleId} className="crmModalTitle">
            {copy.title}
          </h2>
          <p className="crmModalSubtitle">{subtitle}</p>
        </header>

        <form onSubmit={handleSubmit} noValidate>
          {loadError ? (
            <p className="scholarshipSchemeFormError" role="alert">{loadError}</p>
          ) : null}
          {errors.general ? (
            <p className="scholarshipSchemeFormError" role="alert">{errors.general}</p>
          ) : null}

          {isFormLoading ? (
            <p className="scholarshipsListState">{copy.loadingMessage}</p>
          ) : (
          <ScholarshipSchemeFormFields
            fields={copy.fields}
            form={form}
            errors={errors}
            isSubmitting={isSubmitting}
            onChange={onChange}
            schemeTypeOptions={schemeTypeOptions}
            schemeTypeLoading={schemeTypeLoading}
            discountTypeOptions={discountTypeOptions}
            discountTypeLoading={discountTypeLoading}
            applicableToOptions={applicableToOptions}
            applicableToLoading={applicableToLoading}
            academicYearOptions={academicYearOptions}
            academicYearLoading={academicYearLoading}
            feeHeadOptions={feeHeadOptions}
            feeHeadLoading={feeHeadLoading}
          />
          )}

          <footer className="crmModalFooter">
            <CrmButton variant="outline" type="button" onClick={onClose} disabled={isSubmitting}>
              {copy.cancelLabel}
            </CrmButton>
            <CrmButton
              variant="primary"
              type="submit"
              disabled={isSubmitting || isFormLoading || Boolean(loadError)}
            >
              {isSubmitting ? copy.submittingLabel : copy.submitLabel}
            </CrmButton>
          </footer>
        </form>
      </div>
    </div>,
    document.body,
  );
};

export default ScholarshipSchemeFormModal;
