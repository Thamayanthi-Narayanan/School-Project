export const getFailedUploadRows = (results = []) =>
  results.filter((row) => row && row.success === false);

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
  if (Array.isArray(errors)) return errors.filter(Boolean).join('; ');
  return String(errors);
};
