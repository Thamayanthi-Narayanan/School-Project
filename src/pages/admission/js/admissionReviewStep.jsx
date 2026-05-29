import '../css/admissionReviewStep.css';
import { useMasterDataContext } from '../../../context/masterDataContext';
import {
  getClassLabel,
  getAcademicYearLabel,
} from '../../../utils/admissionForm';
import { getMasterDataLabel, MASTER_DATA_KEYS } from '../../../utils/masterDataOptions';

const formatIncome = (value, emptyValue) => {
  if (value === '' || value == null) return emptyValue;
  return `₹${Number(value).toLocaleString('en-IN')}`;
};

const ReviewBlock = ({ title, rows, emptyValue }) => (
  <div className="admissionReviewBlock">
    <h3 className="admissionReviewBlockTitle">{title}</h3>
    <dl className="admissionReviewList">
      {rows.map((row) => (
        <div key={row.label} className="admissionReviewItem">
          <dt>{row.label}</dt>
          <dd>{row.value || emptyValue}</dd>
        </div>
      ))}
    </dl>
  </div>
);

const AdmissionReviewStep = ({ subtitle, form, labels }) => {
  const { data: masterData } = useMasterDataContext();
  const { student, parents, documents } = form;
  const studentName = [student.firstName, student.lastName].filter(Boolean).join(' ');
  const emptyValue = labels.emptyValue;

  const labelOrRaw = (key, value) => {
    if (value == null || value === '') return '';
    const label = getMasterDataLabel(masterData, key, value);
    return label || String(value);
  };

  return (
    <div className="admissionReview">
      <p className="admissionReviewSubtitle">{subtitle}</p>

      <div className="admissionReviewBlocks">
        <ReviewBlock
          title={labels.studentTitle}
          emptyValue={emptyValue}
          rows={[
            { label: labels.admissionNo, value: student.admissionNo },
            { label: labels.aadharNumber, value: student.aadharNumber },
            { label: labels.emisNumber, value: student.emisNumber },
            { label: labels.rationCardNumber, value: student.rationCardNumber },
            { label: labels.studentName, value: studentName },
            { label: labels.dateOfBirth, value: student.dateOfBirth },
            { label: labels.gender, value: labelOrRaw(MASTER_DATA_KEYS.gender, student.gender) },
            { label: labels.nationality, value: student.nationality },
            { label: labels.address, value: student.address },
            {
              label: labels.classAndYear,
              value: `${getClassLabel(student.classId, masterData)} · ${getAcademicYearLabel(student.academicYearId, masterData)}`,
            },
            { label: labels.bloodGroup, value: labelOrRaw(MASTER_DATA_KEYS.bloodGroup, student.bloodGroup) },
            { label: labels.religion, value: labelOrRaw(MASTER_DATA_KEYS.religion, student.religion) },
            { label: labels.community, value: labelOrRaw(MASTER_DATA_KEYS.community, student.community) },
            { label: labels.annualIncome, value: formatIncome(student.annualIncome, emptyValue) },
          ]}
        />

        <ReviewBlock
          title={labels.parentsTitle}
          emptyValue={emptyValue}
          rows={[
            { label: labels.fatherName, value: parents.fatherName },
            { label: labels.fatherPhone, value: parents.fatherPhone },
            { label: labels.fatherEmail, value: parents.fatherEmail },
            { label: labels.fatherOccupation, value: parents.fatherOccupation },
            { label: labels.fatherAnnualIncome, value: formatIncome(parents.fatherAnnualIncome, emptyValue) },
            { label: labels.motherName, value: parents.motherName },
            { label: labels.motherPhone, value: parents.motherPhone },
            { label: labels.motherEmail, value: parents.motherEmail },
            { label: labels.motherOccupation, value: parents.motherOccupation },
            { label: labels.motherAnnualIncome, value: formatIncome(parents.motherAnnualIncome, emptyValue) },
            { label: labels.guardianName, value: parents.guardianName },
            { label: labels.guardianPhone, value: parents.guardianPhone },
            { label: labels.guardianEmail, value: parents.guardianEmail },
            { label: labels.guardianOccupation, value: parents.guardianOccupation },
            { label: labels.guardianRelationship, value: parents.guardianRelationship },
            {
              label: labels.primaryContact,
              value: labelOrRaw(MASTER_DATA_KEYS.primaryContact, parents.primaryContact),
            },
          ]}
        />

        <ReviewBlock
          title={labels.documentsTitle}
          emptyValue={emptyValue}
          rows={[
            {
              label: labels.profilePhoto,
              value: documents.profilePhotoName || (documents.profilePhotoUrl ? labels.uploadedLabel : ''),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default AdmissionReviewStep;
