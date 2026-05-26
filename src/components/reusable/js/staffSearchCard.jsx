import '../css/crmReusable.css';
import FormSearchBar from './formSearchBar';

const StaffSearchCard = ({ placeholder, ariaLabel }) => (
  <div className="crmSearchCard crmSectionAnimate crmSectionDelay1">
    <FormSearchBar placeholder={placeholder} ariaLabel={ariaLabel} />
  </div>
);

export default StaffSearchCard;
