import '../css/crmReusable.css';
import { DashboardIcons } from '../../common/js/dashboardIcons';

const FormSelect = ({
  label,
  options = [],
  defaultValue,
  value,
  onChange,
  error,
  disabled = false,
  ariaLabel,
  variant = 'form',
  className = '',
}) => {
  const isFilter = variant === 'filter';
  const isControlled = value !== undefined;
  const selectClassName = `${isFilter ? 'crmSelect' : 'crmFormSelect'}${error ? ' crmFormInputError' : ''}`;

  const selectEl = (
    <span className={isFilter ? 'crmSelectWrap' : 'crmFormSelectWrap'}>
      <select
        className={selectClassName}
        aria-label={ariaLabel || label}
        disabled={disabled}
        {...(isControlled
          ? { value, onChange }
          : { defaultValue: defaultValue ?? options[0] })}
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
      {error ? (
        <p className="crmFormError" role="alert">
          {error}
        </p>
      ) : null}
    </label>
  );
};

export default FormSelect;
