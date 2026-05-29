import { createPortal } from 'react-dom';
import '../css/admissionSuccessPopup.css';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';
import { CrmButton } from '../../../components/reusable/js/index';

const AdmissionSuccessPopup = ({ result, copy, onDismiss }) => {
  if (!result) return null;

  const { data, message } = result;
  const studentName = [data?.firstName, data?.lastName].filter(Boolean).join(' ');

  return createPortal(
    <div
      className="admissionSuccessOverlay"
      role="presentation"
      onClick={onDismiss}
    >
      <div
        className="admissionSuccessPopup"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="admissionSuccessTitle"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="admissionSuccessIconWrap" aria-hidden="true">
          <span className="admissionSuccessIconRing" />
          <span className="admissionSuccessIcon">{DashboardIcons.check(28)}</span>
        </div>
        <h3 id="admissionSuccessTitle" className="admissionSuccessTitle">
          {copy.title}
        </h3>
        <p className="admissionSuccessMessage">{message}</p>
        {data && (
          <div className="admissionSuccessMeta">
            {studentName && (
              <span className="admissionSuccessMetaName">{studentName}</span>
            )}
            {data.admissionNo && (
              <span className="admissionSuccessMetaBadge">{data.admissionNo}</span>
            )}
          </div>
        )}
        <CrmButton variant="primary" type="button" onClick={onDismiss}>
          {copy.dismissLabel}
        </CrmButton>
      </div>
    </div>,
    document.body,
  );
};

export default AdmissionSuccessPopup;
