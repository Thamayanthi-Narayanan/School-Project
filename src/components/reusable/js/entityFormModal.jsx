import { createPortal } from 'react-dom';
import '../css/crmReusable.css';
import FormInput from './formInput';
import FormSelect from './formSelect';
import CrmButton from './crmButton';

const EntityFormModal = ({ isOpen, onClose, modalData, fieldOptionsMap = {} }) => {
  if (!isOpen || !modalData) return null;

  const { title, subtitle, cancelLabel, saveLabel, fields } = modalData;

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onClose();
  };

  const renderField = (field, index) => {
    if (field.type === 'select') {
      const options = fieldOptionsMap[field.id] ?? field.options ?? [];
      return (
        <FormSelect
          key={field.id}
          label={field.label}
          options={options}
          defaultValue={field.defaultValue ?? options[0]?.value}
          disabled={field.disabled || options.length === 0}
        />
      );
    }

    return (
      <FormInput
        key={field.id}
        label={field.label}
        type={field.inputType || 'text'}
        placeholder={field.placeholder}
        icon={field.icon}
        autoFocus={index === 0}
      />
    );
  };

  return createPortal(
    <div
      className="crmModalOverlay"
      role="presentation"
      onClick={handleOverlayClick}
    >
      <div
        className="crmModal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="crmModalTitle"
      >
        <header className="crmModalHeader">
          <h2 id="crmModalTitle" className="crmModalTitle">{title}</h2>
          <p className="crmModalSubtitle">{subtitle}</p>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="crmModalGrid">
            {fields.map((field, index) => renderField(field, index))}
          </div>

          <footer className="crmModalFooter">
            <CrmButton variant="outline" type="button" onClick={onClose}>
              {cancelLabel}
            </CrmButton>
            <CrmButton variant="primary" type="submit">
              {saveLabel}
            </CrmButton>
          </footer>
        </form>
      </div>
    </div>,
    document.body,
  );
};

export default EntityFormModal;
