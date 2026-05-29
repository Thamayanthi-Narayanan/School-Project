import '../css/crmReusable.css';
import '../css/formSearchBar.css';
import { DashboardIcons } from '../../common/js/dashboardIcons';

const FormSearchBar = ({
  placeholder,
  ariaLabel,
  className = '',
  value,
  onChange,
}) => (
  <div className={`crmSearchBar ${className}`.trim()}>
    <span className="crmSearchBarIcon">{DashboardIcons.search(18)}</span>
    <input
      type="search"
      className="crmSearchBarInput"
      placeholder={placeholder}
      aria-label={ariaLabel || placeholder}
      {...(value !== undefined ? { value, onChange } : {})}
    />
  </div>
);

export default FormSearchBar;
