import { FormInput, FormSelect } from '../../../components/reusable/js/index';
import { useMasterDataSelect } from '../../../hooks/useMasterDataSelect';
import { MASTER_DATA_KEYS } from '../../../utils/masterDataOptions';

const FeeHeadFormFields = ({ fields, form, errors, isSubmitting, onChange }) => {
  const { options: feeCategoryOptions, isLoading: categoryLoading } = useMasterDataSelect(
    MASTER_DATA_KEYS.feeCategory,
    { includeEmpty: true, placeholder: fields.feeCategory.placeholder, loadingLabel: 'Loading…' },
  );

  return (
    <div className="crmModalGrid feeHeadModalGrid">
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
      <FormInput
        label={fields.description.label}
        value={form.description}
        onChange={(e) => onChange('description', e.target.value)}
        placeholder={fields.description.placeholder}
        error={errors.description}
        disabled={isSubmitting}
      />
      <FormSelect
        label={fields.feeCategory.label}
        options={feeCategoryOptions}
        value={form.feeCategory}
        onChange={(e) => onChange('feeCategory', e.target.value)}
        error={errors.feeCategory}
        disabled={isSubmitting || categoryLoading}
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
        label={fields.refundable.label}
        options={fields.refundable.options}
        value={form.refundable}
        onChange={(e) => onChange('refundable', e.target.value)}
        error={errors.refundable}
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
    </div>
  );
};

export default FeeHeadFormFields;
