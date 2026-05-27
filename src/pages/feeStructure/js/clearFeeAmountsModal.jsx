import { createPortal } from 'react-dom';
import { CrmButton } from '../../../components/reusable/js/index';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';

const ClearFeeAmountsModal = ({
  isOpen,
  copy,
  categoryName,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onConfirm();
    onClose();
  };

  return createPortal(
    <div className="crmModalOverlay" role="presentation" onClick={handleOverlayClick}>
      <div
        className="crmModal feeClearAmountsModal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="feeClearAmountsTitle"
      >
        <header className="crmModalHeader feeClearAmountsModalHeader">
          <span className="feeClearAmountsModalIcon" aria-hidden>
            {DashboardIcons.feeStructureClear(22)}
          </span>
          <div>
            <h2 id="feeClearAmountsTitle" className="crmModalTitle">{copy.title}</h2>
            <p className="crmModalSubtitle">
              {copy.subtitle.replace('{name}', categoryName || copy.fallbackName)}
            </p>
          </div>
        </header>

        <form onSubmit={handleSubmit}>
          <p className="feeClearAmountsModalHint">{copy.hint}</p>
          <footer className="crmModalFooter">
            <CrmButton variant="outline" type="button" onClick={onClose}>
              {copy.cancelLabel}
            </CrmButton>
            <CrmButton variant="primary" type="submit" className="feeClearAmountsConfirmBtn">
              {copy.confirmLabel}
            </CrmButton>
          </footer>
        </form>
      </div>
    </div>,
    document.body,
  );
};

export default ClearFeeAmountsModal;
