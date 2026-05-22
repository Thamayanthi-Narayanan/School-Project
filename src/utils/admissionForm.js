export const PROFILE_PHOTO_MAX_BYTES = 1024 * 1024;
export const PROFILE_PHOTO_ACCEPT = 'image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp';

const CLASS_LABELS = [
  'LKG',
  'UKG',
  'Class 1',
  'Class 2',
  'Class 3',
  'Class 4',
  'Class 5',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
  'Class 11',
  'Class 12',
];

export const ADMISSION_CLASSES = CLASS_LABELS.map((label, index) => ({
  id: index + 1,
  label,
}));

const formatAcademicYearLabel = (startYear) =>
  `${startYear}-${String(startYear + 1).slice(-2)}`;

export const getCurrentAcademicStartYear = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  return month >= 3 ? year : year - 1;
};

export const buildAdmissionAcademicYears = () => {
  const currentStart = getCurrentAcademicStartYear();
  const pastCount = 15;
  const futureCount = 3;
  const years = [];

  for (let offset = 0; offset <= pastCount; offset += 1) {
    const startYear = currentStart - offset;
    years.push({
      id: years.length + 1,
      label: formatAcademicYearLabel(startYear),
      startYear,
      isCurrent: offset === 0,
    });
  }

  for (let offset = 1; offset <= futureCount; offset += 1) {
    const startYear = currentStart + offset;
    years.push({
      id: years.length + 1,
      label: formatAcademicYearLabel(startYear),
      startYear,
      isCurrent: false,
    });
  }

  return years;
};

export const ADMISSION_ACADEMIC_YEARS = buildAdmissionAcademicYears();

export const GENDER_OPTIONS = ['MALE', 'FEMALE', 'OTHER'];
export const BLOOD_GROUP_OPTIONS = [
  'O_POSITIVE',
  'O_NEGATIVE',
  'A_POSITIVE',
  'A_NEGATIVE',
  'B_POSITIVE',
  'B_NEGATIVE',
  'AB_POSITIVE',
  'AB_NEGATIVE',
];
export const RELIGION_OPTIONS = ['HINDU', 'MUSLIM', 'CHRISTIAN', 'SIKH', 'BUDDHIST', 'JAIN', 'OTHER'];
export const COMMUNITY_OPTIONS = ['OC', 'BC', 'MBC', 'SC', 'ST', 'OTHER'];
export const STATUS_OPTIONS = ['ACTIVE', 'INACTIVE'];
export const PRIMARY_CONTACT_OPTIONS = ['FATHER', 'MOTHER', 'GUARDIAN'];

export const validateProfilePhoto = (file) => {
  if (!file) return null;

  const isImage =
    file.type.startsWith('image/')
    || /\.(jpe?g|png|webp)$/i.test(file.name);

  if (!isImage) {
    return 'Please upload an image file (JPG, PNG, or WEBP).';
  }

  if (file.size > PROFILE_PHOTO_MAX_BYTES) {
    return 'Photo must be below 1 MB.';
  }

  return null;
};

export const createInitialAdmissionForm = () => ({
  student: {
    admissionNo: '',
    aadharNumber: '',
    emisNumber: '',
    rationCardNumber: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    nationality: 'Indian',
    address: '',
    classId: '',
    academicYearId: '',
    bloodGroup: '',
    religion: '',
    community: '',
    annualIncome: '',
    status: 'ACTIVE',
  },
  parents: {
    fatherName: '',
    fatherPhone: '',
    fatherEmail: '',
    fatherOccupation: '',
    fatherAnnualIncome: '',
    motherName: '',
    motherPhone: '',
    motherEmail: '',
    motherOccupation: '',
    motherAnnualIncome: '',
    guardianName: '',
    guardianPhone: '',
    guardianEmail: '',
    guardianOccupation: '',
    guardianRelationship: '',
    primaryContact: 'FATHER',
  },
  documents: {
    profilePhotoUrl: '',
    profilePhotoName: '',
  },
});

export const getClassLabel = (classId) =>
  ADMISSION_CLASSES.find((item) => String(item.id) === String(classId))?.label ?? '';

export const getAcademicYearLabel = (academicYearId) =>
  ADMISSION_ACADEMIC_YEARS.find((item) => String(item.id) === String(academicYearId))?.label
  ?? '';

const toNumberOrNull = (value) => {
  if (value === '' || value == null) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const toNullableString = (value) => {
  const trimmed = String(value ?? '').trim();
  return trimmed === '' ? null : trimmed;
};

export const buildAdmissionPayload = (form) => ({
  student: {
    admissionNo: form.student.admissionNo.trim(),
    aadharNumber: form.student.aadharNumber.trim(),
    emisNumber: form.student.emisNumber.trim(),
    rationCardNumber: form.student.rationCardNumber.trim(),
    firstName: form.student.firstName.trim(),
    lastName: form.student.lastName.trim(),
    dateOfBirth: form.student.dateOfBirth,
    gender: form.student.gender,
    nationality: form.student.nationality.trim(),
    address: form.student.address.trim(),
    classId: Number(form.student.classId),
    academicYearId: Number(form.student.academicYearId),
    bloodGroup: form.student.bloodGroup,
    religion: form.student.religion,
    community: form.student.community,
    annualIncome: toNumberOrNull(form.student.annualIncome),
    status: form.student.status,
  },
  parents: {
    fatherName: form.parents.fatherName.trim(),
    fatherPhone: form.parents.fatherPhone.trim(),
    fatherEmail: form.parents.fatherEmail.trim(),
    fatherOccupation: form.parents.fatherOccupation.trim(),
    fatherAnnualIncome: toNumberOrNull(form.parents.fatherAnnualIncome),
    motherName: form.parents.motherName.trim(),
    motherPhone: form.parents.motherPhone.trim(),
    motherEmail: form.parents.motherEmail.trim(),
    motherOccupation: form.parents.motherOccupation.trim(),
    motherAnnualIncome: toNumberOrNull(form.parents.motherAnnualIncome),
    guardianName: toNullableString(form.parents.guardianName),
    guardianPhone: toNullableString(form.parents.guardianPhone),
    guardianEmail: toNullableString(form.parents.guardianEmail),
    guardianOccupation: toNullableString(form.parents.guardianOccupation),
    guardianRelationship: toNullableString(form.parents.guardianRelationship),
    primaryContact: form.parents.primaryContact,
  },
  documents: {
    profilePhotoUrl: form.documents.profilePhotoUrl.trim(),
  },
});
