import { createPortal } from 'react-dom';
import { CrmButton, FormInput } from '../../../components/reusable/js/index';
import { formatInrAmount } from '../../../utils/feeStructureAmounts';
import '../css/editFeeQuartersModal.css';

const EditFeeQuartersModal = ({
  isOpen,
  copy,
  categoryName,
  form,
  errors,
  isSubmitting,
  previewTotal,
  onClose,
  onChange,
  onSubmit,
}) => {
  if (!isOpen) return null;

  const { fields } = copy;
  const subtitle = copy.subtitle.replace('{name}', categoryName || copy.fallbackName);
  const totalDisplay = previewTotal > 0 ? formatInrAmount(previewTotal) : copy.emptyValueFallback;

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
      <div
        className="crmModal feeHeadModal feeQuartersEditModal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="feeQuartersEditTitle"
      >
        <header className="crmModalHeader">
          <h2 id="feeQuartersEditTitle" className="crmModalTitle">{copy.title}</h2>
          <p className="crmModalSubtitle">{subtitle}</p>
        </header>

        <form onSubmit={handleSubmit} noValidate>
          {errors.general ? (
            <p className="feeHeadModalError" role="alert">{errors.general}</p>
          ) : null}

          <div className="crmModalGrid feeQuartersEditGrid">
            <FormInput
              label={fields.q1.label}
              type="text"
              inputMode="decimal"
              value={form.q1}
              onChange={(e) => onChange('q1', e.target.value)}
              placeholder={fields.q1.placeholder}
              error={errors.q1}
              autoFocus
              disabled={isSubmitting}
            />
            <FormInput
              label={fields.q2.label}
              type="text"
              inputMode="decimal"
              value={form.q2}
              onChange={(e) => onChange('q2', e.target.value)}
              placeholder={fields.q2.placeholder}
              error={errors.q2}
              disabled={isSubmitting}
            />
            <FormInput
              label={fields.q3.label}
              type="text"
              inputMode="decimal"
              value={form.q3}
              onChange={(e) => onChange('q3', e.target.value)}
              placeholder={fields.q3.placeholder}
              error={errors.q3}
              disabled={isSubmitting}
            />
            <FormInput
              label={fields.q4.label}
              type="text"
              inputMode="decimal"
              value={form.q4}
              onChange={(e) => onChange('q4', e.target.value)}
              placeholder={fields.q4.placeholder}
              error={errors.q4}
              disabled={isSubmitting}
            />
          </div>

          <p className="feeQuartersEditTotal">
            <span>{copy.totalLabel}</span>
            <strong>{totalDisplay}</strong>
          </p>

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

export default EditFeeQuartersModal;
