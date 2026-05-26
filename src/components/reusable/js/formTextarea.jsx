import '../css/crmReusable.css';

const FormTextarea = ({
  label,
  placeholder,
  rows = 3,
  className = '',
}) => (
  <label className={`crmFormField ${className}`.trim()}>
    <span className="crmFormLabel">{label}</span>
    <textarea
      className="crmFormTextarea"
      placeholder={placeholder}
      rows={rows}
    />
  </label>
);

export default FormTextarea;
