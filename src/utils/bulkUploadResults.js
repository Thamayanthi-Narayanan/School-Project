export const getFailedUploadRows = (results = []) =>
  results.filter((row) => row && row.success === false);

const VISIBLE_VALIDATION_ERRORS = new Set([
  'Admission number already exists',
  'Student Aadhar number is already registered',
]);

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

export const formatRowErrors = (errors) => {
  if (!errors) return '—';
  if (Array.isArray(errors)) {
    const filtered = errors
      .filter(Boolean)
      .map(String)
      .filter((error) => VISIBLE_VALIDATION_ERRORS.has(error));

    if (filtered.length > 0) {
      return filtered.join('; ');
    }

    return errors.filter(Boolean).map(String).join('; ');
  }
  return String(errors);
};
