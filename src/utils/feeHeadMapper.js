export const getFeeHeadId = (item) =>
  item?.feeTypeId ?? item?.feeHeadId ?? item?.id ?? null;

export const getFeeHeadCode = (item) =>
  item?.feeTypeCode ?? item?.feeHeadCode ?? '';

export const getFeeHeadName = (item) =>
  item?.feeTypeName ?? item?.feeHeadName ?? item?.name ?? '';

export const sortFeeHeadsByDisplayOrder = (heads) =>
  [...heads].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

/**
 * Map API fee type/head to a fee-structure table row, preserving quarter inputs when refetching.
 */
export const mapFeeHeadToCategoryRow = (head, existingRow) => ({
  id: getFeeHeadId(head),
  name: getFeeHeadName(head) || getFeeHeadCode(head) || '',
  feeHeadCode: getFeeHeadCode(head),
  description: head.description ?? '',
  feeCategory: head.feeCategory ?? '',
  mandatory: Boolean(head.mandatory),
  refundable: Boolean(head.refundable),
  active: head.active !== false,
  displayOrder: head.displayOrder ?? null,
  q1: existingRow?.q1 ?? '',
  q2: existingRow?.q2 ?? '',
  q3: existingRow?.q3 ?? '',
  q4: existingRow?.q4 ?? '',
});

export const mapFeeHeadsToCategoryRows = (heads, existingRows = []) => {
  const existingById = new Map(existingRows.map((row) => [row.id, row]));
  return sortFeeHeadsByDisplayOrder(heads)
    .map((head) => mapFeeHeadToCategoryRow(head, existingById.get(getFeeHeadId(head))))
    .filter((row) => row.id != null);
};
