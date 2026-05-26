import { FormInput, FormSelect, FormTextarea } from '../../../components/reusable/js/index';

const AdmissionFormFields = ({ fields }) => {
  if (!fields?.length) return null;

  return (
    <div className="admissionFormGrid">
      {fields.map((field, index) => {
        const fieldClass = field.fullWidth ? 'crmFormFieldFull' : '';

        if (field.type === 'select') {
          return (
            <FormSelect
              key={field.id}
              label={field.label}
              options={field.options}
              defaultValue={field.defaultValue ?? field.options[0]}
              className={fieldClass}
            />
          );
        }

        if (field.type === 'textarea') {
          return (
            <FormTextarea
              key={field.id}
              label={field.label}
              placeholder={field.placeholder}
              className={fieldClass}
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
            className={fieldClass}
          />
        );
      })}
    </div>
  );
};

export default AdmissionFormFields;
