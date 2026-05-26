import { createPortal } from 'react-dom';
import { CrmButton } from '../../../components/reusable/js/index';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';

const DeleteFeeHeadModal = ({
  isOpen,
  copy,
  feeHeadName,
  isDeleting,
  errorMessage,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget && !isDeleting) onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onConfirm();
  };

  return createPortal(
    <div className="crmModalOverlay" role="presentation" onClick={handleOverlayClick}>
      <div
        className="crmModal feeHeadDeleteModal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="feeHeadDeleteTitle"
      >
        <header className="crmModalHeader feeHeadDeleteModalHeader">
          <span className="feeHeadDeleteModalIcon" aria-hidden>
            {DashboardIcons.trash(20)}
          </span>
          <div>
            <h2 id="feeHeadDeleteTitle" className="crmModalTitle">{copy.title}</h2>
            <p className="crmModalSubtitle">
              {copy.subtitle.replace('{name}', feeHeadName || copy.fallbackName)}
            </p>
          </div>
        </header>

        <form onSubmit={handleSubmit}>
          {errorMessage ? (
            <p className="feeHeadModalError" role="alert">{errorMessage}</p>
          ) : null}

          <p className="feeHeadDeleteModalHint">{copy.hint}</p>

          <footer className="crmModalFooter">
            <CrmButton variant="outline" type="button" onClick={onClose} disabled={isDeleting}>
              {copy.cancelLabel}
            </CrmButton>
            <CrmButton variant="primary" type="submit" disabled={isDeleting} className="feeHeadDeleteConfirmBtn">
              {isDeleting ? copy.deletingLabel : copy.confirmLabel}
            </CrmButton>
          </footer>
        </form>
      </div>
    </div>,
    document.body,
  );
};

export default DeleteFeeHeadModal;
