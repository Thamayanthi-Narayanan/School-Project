import '../css/admissionPage.css';
import {
  getClassLabel,
  getAcademicYearLabel,
} from '../../../utils/admissionForm';

const formatIncome = (value) => {
  if (value === '' || value == null) return '—';
  return `₹${Number(value).toLocaleString('en-IN')}`;
};

const ReviewBlock = ({ title, rows }) => (
  <div className="admissionReviewBlock">
    <h3 className="admissionReviewBlockTitle">{title}</h3>
    <dl className="admissionReviewList">
      {rows.map((row) => (
        <div key={row.label} className="admissionReviewItem">
          <dt>{row.label}</dt>
          <dd>{row.value || '—'}</dd>
        </div>
      ))}
    </dl>
  </div>
);

const AdmissionReviewStep = ({ subtitle, form, labels }) => {
  const { student, parents, documents } = form;
  const studentName = [student.firstName, student.lastName].filter(Boolean).join(' ');

  return (
    <div className="admissionReview">
      <p className="admissionReviewSubtitle">{subtitle}</p>

      <div className="admissionReviewBlocks">
        <ReviewBlock
          title={labels.studentTitle}
          rows={[
            { label: labels.admissionNo, value: student.admissionNo },
            { label: labels.aadharNumber, value: student.aadharNumber },
            { label: labels.emisNumber, value: student.emisNumber },
            { label: labels.rationCardNumber, value: student.rationCardNumber },
            { label: labels.studentName, value: studentName },
            { label: labels.dateOfBirth, value: student.dateOfBirth },
            { label: labels.gender, value: student.gender },
            { label: labels.nationality, value: student.nationality },
            { label: labels.address, value: student.address },
            {
              label: labels.classAndYear,
              value: `${getClassLabel(student.classId)} · ${getAcademicYearLabel(student.academicYearId)}`,
            },
            { label: labels.bloodGroup, value: student.bloodGroup },
            { label: labels.religion, value: student.religion },
            { label: labels.community, value: student.community },
            { label: labels.annualIncome, value: formatIncome(student.annualIncome) },
            { label: labels.status, value: student.status },
          ]}
        />

        <ReviewBlock
          title={labels.parentsTitle}
          rows={[
            { label: labels.fatherName, value: parents.fatherName },
            { label: labels.fatherPhone, value: parents.fatherPhone },
            { label: labels.fatherEmail, value: parents.fatherEmail },
            { label: labels.fatherOccupation, value: parents.fatherOccupation },
            { label: labels.fatherAnnualIncome, value: formatIncome(parents.fatherAnnualIncome) },
            { label: labels.motherName, value: parents.motherName },
            { label: labels.motherPhone, value: parents.motherPhone },
            { label: labels.motherEmail, value: parents.motherEmail },
            { label: labels.motherOccupation, value: parents.motherOccupation },
            { label: labels.motherAnnualIncome, value: formatIncome(parents.motherAnnualIncome) },
            { label: labels.guardianName, value: parents.guardianName },
            { label: labels.guardianPhone, value: parents.guardianPhone },
            { label: labels.guardianEmail, value: parents.guardianEmail },
            { label: labels.guardianOccupation, value: parents.guardianOccupation },
            { label: labels.guardianRelationship, value: parents.guardianRelationship },
            { label: labels.primaryContact, value: parents.primaryContact },
          ]}
        />

        <ReviewBlock
          title={labels.documentsTitle}
          rows={[
            {
              label: labels.profilePhoto,
              value: documents.profilePhotoName || (documents.profilePhotoUrl ? 'Uploaded' : ''),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default AdmissionReviewStep;
