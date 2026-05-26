import { createPortal } from 'react-dom';
import { CrmButton } from '../../../components/reusable/js/index';

const ScholarshipSchemeDetailModal = ({
  isOpen,
  copy,
  scheme,
  isLoading,
  loadError,
  onClose,
}) => {
  if (!isOpen) return null;

  const title = scheme?.title || copy.fallbackTitle;
  const subtitle = copy.subtitle.replace('{name}', title);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  const detailRows = scheme?.raw
    ? [
        { label: copy.fields.schemeCode, value: scheme.raw.schemeCode },
        { label: copy.fields.discountType, value: scheme.raw.discountType },
        {
          label: copy.fields.discountPercent,
          value: scheme.raw.discountPercent ?? scheme.raw.discountPercentage,
        },
        {
          label: copy.fields.discountAmount,
          value: scheme.raw.discountAmount ?? scheme.raw.fixedDiscountAmount,
        },
        { label: copy.fields.description, value: scheme.description },
      ].filter((row) => row.value != null && row.value !== '')
    : [];

  return createPortal(
    <div className="crmModalOverlay" role="presentation" onClick={handleOverlayClick}>
      <div
        className="crmModal scholarshipSchemeModal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="scholarshipSchemeDetailTitle"
      >
        <header className="crmModalHeader">
          <h2 id="scholarshipSchemeDetailTitle" className="crmModalTitle">
            {copy.title}
          </h2>
          <p className="crmModalSubtitle">{subtitle}</p>
        </header>

        <div className="crmModalBody scholarshipSchemeModalBody">
          {isLoading ? (
            <p className="scholarshipsListState">{copy.loadingMessage}</p>
          ) : null}
          {loadError ? (
            <p className="scholarshipsListError" role="alert">{loadError}</p>
          ) : null}
          {!isLoading && scheme ? (
            <>
              <div className="scholarshipSchemeModalHero">
                <h3 className="scholarshipSchemeModalName">{scheme.title}</h3>
                <span className="scholarshipsSchemeBadge">{scheme.badge}</span>
              </div>
              {scheme.description ? (
                <p className="scholarshipSchemeModalDesc">{scheme.description}</p>
              ) : null}
              {detailRows.length > 0 ? (
                <dl className="scholarshipSchemeModalDetails">
                  {detailRows.map((row) => (
                    <div key={row.label} className="scholarshipSchemeModalDetailRow">
                      <dt>{row.label}</dt>
                      <dd>{String(row.value)}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </>
          ) : null}
        </div>

        <footer className="crmModalFooter">
          <CrmButton variant="outline" type="button" onClick={onClose}>
            {copy.closeLabel}
          </CrmButton>
        </footer>
      </div>
    </div>,
    document.body,
  );
};

export default ScholarshipSchemeDetailModal;
