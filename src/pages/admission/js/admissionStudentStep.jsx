import { FormInput, FormSelect, FormTextarea } from '../../../components/reusable/js/index';
import {
  GENDER_OPTIONS,
  BLOOD_GROUP_OPTIONS,
  RELIGION_OPTIONS,
  COMMUNITY_OPTIONS,
  STATUS_OPTIONS,
  getClassLabel,
  getAcademicYearLabel,
} from '../../../utils/admissionForm';

const AdmissionStudentStep = ({ student, fields, onChange }) => (
  <div className="admissionFormSections">
    <div className="admissionSetupSummary">
      <span className="admissionSetupSummaryLabel">{fields.setupSummaryLabel}</span>
      <span className="admissionSetupSummaryValue">
        {getClassLabel(student.classId)}
        {' · '}
        {getAcademicYearLabel(student.academicYearId)}
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
        />
        <FormInput
          label={fields.aadharNumber.label}
          placeholder={fields.aadharNumber.placeholder}
          value={student.aadharNumber}
          onChange={(e) => onChange('aadharNumber', e.target.value)}
        />
        <FormInput
          label={fields.emisNumber.label}
          placeholder={fields.emisNumber.placeholder}
          value={student.emisNumber}
          onChange={(e) => onChange('emisNumber', e.target.value)}
        />
        <FormInput
          label={fields.rationCardNumber.label}
          placeholder={fields.rationCardNumber.placeholder}
          value={student.rationCardNumber}
          onChange={(e) => onChange('rationCardNumber', e.target.value)}
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
          autoFocus
        />
        <FormInput
          label={fields.lastName.label}
          placeholder={fields.lastName.placeholder}
          value={student.lastName}
          onChange={(e) => onChange('lastName', e.target.value)}
        />
        <FormInput
          label={fields.dateOfBirth.label}
          type="date"
          value={student.dateOfBirth}
          onChange={(e) => onChange('dateOfBirth', e.target.value)}
        />
        <FormSelect
          label={fields.gender.label}
          options={['', ...GENDER_OPTIONS]}
          value={student.gender}
          onChange={(e) => onChange('gender', e.target.value)}
        />
        <FormInput
          label={fields.nationality.label}
          placeholder={fields.nationality.placeholder}
          value={student.nationality}
          onChange={(e) => onChange('nationality', e.target.value)}
        />
        <FormSelect
          label={fields.bloodGroup.label}
          options={['', ...BLOOD_GROUP_OPTIONS]}
          value={student.bloodGroup}
          onChange={(e) => onChange('bloodGroup', e.target.value)}
        />
        <FormSelect
          label={fields.religion.label}
          options={['', ...RELIGION_OPTIONS]}
          value={student.religion}
          onChange={(e) => onChange('religion', e.target.value)}
        />
        <FormSelect
          label={fields.community.label}
          options={['', ...COMMUNITY_OPTIONS]}
          value={student.community}
          onChange={(e) => onChange('community', e.target.value)}
        />
        <FormInput
          label={fields.annualIncome.label}
          type="number"
          placeholder={fields.annualIncome.placeholder}
          value={student.annualIncome}
          onChange={(e) => onChange('annualIncome', e.target.value)}
        />
        <FormSelect
          label={fields.status.label}
          options={STATUS_OPTIONS}
          value={student.status}
          onChange={(e) => onChange('status', e.target.value)}
        />
        <FormTextarea
          label={fields.address.label}
          placeholder={fields.address.placeholder}
          value={student.address}
          onChange={(e) => onChange('address', e.target.value)}
          className="crmFormFieldFull"
          rows={3}
        />
      </div>
    </section>
  </div>
);

export default AdmissionStudentStep;
