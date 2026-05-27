/**
 * Parse a quarter cell value to a non-negative number (empty/invalid → 0).
 */
export const parseQuarterAmount = (value) => {
  if (value == null) return 0;
  const trimmed = String(value).trim().replace(/,/g, '');
  if (!trimmed) return 0;
  const parsed = Number.parseFloat(trimmed);
  if (!Number.isFinite(parsed) || parsed < 0) return 0;
  return parsed;
};

export const rowHasQuarterInput = (row) =>
  ['q1', 'q2', 'q3', 'q4'].some((key) => String(row[key] ?? '').trim() !== '');

export const sumRowQuarters = (row) =>
  parseQuarterAmount(row.q1)
  + parseQuarterAmount(row.q2)
  + parseQuarterAmount(row.q3)
  + parseQuarterAmount(row.q4);

export const sumColumnForRows = (rows, quarterKey) =>
  rows.reduce((sum, row) => sum + parseQuarterAmount(row[quarterKey]), 0);

export const tableHasAnyQuarterInput = (rows) => rows.some(rowHasQuarterInput);

/**
 * Format amount as INR (₹12,000). Returns null when amount should not be shown.
 */
export const formatInrAmount = (amount) => {
  if (!Number.isFinite(amount) || amount <= 0) return null;
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
};

export const formatInrOrDash = (amount) => formatInrAmount(amount) ?? '—';
