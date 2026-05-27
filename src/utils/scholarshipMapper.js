import { formatInrAmount } from './feeStructureAmounts';

export const getSchemeId = (scheme) => scheme?.schemeId ?? scheme?.id ?? null;

const formatPercentBadge = (value) => {
  if (value == null || value === '') return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return null;
  const rounded = Math.round(parsed * 100) / 100;
  return Number.isInteger(rounded) ? `${rounded}%` : `${rounded}%`;
};

const formatAmountBadge = (value) => {
  if (value == null || value === '') return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return null;
  return formatInrAmount(parsed) ?? `₹${parsed.toLocaleString('en-IN')}`;
};

const APPLICABLE_TO_LABELS = {
  ALL_FEES: 'All fees',
  TUITION_ONLY: 'Tuition only',
  SPECIFIC_HEAD: 'Specific fee head',
};

const SCHEME_TYPE_LABELS = {
  MERIT: 'Merit',
  MEANS: 'Means',
  SPORTS: 'Sports',
  SIBLING: 'Sibling',
  GOVERNMENT: 'Government',
  EWS: 'EWS',
  OTHER: 'Other',
};

export const buildSchemeCardDescription = (scheme) => {
  const parts = [];
  const typeKey = String(scheme?.schemeType ?? '').toUpperCase();
  if (typeKey && SCHEME_TYPE_LABELS[typeKey]) {
    parts.push(SCHEME_TYPE_LABELS[typeKey]);
  }
  if (scheme?.academicYearName) {
    parts.push(scheme.academicYearName);
  }
  const applicableKey = String(scheme?.applicableTo ?? '').toUpperCase();
  if (applicableKey && APPLICABLE_TO_LABELS[applicableKey]) {
    parts.push(APPLICABLE_TO_LABELS[applicableKey]);
  }
  if (scheme?.feeHeadName) {
    parts.push(scheme.feeHeadName);
  }
  if (parts.length > 0) return parts.join(' · ');

  return (
    scheme?.eligibilityCriteria
    ?? scheme?.eligibilityDescription
    ?? scheme?.description
    ?? ''
  );
};

/**
 * Map ScholarshipResponseDTO to scheme card UI (title, badge, description).
 */
export const mapScholarshipToSchemeCard = (scheme) => {
  const discountType = String(scheme?.discountType ?? '').toUpperCase();
  const discountValue = scheme?.discountValue;
  const legacyPercent =
    scheme?.discountPercent ?? scheme?.discountPercentage ?? scheme?.percentDiscount;
  const legacyAmount =
    scheme?.discountAmount ?? scheme?.fixedDiscountAmount ?? scheme?.amount;

  let badge = '—';
  if (discountType === 'FIXED' || discountType.includes('FIXED')) {
    badge = formatAmountBadge(discountValue ?? legacyAmount) ?? badge;
  } else if (discountType === 'PERCENTAGE' || discountType.includes('PERCENT')) {
    badge = formatPercentBadge(discountValue ?? legacyPercent) ?? badge;
  } else if (legacyAmount != null) {
    badge = formatAmountBadge(legacyAmount) ?? badge;
  } else if (legacyPercent != null) {
    badge = formatPercentBadge(legacyPercent) ?? badge;
  }

  return {
    id: getSchemeId(scheme),
    title: scheme?.schemeName ?? scheme?.name ?? '',
    badge,
    description: buildSchemeCardDescription(scheme),
    raw: scheme,
  };
};

export const mapScholarshipsToSchemeCards = (schemes = []) =>
  [...schemes]
    .map(mapScholarshipToSchemeCard)
    .filter((card) => card.id != null && card.title);

export const mapMeritBandToRow = (band) => ({
  id: band?.bandId ?? `${band?.minMark}-${band?.maxMark}`,
  bandLabel: band?.bandLabel ?? '—',
  minMark: band?.minMark ?? '—',
  maxMark: band?.maxMark ?? '—',
  discountPercent: formatPercentBadge(band?.discountPercent) ?? '—',
});

export const mapMeritBandsToRows = (bands = []) =>
  [...bands].map(mapMeritBandToRow);

export const mapMeritResolveToPreview = (payload) => {
  const data = payload?.data ?? payload;
  if (!data) return null;

  return {
    marks: data.marks,
    discountPercent: formatPercentBadge(data.discountPercent),
    bandLabel: data.bandLabel ?? null,
    matched: Boolean(data.matched),
  };
};
