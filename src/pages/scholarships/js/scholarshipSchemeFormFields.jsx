import { FormInput, FormSelect } from '../../../components/reusable/js/index';
import { APPLICABLE_TO } from '../../../utils/scholarshipSchemeFormUtils';
import '../css/scholarshipSchemeFormFields.css';

const ScholarshipSchemeFormFields = ({
  fields,
  form,
  errors,
  isSubmitting,
  onChange,
  schemeTypeOptions,
  schemeTypeLoading,
  discountTypeOptions,
  discountTypeLoading,
  applicableToOptions,
  applicableToLoading,
  academicYearOptions,
  academicYearLoading,
  feeHeadOptions,
  feeHeadLoading,
}) => {
  const showFeeHead = form.applicableTo === APPLICABLE_TO.specificHead;

  return (
    <div className="crmModalGrid scholarshipSchemeModalGrid">
      <FormInput
        label={fields.schemeName.label}
        value={form.schemeName}
        onChange={(e) => onChange('schemeName', e.target.value)}
        placeholder={fields.schemeName.placeholder}
        error={errors.schemeName}
        autoFocus
        disabled={isSubmitting}
        className="crmFormFieldFull"
      />
      <FormSelect
        label={fields.schemeType.label}
        options={schemeTypeOptions}
        value={form.schemeType}
        onChange={(e) => onChange('schemeType', e.target.value)}
        error={errors.schemeType}
        disabled={isSubmitting || schemeTypeLoading}
        placeholder={fields.schemeType.placeholder}
      />
      <FormSelect
        label={fields.discountType.label}
        options={discountTypeOptions}
        value={form.discountType}
        onChange={(e) => onChange('discountType', e.target.value)}
        error={errors.discountType}
        disabled={isSubmitting || discountTypeLoading}
        placeholder={fields.discountType.placeholder}
      />
      <FormSelect
        label={fields.academicYearId.label}
        options={academicYearOptions}
        value={form.academicYearId}
        onChange={(e) => onChange('academicYearId', e.target.value)}
        error={errors.academicYearId}
        disabled={isSubmitting || academicYearLoading}
        placeholder={fields.academicYearId.placeholder}
      />
      <FormInput
        label={fields.discountValue.label}
        type="text"
        inputMode="decimal"
        value={form.discountValue}
        onChange={(e) => onChange('discountValue', e.target.value)}
        placeholder={
          form.discountType === 'FIXED'
            ? fields.discountValue.placeholderFixed
            : fields.discountValue.placeholderPercent
        }
        error={errors.discountValue}
        disabled={isSubmitting}
      />
      <FormSelect
        label={fields.applicableTo.label}
        options={applicableToOptions}
        value={form.applicableTo}
        onChange={(e) => onChange('applicableTo', e.target.value)}
        error={errors.applicableTo}
        disabled={isSubmitting || applicableToLoading}
        placeholder={fields.applicableTo.placeholder}
      />
      {showFeeHead ? (
        <FormSelect
          label={fields.feeHeadId.label}
          options={feeHeadOptions}
          value={form.feeHeadId}
          onChange={(e) => onChange('feeHeadId', e.target.value)}
          error={errors.feeHeadId}
          disabled={isSubmitting || feeHeadLoading}
          placeholder={fields.feeHeadId.placeholder}
        />
      ) : null}
      <FormSelect
        label={fields.isActive.label}
        options={fields.isActive.options}
        value={form.isActive}
        onChange={(e) => onChange('isActive', e.target.value)}
        error={errors.isActive}
        disabled={isSubmitting}
      />
    </div>
  );
};

export default ScholarshipSchemeFormFields;
