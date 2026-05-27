import '../css/crmReusable.css';

const variantClassMap = {
  primary: 'crmBtnPrimary',
  outline: 'crmBtnOutline',
  pagination: 'crmBtnPagination',
  icon: 'crmBtnIcon',
};

const CrmButton = ({
  variant = 'primary',
  type = 'button',
  children,
  onClick,
  disabled = false,
  className = '',
  ariaLabel,
}) => {
  const variantClass = variantClassMap[variant] || variantClassMap.primary;

  return (
    <button
      type={type}
      className={`crmBtn ${variantClass} ${className}`.trim()}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default CrmButton;
