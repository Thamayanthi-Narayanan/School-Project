/**
 * Keys on GET /api/v1/master-data → data object.
 */
export const MASTER_DATA_KEYS = {
  role: 'role',
  userStatus: 'userStatus',
  gender: 'gender',
  bloodGroup: 'bloodGroup',
  religion: 'religion',
  community: 'community',
  medium: 'medium',
  studentStatus: 'studentStatus',
  feesPaymentStatus: 'feesPaymentStatus',
  primaryContact: 'primaryContact',
  documentVerificationStatus: 'documentVerificationStatus',
  schemeType: 'schemeType',
  discountType: 'discountType',
  applicableTo: 'applicableTo',
  termType: 'termType',
  feeBillingTerm: 'feeBillingTerm',
  paymentMode: 'paymentMode',
  ledgerStatus: 'ledgerStatus',
  invoiceStatus: 'invoiceStatus',
  paymentRecordStatus: 'paymentRecordStatus',
  feeCategory: 'feeCategory',
  academicYear: 'academicYear',
  section: 'section',
  class: 'class',
  classReference: 'classReference',
  feeHead: 'feeHead',
  user: 'user',
};

const resolveItemLabel = (item) =>
  item?.label ?? item?.name ?? item?.displayName ?? item?.description ?? null;

const resolveItemValue = (item) =>
  item?.value ?? item?.code ?? item?.name ?? null;

/**
 * Resolve API key on data object (exact match, then case-insensitive).
 */
export const resolveMasterDataKey = (masterData, key) => {
  if (!masterData || !key) return key;
  if (Array.isArray(masterData[key])) return key;

  const normalized = String(key).toLowerCase();
  const match = Object.keys(masterData).find(
    (dataKey) => dataKey.toLowerCase() === normalized,
  );
  return match ?? key;
};

/**
 * Map one master-data array to FormSelect-style options: { label, value }.
 */
export const mapMasterDataItemsToOptions = (items) => {
  if (!Array.isArray(items)) return [];

  return items
    .map((item) => {
      const label = resolveItemLabel(item);
      const value = resolveItemValue(item);
      if (label == null || value == null) return null;
      return {
        label: String(label),
        value: String(value),
      };
    })
    .filter(Boolean);
};

/** Options using `id` as the select value (class, academic year, user, etc.). */
export const mapMasterDataItemsToIdOptions = (items) => {
  if (!Array.isArray(items)) return [];

  return items
    .map((item) => {
      const label = resolveItemLabel(item);
      const id = item?.id ?? item?.value;
      if (label == null || id == null) return null;
      return {
        label: String(label),
        value: String(id),
      };
    })
    .filter(Boolean);
};

/**
 * @param {object|null|undefined} masterData - response.data from getMasterData
 * @param {string} key - MASTER_DATA_KEYS value
 */
export const getMasterDataOptions = (masterData, key) => {
  const resolvedKey = resolveMasterDataKey(masterData, key);
  return mapMasterDataItemsToOptions(masterData?.[resolvedKey]);
};

export const getMasterDataIdOptions = (masterData, key) => {
  const resolvedKey = resolveMasterDataKey(masterData, key);
  return mapMasterDataItemsToIdOptions(masterData?.[resolvedKey]);
};

export const getMasterDataLabel = (masterData, key, value) => {
  if (value == null || value === '') return '';
  const match = getMasterDataOptions(masterData, key).find(
    (option) => option.value === String(value),
  );
  return match?.label ?? String(value);
};

export const getMasterDataLabelById = (masterData, key, id) => {
  if (id == null || id === '') return '';
  const resolvedKey = resolveMasterDataKey(masterData, key);
  const items = masterData?.[resolvedKey];
  if (!Array.isArray(items)) return '';
  const match = items.find(
    (item) => String(item.id) === String(id) || String(item.value) === String(id),
  );
  return resolveItemLabel(match) ?? '';
};

/**
 * Build select options with optional empty row and extra prepend rows (e.g. "All classes").
 */
export const buildSelectOptions = (
  masterData,
  key,
  {
    placeholder = '',
    prepend = [],
    append = [],
    includeEmpty = false,
    useIdAsValue = false,
  } = {},
) => {
  const apiOptions = useIdAsValue
    ? getMasterDataIdOptions(masterData, key)
    : getMasterDataOptions(masterData, key);
  const leading = [
    ...prepend,
    ...(includeEmpty && placeholder
      ? [{ label: placeholder, value: '' }]
      : []),
  ];

  return [...leading, ...apiOptions, ...append];
};

export const buildRoleLoadingOptions = (loadingLabel = 'Loading…') => [
  { label: loadingLabel, value: '' },
];
