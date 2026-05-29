import { FormInput, FormSelect } from '../../../components/reusable/js/index';
import '../css/admissionParentsStep.css';
import { useMasterDataSelect } from '../../../hooks/useMasterDataSelect';
import { MASTER_DATA_KEYS } from '../../../utils/masterDataOptions';

const AdmissionParentsStep = ({ parents, fields, errors = {}, onChange }) => {
  const loadingLabel = fields.loadingLabel;
  const { options: primaryContactOptions, isLoading: contactLoading } = useMasterDataSelect(
    MASTER_DATA_KEYS.primaryContact,
    { loadingLabel },
  );

  return (
  <div className="admissionFormSections">
    <section className="admissionFormSection">
      <h3 className="admissionFormSectionTitle">{fields.fatherTitle}</h3>
      <div className="admissionFormGrid">
        <FormInput
          label={fields.fatherName.label}
          placeholder={fields.fatherName.placeholder}
          value={parents.fatherName}
          onChange={(e) => onChange('fatherName', e.target.value)}
          error={errors.fatherName}
        />
        <FormInput
          label={fields.fatherPhone.label}
          type="tel"
          placeholder={fields.fatherPhone.placeholder}
          value={parents.fatherPhone}
          onChange={(e) => onChange('fatherPhone', e.target.value)}
          error={errors.fatherPhone}
        />
        <FormInput
          label={fields.fatherEmail.label}
          type="email"
          placeholder={fields.fatherEmail.placeholder}
          value={parents.fatherEmail}
          onChange={(e) => onChange('fatherEmail', e.target.value)}
          error={errors.fatherEmail}
        />
        <FormInput
          label={fields.fatherOccupation.label}
          placeholder={fields.fatherOccupation.placeholder}
          value={parents.fatherOccupation}
          onChange={(e) => onChange('fatherOccupation', e.target.value)}
          error={errors.fatherOccupation}
        />
        <FormInput
          label={fields.fatherAnnualIncome.label}
          type="number"
          placeholder={fields.fatherAnnualIncome.placeholder}
          value={parents.fatherAnnualIncome}
          onChange={(e) => onChange('fatherAnnualIncome', e.target.value)}
          error={errors.fatherAnnualIncome}
          className="crmFormFieldFull"
        />
      </div>
    </section>

    <section className="admissionFormSection">
      <h3 className="admissionFormSectionTitle">{fields.motherTitle}</h3>
      <div className="admissionFormGrid">
        <FormInput
          label={fields.motherName.label}
          placeholder={fields.motherName.placeholder}
          value={parents.motherName}
          onChange={(e) => onChange('motherName', e.target.value)}
          error={errors.motherName}
        />
        <FormInput
          label={fields.motherPhone.label}
          type="tel"
          placeholder={fields.motherPhone.placeholder}
          value={parents.motherPhone}
          onChange={(e) => onChange('motherPhone', e.target.value)}
          error={errors.motherPhone}
        />
        <FormInput
          label={fields.motherEmail.label}
          type="email"
          placeholder={fields.motherEmail.placeholder}
          value={parents.motherEmail}
          onChange={(e) => onChange('motherEmail', e.target.value)}
          error={errors.motherEmail}
        />
        <FormInput
          label={fields.motherOccupation.label}
          placeholder={fields.motherOccupation.placeholder}
          value={parents.motherOccupation}
          onChange={(e) => onChange('motherOccupation', e.target.value)}
          error={errors.motherOccupation}
        />
        <FormInput
          label={fields.motherAnnualIncome.label}
          type="number"
          placeholder={fields.motherAnnualIncome.placeholder}
          value={parents.motherAnnualIncome}
          onChange={(e) => onChange('motherAnnualIncome', e.target.value)}
          error={errors.motherAnnualIncome}
          className="crmFormFieldFull"
        />
      </div>
    </section>

    <section className="admissionFormSection">
      <h3 className="admissionFormSectionTitle">{fields.guardianTitle}</h3>
      <p className="admissionFormSectionHint">{fields.guardianHint}</p>
      <div className="admissionFormGrid">
        <FormInput
          label={fields.guardianName.label}
          placeholder={fields.guardianName.placeholder}
          value={parents.guardianName}
          onChange={(e) => onChange('guardianName', e.target.value)}
          error={errors.guardianName}
        />
        <FormInput
          label={fields.guardianPhone.label}
          type="tel"
          placeholder={fields.guardianPhone.placeholder}
          value={parents.guardianPhone}
          onChange={(e) => onChange('guardianPhone', e.target.value)}
          error={errors.guardianPhone}
        />
        <FormInput
          label={fields.guardianEmail.label}
          type="email"
          placeholder={fields.guardianEmail.placeholder}
          value={parents.guardianEmail}
          onChange={(e) => onChange('guardianEmail', e.target.value)}
          error={errors.guardianEmail}
        />
        <FormInput
          label={fields.guardianOccupation.label}
          placeholder={fields.guardianOccupation.placeholder}
          value={parents.guardianOccupation}
          onChange={(e) => onChange('guardianOccupation', e.target.value)}
          error={errors.guardianOccupation}
        />
        <FormInput
          label={fields.guardianRelationship.label}
          placeholder={fields.guardianRelationship.placeholder}
          value={parents.guardianRelationship}
          onChange={(e) => onChange('guardianRelationship', e.target.value)}
          error={errors.guardianRelationship}
          className="crmFormFieldFull"
        />
      </div>
    </section>

    <section className="admissionFormSection">
      <h3 className="admissionFormSectionTitle">{fields.contactTitle}</h3>
      <div className="admissionFormGrid">
        <FormSelect
          label={fields.primaryContact.label}
          options={primaryContactOptions}
          value={parents.primaryContact}
          onChange={(e) => onChange('primaryContact', e.target.value)}
          error={errors.primaryContact}
          className="crmFormFieldFull"
          disabled={contactLoading}
        />
      </div>
    </section>
  </div>
  );
};

export default AdmissionParentsStep;
