import '../css/sessionExpiryBanner.css';
import { navbarMock } from '../../../data/mocks/navbar/navbar.mock';

const SessionExpiryBanner = ({ visible, onExtend }) => {
  if (!visible) return null;

  const copy = navbarMock.sessionExpiry;

  return (
    <div className="sessionExpiryBanner" role="status">
      <p className="sessionExpiryBannerText">{copy.message}</p>
      <button type="button" className="sessionExpiryBannerBtn" onClick={onExtend}>
        {copy.extendLabel}
      </button>
    </div>
  );
};

export default SessionExpiryBanner;
