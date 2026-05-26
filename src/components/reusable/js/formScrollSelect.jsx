import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import '../css/crmReusable.css';
import { DashboardIcons } from '../../common/js/dashboardIcons';

export const normalizeSelectOption = (option) => {
  if (typeof option === 'string') {
    return { label: option, value: option };
  }
  return {
    label: String(option.label),
    value: String(option.value),
  };
};

const FormScrollSelect = ({
  label,
  placeholder = 'Select',
  options = [],
  defaultValue,
  value: valueProp,
  onChange,
  error,
  disabled = false,
  ariaLabel,
  variant = 'form',
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState('');
  const [menuPosition, setMenuPosition] = useState(null);
  const wrapRef = useRef(null);
  const triggerRef = useRef(null);
  const didInitRef = useRef(false);
  const listId = useId();

  const isFilter = variant === 'filter';
  const normalizedOptions = useMemo(() => {
    const mapped = options.map(normalizeSelectOption);
    const selectable = mapped.filter(
      (option) => option.value !== '' || !/loading/i.test(option.label),
    );
    return selectable.length > 0 ? selectable : mapped;
  }, [options]);

  const isControlled = valueProp !== undefined;
  const value = isControlled ? String(valueProp ?? '') : internalValue;

  useEffect(() => {
    if (isControlled || didInitRef.current || normalizedOptions.length === 0) return;
    const initial = defaultValue ?? normalizedOptions[0]?.value ?? '';
    setInternalValue(String(initial));
    didInitRef.current = true;
  }, [defaultValue, isControlled, normalizedOptions]);

  const selected = normalizedOptions.find(
    (option) => String(option.value) === String(value),
  );
  const hasValue = value !== '' && selected != null;
  const displayText = hasValue ? selected.label : placeholder;

  const updateMenuPosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const menuMaxHeight = 128;
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUpward = spaceBelow < menuMaxHeight + 12 && rect.top > menuMaxHeight + 12;

    setMenuPosition({
      left: rect.left,
      width: rect.width,
      top: openUpward ? rect.top - 4 : rect.bottom + 4,
      transform: openUpward ? 'translateY(-100%)' : 'none',
    });
  };

  useEffect(() => {
    if (!open) return undefined;

    updateMenuPosition();

    const handlePointerDown = (event) => {
      if (wrapRef.current?.contains(event.target)) return;
      const menuEl = document.getElementById(listId);
      if (menuEl?.contains(event.target)) return;
      setOpen(false);
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    const handleReposition = () => updateMenuPosition();

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);
    window.addEventListener('resize', handleReposition);
    window.addEventListener('scroll', handleReposition, true);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('resize', handleReposition);
      window.removeEventListener('scroll', handleReposition, true);
    };
  }, [open, listId]);

  const emitChange = (nextValue) => {
    if (!isControlled) {
      setInternalValue(String(nextValue));
    }
    onChange?.({ target: { value: String(nextValue) } });
  };

  const handleSelect = (nextValue) => {
    emitChange(nextValue);
    setOpen(false);
  };

  const handleToggle = () => {
    if (disabled) return;
    setOpen((isOpen) => !isOpen);
  };

  const scrollSelectClassName = [
    'crmScrollSelect',
    isFilter ? 'crmScrollSelectFilter' : '',
    open ? 'crmScrollSelectOpen' : '',
    error ? 'crmScrollSelectError' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const menu = open && menuPosition
    ? createPortal(
        <ul
          id={listId}
          className="crmScrollSelectMenu crmScrollSelectMenuPortal"
          role="listbox"
          aria-label={ariaLabel || label || placeholder}
          style={menuPosition}
        >
          {normalizedOptions.map((option) => {
            const isActive = String(option.value) === String(value);

            return (
              <li key={`${option.value}-${option.label}`} role="none">
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
        </ul>,
        document.body,
      )
    : null;

  const control = (
    <div ref={wrapRef} className={scrollSelectClassName}>
      <button
        ref={triggerRef}
        type="button"
        className="crmScrollSelectTrigger"
        disabled={disabled}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listId}
        aria-label={ariaLabel || label || placeholder}
        onClick={handleToggle}
      >
        <span
          className={`crmScrollSelectValue${hasValue ? '' : ' crmScrollSelectValuePlaceholder'}`}
        >
          {displayText}
        </span>
        <span
          className={`crmScrollSelectIcon${open ? ' crmScrollSelectIconOpen' : ''}`}
          aria-hidden="true"
        >
          {DashboardIcons.chevronDown(16)}
        </span>
      </button>
      {menu}
    </div>
  );

  if (isFilter || !label) {
    return (
      <div className={className}>
        {control}
        {error ? (
          <p className="crmFormError" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <label className={`crmFormField ${className}`.trim()}>
      <span className="crmFormLabel">{label}</span>
      {control}
      {error ? (
        <p className="crmFormError" role="alert">
          {error}
        </p>
      ) : null}
    </label>
  );
};

export default FormScrollSelect;
