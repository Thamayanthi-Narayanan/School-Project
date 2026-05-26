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

export const scholarshipFromApiToForm = (scheme) => ({
  schemeName: scheme?.schemeName ?? '',
  schemeType: scheme?.schemeType != null ? String(scheme.schemeType) : '',
  discountType: scheme?.discountType != null
    ? String(scheme.discountType)
    : DISCOUNT_TYPE.percentage,
  discountValue:
    scheme?.discountValue != null && scheme.discountValue !== ''
      ? String(scheme.discountValue)
      : '',
  applicableTo: scheme?.applicableTo != null
    ? String(scheme.applicableTo)
    : APPLICABLE_TO.tuitionOnly,
  feeHeadId: scheme?.feeHeadId != null ? String(scheme.feeHeadId) : '',
  academicYearId: scheme?.academicYearId != null ? String(scheme.academicYearId) : '',
  isActive: scheme?.isActive === false ? 'No' : YES,
});

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

export const buildUpdateScholarshipPayload = (form, original) => {
  const payload = {};
  const full = buildCreateScholarshipPayload(form);
  const originalName = original?.schemeName ?? '';
  const originalDiscount = Number(original?.discountValue);
  const originalYearId = Number(original?.academicYearId);
  const originalFeeHeadId = original?.feeHeadId != null ? Number(original.feeHeadId) : null;
  const originalActive = original?.isActive !== false;

  if (full.schemeName !== originalName) payload.schemeName = full.schemeName;
  if (full.schemeType !== String(original?.schemeType ?? '')) payload.schemeType = full.schemeType;
  if (full.discountType !== String(original?.discountType ?? '')) {
    payload.discountType = full.discountType;
  }
  if (full.discountValue !== originalDiscount) payload.discountValue = full.discountValue;
  if (full.applicableTo !== String(original?.applicableTo ?? '')) {
    payload.applicableTo = full.applicableTo;
  }
  if (full.academicYearId !== originalYearId) payload.academicYearId = full.academicYearId;
  if (full.isActive !== originalActive) payload.isActive = full.isActive;

  if (full.applicableTo === APPLICABLE_TO.specificHead) {
    const nextFeeHeadId = full.feeHeadId ?? null;
    if (nextFeeHeadId !== originalFeeHeadId) payload.feeHeadId = nextFeeHeadId;
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
  if (!mapped.general && message.includes('at least one field')) {
    mapped.general = fieldErrors.general;
  }

  return mapped;
};

export { toYesNo };
