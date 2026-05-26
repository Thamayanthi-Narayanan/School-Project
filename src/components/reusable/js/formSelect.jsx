import '../css/crmReusable.css';
import { DashboardIcons } from '../../common/js/dashboardIcons';

const FormSelect = ({
  label,
  options = [],
  defaultValue,
  ariaLabel,
  variant = 'form',
  className = '',
}) => {
  const isFilter = variant === 'filter';

  const selectEl = (
    <span className={isFilter ? 'crmSelectWrap' : 'crmFormSelectWrap'}>
      <select
        className={isFilter ? 'crmSelect' : 'crmFormSelect'}
        defaultValue={defaultValue ?? options[0]}
        aria-label={ariaLabel || label}
      >
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <span className={isFilter ? 'crmSelectIcon' : 'crmFormSelectIcon'} aria-hidden="true">
        {DashboardIcons.chevronDown(16)}
      </span>
    </span>
  );

  if (!label) return selectEl;

  return (
    <label className={`crmFormField ${className}`.trim()}>
      <span className="crmFormLabel">{label}</span>
      {selectEl}
    </label>
  );
};

export default FormSelect;
