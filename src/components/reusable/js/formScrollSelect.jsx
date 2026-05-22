import { useEffect, useId, useRef, useState } from 'react';
import '../css/crmReusable.css';
import { DashboardIcons } from '../../common/js/dashboardIcons';

const FormScrollSelect = ({
  label,
  placeholder = 'Select',
  options = [],
  value = '',
  onChange,
  error,
  disabled = false,
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const listId = useId();

  const selected = options.find((option) => String(option.value) === String(value));
  const displayText = selected?.label ?? placeholder;
  const hasValue = Boolean(selected);

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  const handleSelect = (nextValue) => {
    onChange?.(nextValue);
    setOpen(false);
  };

  return (
    <label className={`crmFormField ${className}`.trim()}>
      <span className="crmFormLabel">{label}</span>
      <div
        ref={wrapRef}
        className={`crmScrollSelect${open ? ' crmScrollSelectOpen' : ''}${error ? ' crmScrollSelectError' : ''}`}
      >
        <button
          type="button"
          className="crmScrollSelectTrigger"
          disabled={disabled}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={listId}
          onClick={() => setOpen((isOpen) => !isOpen)}
        >
          <span
            className={`crmScrollSelectValue${hasValue ? '' : ' crmScrollSelectValuePlaceholder'}`}
          >
            {displayText}
          </span>
          <span className={`crmScrollSelectIcon${open ? ' crmScrollSelectIconOpen' : ''}`} aria-hidden="true">
            {DashboardIcons.chevronDown(16)}
          </span>
        </button>

        {open && (
          <ul id={listId} className="crmScrollSelectMenu" role="listbox" aria-label={label}>
            {options.map((option) => {
              const isActive = String(option.value) === String(value);

              return (
                <li key={option.value} role="none">
                  <button
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    className={`crmScrollSelectOption${isActive ? ' crmScrollSelectOptionActive' : ''}`}
                    onClick={() => handleSelect(option.value)}
                  >
                    {option.label}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {error ? (
        <p className="crmFormError" role="alert">
          {error}
        </p>
      ) : null}
    </label>
  );
};

export default FormScrollSelect;
