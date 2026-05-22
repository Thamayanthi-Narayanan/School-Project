import { createPortal } from 'react-dom';
import { DashboardIcons } from '../../common/js/dashboardIcons';
import '../css/logoutPopup.css';

const LogoutPopup = ({ visible, title, message }) => {
  if (!visible) return null;

  return createPortal(
    <div className="logoutPopupOverlay" role="presentation">
      <div className="logoutPopup" role="status" aria-live="polite" aria-busy="true">
        <div className="logoutPopupIconWrap" aria-hidden="true">
          <span className="logoutPopupIconRing" />
          <span className="logoutPopupIcon">{DashboardIcons.logOut(18)}</span>
        </div>
        <p className="logoutPopupTitle">{title}</p>
        {message ? <p className="logoutPopupMessage">{message}</p> : null}
      </div>
    </div>,
    document.body
  );
};

export default LogoutPopup;
