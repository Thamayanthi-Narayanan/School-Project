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
  value,
  onChange,
  error,
  disabled = false,
  icon,
  autoFocus = false,
  className = '',
}) => {
  const IconComponent = icon ? iconMap[icon] : null;
  const isControlled = value !== undefined;
  const inputClassName = `crmFormInput${IconComponent ? ' crmFormInputWithIcon' : ''}${
    error ? ' crmFormInputError' : ''
  }`;

  const sharedInputProps = {
    type,
    className: inputClassName,
    placeholder,
    autoFocus,
    disabled,
    ...(isControlled
      ? { value, onChange }
      : { defaultValue }),
  };

  const inputEl = IconComponent ? (
    <span className="crmFormInputWrap">
      <input {...sharedInputProps} />
      <span className="crmFormInputIcon" aria-hidden="true">
        <IconComponent size={16} />
      </span>
    </span>
  ) : (
    <input {...sharedInputProps} />
  );

  return (
    <label className={`crmFormField ${className}`.trim()}>
      <span className="crmFormLabel">{label}</span>
      {inputEl}
      {error ? (
        <p className="crmFormError" role="alert">
          {error}
        </p>
      ) : null}
    </label>
  );
};

export default FormInput;
