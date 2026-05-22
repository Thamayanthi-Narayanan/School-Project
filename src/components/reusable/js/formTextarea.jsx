import '../css/crmReusable.css';

const FormTextarea = ({
  label,
  placeholder,
  rows = 3,
  value,
  onChange,
  disabled = false,
  className = '',
}) => {
  const isControlled = value !== undefined;

  return (
    <label className={`crmFormField ${className}`.trim()}>
      <span className="crmFormLabel">{label}</span>
      <textarea
        className="crmFormTextarea"
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        {...(isControlled
          ? { value, onChange }
          : {})}
      />
    </label>
  );
};

export default FormTextarea;
