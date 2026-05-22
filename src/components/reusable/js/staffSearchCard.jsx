import '../css/crmReusable.css';
import FormSearchBar from './formSearchBar';

const StaffSearchCard = ({ placeholder, ariaLabel, value, onChange }) => (
  <div className="crmSearchCard crmSectionAnimate crmSectionDelay1">
    <FormSearchBar
      placeholder={placeholder}
      ariaLabel={ariaLabel}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default StaffSearchCard;
