import { FormInput, FormSelect, FormTextarea } from '../../../components/reusable/js/index';
import { useMasterDataContext } from '../../../context/masterDataContext';
import { useMasterDataSelect } from '../../../hooks/useMasterDataSelect';
import {
  getClassLabel,
  getAcademicYearLabel,
} from '../../../utils/admissionForm';
import { MASTER_DATA_KEYS } from '../../../utils/masterDataOptions';

const AdmissionStudentStep = ({ student, fields, errors = {}, onChange }) => {
  const { data: masterData } = useMasterDataContext();

  const { options: genderOptions, isLoading: genderLoading } = useMasterDataSelect(
    MASTER_DATA_KEYS.gender,
    { includeEmpty: true, loadingLabel: 'Loading…' },
  );
  const { options: bloodGroupOptions, isLoading: bloodLoading } = useMasterDataSelect(
    MASTER_DATA_KEYS.bloodGroup,
    { includeEmpty: true, loadingLabel: 'Loading…' },
  );
  const { options: religionOptions, isLoading: religionLoading } = useMasterDataSelect(
    MASTER_DATA_KEYS.religion,
    { includeEmpty: true, loadingLabel: 'Loading…' },
  );
  const { options: communityOptions, isLoading: communityLoading } = useMasterDataSelect(
    MASTER_DATA_KEYS.community,
    { includeEmpty: true, loadingLabel: 'Loading…' },
  );

  return (
    <div className="admissionFormSections">
      <div className="admissionSetupSummary">
        <span className="admissionSetupSummaryLabel">{fields.setupSummaryLabel}</span>
        <span className="admissionSetupSummaryValue">
          {getClassLabel(student.classId, masterData)}
          {' · '}
          {getAcademicYearLabel(student.academicYearId, masterData)}
        </span>
      </div>

      <section className="admissionFormSection">
        <h3 className="admissionFormSectionTitle">{fields.identificationTitle}</h3>
        <div className="admissionFormGrid">
          <FormInput
            label={fields.admissionNo.label}
            placeholder={fields.admissionNo.placeholder}
            value={student.admissionNo}
            onChange={(e) => onChange('admissionNo', e.target.value)}
            error={errors.admissionNo}
          />
          <FormInput
            label={fields.aadharNumber.label}
            placeholder={fields.aadharNumber.placeholder}
            value={student.aadharNumber}
            onChange={(e) => onChange('aadharNumber', e.target.value)}
            error={errors.aadharNumber}
          />
          <FormInput
            label={fields.emisNumber.label}
            placeholder={fields.emisNumber.placeholder}
            value={student.emisNumber}
            onChange={(e) => onChange('emisNumber', e.target.value)}
            error={errors.emisNumber}
          />
          <FormInput
            label={fields.rationCardNumber.label}
            placeholder={fields.rationCardNumber.placeholder}
            value={student.rationCardNumber}
            onChange={(e) => onChange('rationCardNumber', e.target.value)}
            error={errors.rationCardNumber}
          />
        </div>
      </section>

      <section className="admissionFormSection">
        <h3 className="admissionFormSectionTitle">{fields.personalTitle}</h3>
        <div className="admissionFormGrid">
          <FormInput
            label={fields.firstName.label}
            placeholder={fields.firstName.placeholder}
            value={student.firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
            error={errors.firstName}
            autoFocus
          />
          <FormInput
            label={fields.lastName.label}
            placeholder={fields.lastName.placeholder}
            value={student.lastName}
            onChange={(e) => onChange('lastName', e.target.value)}
            error={errors.lastName}
          />
          <FormInput
            label={fields.dateOfBirth.label}
            type="date"
            value={student.dateOfBirth}
            onChange={(e) => onChange('dateOfBirth', e.target.value)}
            error={errors.dateOfBirth}
          />
          <FormSelect
            label={fields.gender.label}
            options={genderOptions}
            value={student.gender}
            onChange={(e) => onChange('gender', e.target.value)}
            error={errors.gender}
            disabled={genderLoading}
          />
          <FormInput
            label={fields.nationality.label}
            placeholder={fields.nationality.placeholder}
            value={student.nationality}
            onChange={(e) => onChange('nationality', e.target.value)}
            error={errors.nationality}
          />
          <FormSelect
            label={fields.bloodGroup.label}
            options={bloodGroupOptions}
            value={student.bloodGroup}
            onChange={(e) => onChange('bloodGroup', e.target.value)}
            error={errors.bloodGroup}
            disabled={bloodLoading}
          />
          <FormSelect
            label={fields.religion.label}
            options={religionOptions}
            value={student.religion}
            onChange={(e) => onChange('religion', e.target.value)}
            error={errors.religion}
            disabled={religionLoading}
          />
          <FormSelect
            label={fields.community.label}
            options={communityOptions}
            value={student.community}
            onChange={(e) => onChange('community', e.target.value)}
            error={errors.community}
            disabled={communityLoading}
          />
          <FormInput
            label={fields.annualIncome.label}
            type="number"
            placeholder={fields.annualIncome.placeholder}
            value={student.annualIncome}
            onChange={(e) => onChange('annualIncome', e.target.value)}
            error={errors.annualIncome}
          />
          <FormTextarea
            label={fields.address.label}
            placeholder={fields.address.placeholder}
            value={student.address}
            onChange={(e) => onChange('address', e.target.value)}
            error={errors.address}
            className="crmFormFieldFull"
            rows={3}
          />
        </div>
      </section>
    </div>
  );
};

export default AdmissionStudentStep;
