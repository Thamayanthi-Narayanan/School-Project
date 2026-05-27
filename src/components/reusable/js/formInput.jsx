import { useState } from 'react';
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
  const [passwordVisible, setPasswordVisible] = useState(false);
  const IconComponent = icon ? iconMap[icon] : null;
  const isPassword = type === 'password';
  const isControlled = value !== undefined;
  const inputType = isPassword && passwordVisible ? 'text' : type;
  const inputClassName = `crmFormInput${
    IconComponent || isPassword ? ' crmFormInputWithIcon' : ''
  }${error ? ' crmFormInputError' : ''}`;

  const sharedInputProps = {
    type: inputType,
    className: inputClassName,
    placeholder,
    autoFocus,
    disabled,
    ...(isControlled
      ? { value, onChange }
      : { defaultValue }),
  };

  const passwordToggle = isPassword ? (
    <button
      type="button"
      className="crmFormPasswordToggle"
      onClick={() => setPasswordVisible((visible) => !visible)}
      aria-label={passwordVisible ? 'Hide password' : 'Show password'}
      disabled={disabled}
      tabIndex={0}
    >
      {passwordVisible ? DashboardIcons.eyeOff(16) : DashboardIcons.eye(16)}
    </button>
  ) : null;

  const inputEl = IconComponent || isPassword ? (
    <span className="crmFormInputWrap">
      <input {...sharedInputProps} />
      {IconComponent ? (
        <span className="crmFormInputIcon" aria-hidden="true">
          <IconComponent size={16} />
        </span>
      ) : null}
      {passwordToggle}
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
