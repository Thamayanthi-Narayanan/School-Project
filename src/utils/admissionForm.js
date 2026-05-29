import { isValidEmail } from './loginIdentifier';
import { getMasterDataLabelById, MASTER_DATA_KEYS } from './masterDataOptions';

/** Until class_master IDs are wired, API always receives classId 1. */
export const TEMP_API_CLASS_ID = 1;

export const PROFILE_PHOTO_MAX_BYTES = 1024 * 1024;
export const PROFILE_PHOTO_ACCEPT = 'image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp';

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

export const getClassLabel = (classId, masterData) => {
  return getMasterDataLabelById(masterData, MASTER_DATA_KEYS.class, classId) || '';
};

export const getAcademicYearLabel = (academicYearId, masterData) => {
  return getMasterDataLabelById(masterData, MASTER_DATA_KEYS.academicYear, academicYearId) || '';
};

const toNumberOrNull = (value) => {
  if (value === '' || value == null) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const toNullableString = (value) => {
  const trimmed = String(value ?? '').trim();
  return trimmed === '' ? null : trimmed;
};

const trimOrOmit = (value) => {
  const trimmed = String(value ?? '').trim();
  return trimmed === '' ? undefined : trimmed;
};

export const validateAdmissionForm = (form, errorCopy) => {
  const errors = {};
  const { student, parents } = form;

  if (!student.admissionNo.trim()) {
    errors.admissionNo = errorCopy.admissionNoRequired;
  } else if (student.admissionNo.trim().length > 20) {
    errors.admissionNo = errorCopy.admissionNoMax;
  }

  if (!student.firstName.trim()) {
    errors.firstName = errorCopy.firstNameRequired;
  } else if (student.firstName.trim().length > 50) {
    errors.firstName = errorCopy.firstNameMax;
  }

  if (student.lastName.trim().length > 50) {
    errors.lastName = errorCopy.lastNameMax;
  }

  const aadhar = student.aadharNumber.trim();
  if (aadhar && !/^\d{12}$/.test(aadhar)) {
    errors.aadharNumber = errorCopy.aadharInvalid;
  }

  if (!student.academicYearId) {
    errors.academicYearId = errorCopy.academicYearRequired;
  }

  if (parents.fatherEmail.trim() && !isValidEmail(parents.fatherEmail.trim())) {
    errors.fatherEmail = errorCopy.emailInvalid;
  }

  if (parents.motherEmail.trim() && !isValidEmail(parents.motherEmail.trim())) {
    errors.motherEmail = errorCopy.emailInvalid;
  }

  if (parents.guardianEmail.trim() && !isValidEmail(parents.guardianEmail.trim())) {
    errors.guardianEmail = errorCopy.emailInvalid;
  }

  if (parents.primaryContact === 'GUARDIAN' && !parents.guardianName.trim()) {
    errors.guardianName = errorCopy.guardianNameRequired;
  }

  const hasParentContact =
    parents.fatherName.trim()
    || parents.motherName.trim()
    || parents.guardianName.trim()
    || parents.fatherPhone.trim()
    || parents.motherPhone.trim();

  if (!hasParentContact) {
    errors.general = errorCopy.parentContactRequired;
  }

  return errors;
};

export const buildAdmissionPayload = (form) => {
  const { student, parents, documents } = form;

  const studentPayload = {
    admissionNo: student.admissionNo.trim(),
    firstName: student.firstName.trim(),
    classId: TEMP_API_CLASS_ID,
    academicYearId: Number(student.academicYearId),
  };

  const lastName = trimOrOmit(student.lastName);
  if (lastName) studentPayload.lastName = lastName;

  const aadharNumber = trimOrOmit(student.aadharNumber);
  if (aadharNumber) studentPayload.aadharNumber = aadharNumber;

  const emisNumber = trimOrOmit(student.emisNumber);
  if (emisNumber) studentPayload.emisNumber = emisNumber;

  const rationCardNumber = trimOrOmit(student.rationCardNumber);
  if (rationCardNumber) studentPayload.rationCardNumber = rationCardNumber;

  if (student.dateOfBirth) studentPayload.dateOfBirth = student.dateOfBirth;
  if (student.gender) studentPayload.gender = student.gender;

  const nationality = trimOrOmit(student.nationality);
  if (nationality) studentPayload.nationality = nationality;

  const address = trimOrOmit(student.address);
  if (address) studentPayload.address = address;

  if (student.bloodGroup) studentPayload.bloodGroup = student.bloodGroup;
  if (student.religion) studentPayload.religion = student.religion;
  if (student.community) studentPayload.community = student.community;

  const annualIncome = toNumberOrNull(student.annualIncome);
  if (annualIncome != null) studentPayload.annualIncome = annualIncome;

  studentPayload.status = 'ACTIVE';

  const parentsPayload = {
    primaryContact: parents.primaryContact,
    fatherName: trimOrOmit(parents.fatherName),
    fatherPhone: trimOrOmit(parents.fatherPhone),
    fatherEmail: trimOrOmit(parents.fatherEmail),
    fatherOccupation: trimOrOmit(parents.fatherOccupation),
    motherName: trimOrOmit(parents.motherName),
    motherPhone: trimOrOmit(parents.motherPhone),
    motherEmail: trimOrOmit(parents.motherEmail),
    motherOccupation: trimOrOmit(parents.motherOccupation),
    guardianName: toNullableString(parents.guardianName),
    guardianPhone: toNullableString(parents.guardianPhone),
    guardianEmail: toNullableString(parents.guardianEmail),
    guardianOccupation: toNullableString(parents.guardianOccupation),
    guardianRelationship: toNullableString(parents.guardianRelationship),
  };

  const fatherAnnualIncome = toNumberOrNull(parents.fatherAnnualIncome);
  if (fatherAnnualIncome != null) parentsPayload.fatherAnnualIncome = fatherAnnualIncome;

  const motherAnnualIncome = toNumberOrNull(parents.motherAnnualIncome);
  if (motherAnnualIncome != null) parentsPayload.motherAnnualIncome = motherAnnualIncome;

  const payload = {
    student: studentPayload,
    parents: parentsPayload,
  };

  const photoUrl = documents.profilePhotoUrl.trim();
  const documentsPayload = {};

  if (photoUrl && !photoUrl.startsWith('blob:')) {
    documentsPayload.profilePhotoUrl = photoUrl;
  }

  if (aadharNumber && /^\d{12}$/.test(aadharNumber)) {
    documentsPayload.aadharNo = aadharNumber;
  }

  if (Object.keys(documentsPayload).length > 0) {
    payload.documents = documentsPayload;
  }

  return payload;
};
