import { FormInput, FormSelect, FormTextarea } from '../../../components/reusable/js/index';
import '../css/feeHeadFormFields.css';

const FeeHeadFormFields = ({ fields, form, errors, isSubmitting, onChange, variant = 'modal' }) => (
  <div className={`crmModalGrid feeHeadModalGrid${variant === 'inline' ? ' feeHeadInlineGrid' : ''}`}>
    <FormInput
      label={fields.feeHeadCode.label}
      value={form.feeHeadCode}
      onChange={(e) => onChange('feeHeadCode', e.target.value)}
      placeholder={fields.feeHeadCode.placeholder}
      error={errors.feeHeadCode}
      autoFocus
      disabled={isSubmitting}
    />
    <FormInput
      label={fields.feeHeadName.label}
      value={form.feeHeadName}
      onChange={(e) => onChange('feeHeadName', e.target.value)}
      placeholder={fields.feeHeadName.placeholder}
      error={errors.feeHeadName}
      disabled={isSubmitting}
    />
    <FormSelect
      label={fields.mandatory.label}
      options={fields.mandatory.options}
      value={form.mandatory}
      onChange={(e) => onChange('mandatory', e.target.value)}
      error={errors.mandatory}
      disabled={isSubmitting}
    />
    <FormSelect
      label={fields.active.label}
      options={fields.active.options}
      value={form.active}
      onChange={(e) => onChange('active', e.target.value)}
      error={errors.active}
      disabled={isSubmitting}
    />
    <FormInput
      label={fields.displayOrder.label}
      value={form.displayOrder}
      onChange={(e) => onChange('displayOrder', e.target.value)}
      placeholder={fields.displayOrder.placeholder}
      error={errors.displayOrder}
      disabled={isSubmitting}
    />
    <FormTextarea
      label={fields.description.label}
      value={form.description}
      onChange={(e) => onChange('description', e.target.value)}
      placeholder={fields.description.placeholder}
      error={errors.description}
      disabled={isSubmitting}
      className="crmFormFieldFull feeHeadDescriptionField"
      rows={variant === 'inline' ? 3 : 3}
    />
  </div>
);

export default FeeHeadFormFields;
