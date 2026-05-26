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

/**
 * Map one master-data array to FormSelect-style options: { label, value }.
 */
export const mapMasterDataItemsToOptions = (items) => {
  if (!Array.isArray(items)) return [];

  return items
    .filter((item) => item?.value != null && item?.label != null)
    .map((item) => ({
      label: String(item.label),
      value: String(item.value),
    }));
};

/** Options using `id` as the select value (class, academic year, user, etc.). */
export const mapMasterDataItemsToIdOptions = (items) => {
  if (!Array.isArray(items)) return [];

  return items
    .filter((item) => item?.id != null && item?.label != null)
    .map((item) => ({
      label: String(item.label),
      value: String(item.id),
    }));
};

/**
 * @param {object|null|undefined} masterData - response.data from getMasterData
 * @param {string} key - MASTER_DATA_KEYS value
 */
export const getMasterDataOptions = (masterData, key) =>
  mapMasterDataItemsToOptions(masterData?.[key]);

export const getMasterDataIdOptions = (masterData, key) =>
  mapMasterDataItemsToIdOptions(masterData?.[key]);

export const getMasterDataLabel = (masterData, key, value) => {
  if (value == null || value === '') return '';
  const match = getMasterDataOptions(masterData, key).find(
    (option) => option.value === String(value),
  );
  return match?.label ?? String(value);
};

export const getMasterDataLabelById = (masterData, key, id) => {
  if (id == null || id === '') return '';
  const items = masterData?.[key];
  if (!Array.isArray(items)) return '';
  const match = items.find((item) => String(item.id) === String(id));
  return match?.label ?? '';
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
