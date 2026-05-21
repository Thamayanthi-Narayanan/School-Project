import '../css/crmReusable.css';
import { DashboardIcons } from '../../common/js/dashboardIcons';

const FormSearchBar = ({ placeholder, ariaLabel, className = '' }) => (
  <div className={`crmSearchBar ${className}`.trim()}>
    <span className="crmSearchBarIcon">{DashboardIcons.search(18)}</span>
    <input
      type="search"
      className="crmSearchBarInput"
      placeholder={placeholder}
      aria-label={ariaLabel || placeholder}
    />
  </div>
);

export default FormSearchBar;
