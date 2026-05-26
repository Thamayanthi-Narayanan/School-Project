import '../css/crmReusable.css';
import { DashboardIcons } from '../../common/js/dashboardIcons';

const iconMap = {
  calendar: DashboardIcons.calendar,
};

const FormInput = ({
  label,
  type = 'text',
  placeholder,
  defaultValue,
  icon,
  autoFocus = false,
  className = '',
}) => {
  const IconComponent = icon ? iconMap[icon] : null;

  const inputEl = IconComponent ? (
    <span className="crmFormInputWrap">
      <input
        type={type}
        className="crmFormInput crmFormInputWithIcon"
        placeholder={placeholder}
        defaultValue={defaultValue}
        autoFocus={autoFocus}
      />
      <span className="crmFormInputIcon" aria-hidden="true">
        <IconComponent size={16} />
      </span>
    </span>
  ) : (
    <input
      type={type}
      className="crmFormInput"
      placeholder={placeholder}
      defaultValue={defaultValue}
      autoFocus={autoFocus}
    />
  );

  return (
    <label className={`crmFormField ${className}`.trim()}>
      <span className="crmFormLabel">{label}</span>
      {inputEl}
    </label>
  );
};

export default FormInput;
