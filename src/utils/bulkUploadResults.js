export const getFailedUploadRows = (results = []) =>
  results.filter((row) => row && row.success === false);

export const getRowErrorList = (errors) => {
  if (!errors) return [];

  if (Array.isArray(errors)) {
    return [...new Set(errors.filter(Boolean).map(String))];
  }

  if (typeof errors === 'string') {
    const trimmed = errors.trim();
    if (!trimmed) return [];

    if (/Row\s+\d+\s*:/i.test(trimmed)) {
      return parseRowPrefixedErrorChunks(trimmed).flatMap((group) => group.errors);
    }

    return [trimmed];
  }

  if (typeof errors === 'object') {
    return [...new Set(Object.values(errors).flat().filter(Boolean).map(String))];
  }

  return [String(errors)];
};

const parseRowPrefixedErrorChunks = (text) => {
  const segments = text
    .split(/(?=Row\s+\d+\s*:)/gi)
    .map((segment) => segment.trim())
    .filter(Boolean);

  const grouped = new Map();

  segments.forEach((segment) => {
    const match = segment.match(/^Row\s+(\d+)\s*:\s*(.+)$/is);
    if (!match) return;

    const rowNumber = Number(match[1]);
    const errorText = match[2].trim();
    if (!errorText) return;

    const existing = grouped.get(rowNumber) ?? { rowNumber, errors: [] };
    existing.errors.push(errorText);
    grouped.set(rowNumber, existing);
  });

  return [...grouped.values()];
};

export const parseRowPrefixedErrorMessage = (text) => {
  if (!text || typeof text !== 'string' || !/Row\s+\d+\s*:/i.test(text)) {
    return null;
  }

  return parseRowPrefixedErrorChunks(text);
};

export const formatUploadSummaryMessage = (payload, copy) => {
  if (!payload) return '';

  const {
    successCount = 0,
    failedCount = 0,
    requestedCount = 0,
    dryRun = false,
  } = payload;

  const template = dryRun ? copy.results.dryRunSummary : copy.results.summary;

  return template
    .replace('{successCount}', String(successCount))
    .replace('{failedCount}', String(failedCount))
    .replace('{requestedCount}', String(requestedCount));
};

export const formatRowLabel = (rowNumber, copy) =>
  (copy.results.rowLabel || 'Row {rowNumber}').replace(
    '{rowNumber}',
    String(rowNumber ?? '—'),
  );
