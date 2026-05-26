import { YES, toBoolean, toYesNo } from './feeHeadFormUtils';

export const APPLICABLE_TO = {
  allFees: 'ALL_FEES',
  tuitionOnly: 'TUITION_ONLY',
  specificHead: 'SPECIFIC_HEAD',
};

export const DISCOUNT_TYPE = {
  percentage: 'PERCENTAGE',
  fixed: 'FIXED',
};

export const initialScholarshipSchemeForm = {
  schemeName: '',
  schemeType: '',
  discountType: DISCOUNT_TYPE.percentage,
  discountValue: '',
  applicableTo: APPLICABLE_TO.tuitionOnly,
  feeHeadId: '',
  academicYearId: '',
  isActive: YES,
};

export const validateScholarshipSchemeForm = (form, validationCopy) => {
  const errors = {};
  const name = form.schemeName.trim();
  const discountValueRaw = form.discountValue.trim().replace(/,/g, '');
  const discountType = form.discountType;
  const applicableTo = form.applicableTo;

  if (!name) {
    errors.schemeName = validationCopy.nameRequired;
  } else if (name.length > 150) {
    errors.schemeName = validationCopy.nameMax;
  }

  if (!form.schemeType) {
    errors.schemeType = validationCopy.schemeTypeRequired;
  }

  if (!discountType) {
    errors.discountType = validationCopy.discountTypeRequired;
  }

  if (!discountValueRaw) {
    errors.discountValue = validationCopy.discountValueRequired;
  } else {
    const parsed = Number.parseFloat(discountValueRaw);
    if (!Number.isFinite(parsed) || parsed < 0) {
      errors.discountValue = validationCopy.discountValueInvalid;
    } else if (
      discountType === DISCOUNT_TYPE.percentage
      && parsed > 100
    ) {
      errors.discountValue = validationCopy.discountPercentMax;
    }
  }

  if (!applicableTo) {
    errors.applicableTo = validationCopy.applicableToRequired;
  }

  if (applicableTo === APPLICABLE_TO.specificHead && !form.feeHeadId) {
    errors.feeHeadId = validationCopy.feeHeadRequired;
  }

  if (!form.academicYearId) {
    errors.academicYearId = validationCopy.academicYearRequired;
  }

  return errors;
};

export const buildCreateScholarshipPayload = (form) => {
  const discountValue = Number.parseFloat(form.discountValue.trim().replace(/,/g, ''));
  const payload = {
    schemeName: form.schemeName.trim(),
    schemeType: form.schemeType,
    discountType: form.discountType,
    discountValue,
    applicableTo: form.applicableTo,
    academicYearId: Number(form.academicYearId),
    isActive: toBoolean(form.isActive),
  };

  if (form.applicableTo === APPLICABLE_TO.specificHead && form.feeHeadId) {
    payload.feeHeadId = Number(form.feeHeadId);
  }

  return payload;
};

export const mapApiFieldErrorsToForm = (fieldErrors = {}) => {
  const mapped = { ...fieldErrors };
  const message = String(fieldErrors.general ?? '').toLowerCase();

  if (!mapped.feeHeadId && message.includes('fee head')) {
    mapped.feeHeadId = fieldErrors.general;
  }
  if (!mapped.academicYearId && message.includes('academic year')) {
    mapped.academicYearId = fieldErrors.general;
  }
  if (!mapped.discountValue && message.includes('percentage')) {
    mapped.discountValue = fieldErrors.general;
  }

  return mapped;
};

export { toYesNo };
