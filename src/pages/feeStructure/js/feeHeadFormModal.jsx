import { createPortal } from 'react-dom';
import { CrmButton } from '../../../components/reusable/js/index';
import FeeHeadFormFields from './feeHeadFormFields';

const FeeHeadFormModal = ({
  isOpen,
  copy,
  form,
  errors,
  isSubmitting,
  titleId,
  entityName,
  onClose,
  onChange,
  onSubmit,
}) => {
  if (!isOpen) return null;

  const subtitle = copy.subtitle?.includes('{name}')
    ? copy.subtitle.replace('{name}', entityName || copy.fallbackName || '')
    : copy.subtitle;

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isSuccess = await onSubmit();
    if (isSuccess) onClose();
  };

  return createPortal(
    <div className="crmModalOverlay" role="presentation" onClick={handleOverlayClick}>
      <div className="crmModal feeHeadModal feeHeadModalCompact" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <header className="crmModalHeader">
          <h2 id={titleId} className="crmModalTitle">{copy.title}</h2>
          <p className="crmModalSubtitle">{subtitle}</p>
        </header>

        <form onSubmit={handleSubmit} noValidate>
          {errors.general ? (
            <p className="feeHeadModalError" role="alert">{errors.general}</p>
          ) : null}

          <FeeHeadFormFields
            fields={copy.fields}
            form={form}
            errors={errors}
            isSubmitting={isSubmitting}
            onChange={onChange}
          />

          <footer className="crmModalFooter">
            <CrmButton variant="outline" type="button" onClick={onClose} disabled={isSubmitting}>
              {copy.cancelLabel}
            </CrmButton>
            <CrmButton variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? copy.submittingLabel : copy.submitLabel}
            </CrmButton>
          </footer>
        </form>
      </div>
    </div>,
    document.body,
  );
};

export default FeeHeadFormModal;
