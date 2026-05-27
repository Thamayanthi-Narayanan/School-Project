import '../css/crmReusable.css';

const FormTextarea = ({
  label,
  placeholder,
  rows = 3,
  value,
  onChange,
  disabled = false,
  error,
  className = '',
}) => {
  const isControlled = value !== undefined;

  return (
    <label className={`crmFormField ${className}`.trim()}>
      <span className="crmFormLabel">{label}</span>
      <textarea
        className={`crmFormTextarea${error ? ' crmFormInputError' : ''}`}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        {...(isControlled
          ? { value, onChange }
          : {})}
      />
      {error ? (
        <p className="crmFormError" role="alert">
          {error}
        </p>
      ) : null}
    </label>
  );
};

export default FormTextarea;
