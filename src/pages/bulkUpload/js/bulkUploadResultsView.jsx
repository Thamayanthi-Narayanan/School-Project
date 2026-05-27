import StatusPill from '../../../components/common/js/statusPill';
import { formatRowLabel, getRowErrorList } from '../../../utils/bulkUploadResults';

const BulkUploadFailedRow = ({ row, copy, statusFailedLabel }) => {
  const errorItems = getRowErrorList(row.errors);

  return (
    <article className="bulkUploadFailedRow">
      <header className="bulkUploadFailedRowHeader">
        <div className="bulkUploadFailedRowMeta">
          <span className="bulkUploadFailedRowBadge">
            {formatRowLabel(row.rowNumber, copy)}
          </span>
          {row.admissionNo ? (
            <span className="bulkUploadFailedRowAdmission">{row.admissionNo}</span>
          ) : null}
        </div>
        <StatusPill status={statusFailedLabel} type="scholarship" />
      </header>

      {row.message ? (
        <p className="bulkUploadFailedRowMessage">{row.message}</p>
      ) : null}

      {errorItems.length > 0 ? (
        <ul className="bulkUploadFailedRowErrors">
          {errorItems.map((error) => (
            <li key={`${row.rowNumber}-${error}`} className="bulkUploadFailedRowErrorItem">
              {error}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
};

const BulkUploadResultsView = ({ uploadResult, failedRows, copy }) => {
  if (!uploadResult) return null;

  const { results: resultsCopy } = copy;
  const statusFailedLabel = resultsCopy.statusFailed;

  return (
    <section className="bulkUploadResultsView crmSectionAnimate" aria-label={resultsCopy.title}>
      <header className="bulkUploadResultsViewHeader">
        <h2 className="bulkUploadResultsViewTitle">{resultsCopy.title}</h2>
        {uploadResult.requestedCount != null ? (
          <p className="bulkUploadResultsViewMeta">
            <span>
              {uploadResult.successCount ?? 0} {resultsCopy.statsSucceeded}
            </span>
            <span aria-hidden="true">·</span>
            <span className="bulkUploadResultsViewMetaFailed">
              {uploadResult.failedCount ?? 0} {resultsCopy.statsFailed}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {uploadResult.requestedCount ?? 0} {resultsCopy.statsRequested}
            </span>
            {uploadResult.dryRun ? ` (${resultsCopy.dryRunTag})` : ''}
          </p>
        ) : null}
      </header>

      {failedRows.length > 0 ? (
        <div className="bulkUploadFailedRows">
          <h3 className="bulkUploadFailedRowsTitle">{resultsCopy.failuresSectionTitle}</h3>
          <div className="bulkUploadFailedRowsList">
            {failedRows.map((row) => (
              <BulkUploadFailedRow
                key={`failed-${row.rowNumber}-${row.admissionNo}`}
                row={row}
                copy={copy}
                statusFailedLabel={statusFailedLabel}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="bulkUploadResultsViewSuccess">{resultsCopy.emptyFailed}</p>
      )}
    </section>
  );
};

export default BulkUploadResultsView;
