import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { schoolSetupBlockerMock } from '../../../data/mocks/schoolSetup/schoolSetupBlocker.mock';
import { routePaths } from '../../../constants/routePaths';
import { USER_ROLES } from '../../../constants/userRoles';
import { useAuthRole } from '../../../hooks/useAuthRole';
import { isSchoolSetupComplete } from '../../../services/schoolSetupStorage';
import { CrmButton } from '../../reusable/js/index';
import '../css/schoolSetupBlocker.css';
import '../../reusable/css/crmReusable.css';

const SchoolSetupBlocker = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useAuthRole();
  const [setupComplete, setSetupComplete] = useState(() => isSchoolSetupComplete());

  const isOwner = role === USER_ROLES.OWNER;
  const isSetupRoute = location.pathname === routePaths.schoolSetup;
  const shouldBlock = isOwner && !setupComplete && !isSetupRoute;

  useEffect(() => {
    const syncSetupState = () => {
      setSetupComplete(isSchoolSetupComplete());
    };

    syncSetupState();
    window.addEventListener('storage', syncSetupState);
    window.addEventListener('school-setup-complete', syncSetupState);

    return () => {
      window.removeEventListener('storage', syncSetupState);
      window.removeEventListener('school-setup-complete', syncSetupState);
    };
  }, [location.pathname]);

  if (!shouldBlock) {
    return null;
  }

  const handleBeginSetup = () => {
    navigate(routePaths.schoolSetup);
  };

  return (
    <div className="schoolSetupBlocker" role="dialog" aria-modal="true" aria-labelledby="schoolSetupBlockerTitle">
      <div className="schoolSetupBlockerCard">
        <h1 id="schoolSetupBlockerTitle" className="schoolSetupBlockerTitle">
          {schoolSetupBlockerMock.title}
        </h1>
        <p className="schoolSetupBlockerMessage">{schoolSetupBlockerMock.message}</p>
        <CrmButton
          variant="primary"
          type="button"
          onClick={handleBeginSetup}
          aria-label={schoolSetupBlockerMock.beginAriaLabel}
        >
          {schoolSetupBlockerMock.beginLabel}
        </CrmButton>
      </div>
    </div>
  );
};

export default SchoolSetupBlocker;
