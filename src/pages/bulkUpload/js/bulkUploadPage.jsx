import { useRef } from 'react';
import '../../../components/reusable/css/crmReusable.css';
import '../css/bulkUploadPage.css';
import { bulkUploadPageMock } from '../../../data/mocks/bulkUpload/bulkUploadPage.mock';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';
import { PageHeader, CrmButton, DataTableCard } from '../../../components/reusable/js/index';
import {
  formatRowErrors,
  getFailedUploadRows,
} from '../../../utils/bulkUploadResults';
import { useBulkUploadForm } from '../hooks/useBulkUploadForm';

const BULK_FILE_ACCEPT =
  '.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

const BulkUploadPage = () => {
  const { title, subtitle, actions, center, messages, results } = bulkUploadPageMock;

  const inputRef = useRef(null);

  const {
    file,
    errors,
    isUploading,
    isDownloading,
    successMessage,
    uploadResult,
    handleFileSelect,
    handleDownloadTemplate,
    handleUpload,
  } = useBulkUploadForm();

  const failedRows = getFailedUploadRows(uploadResult?.results);
  const hasPartialFailures = (uploadResult?.failedCount ?? 0) > 0;

  const handleBulkUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFileInputChange = async (event) => {
    const nextFile = event.target.files?.[0];
    event.target.value = '';
    if (!nextFile) return;
    handleFileSelect(nextFile);
    await handleUpload(nextFile);
  };

  return (
    <div className="crmListPage bulkUploadPage">
      <PageHeader title={title} subtitle={subtitle} className="bulkUploadPageHeader" />

      {successMessage ? (
        <p
          className={
            hasPartialFailures ? 'bulkUploadBanner bulkUploadBannerWarn' : 'bulkUploadBanner'
          }
          role="status"
        >
          {successMessage}
        </p>
      ) : null}

      {errors.file || errors.general ? (
        <p className="bulkUploadErrorBanner" role="alert">
          {errors.file || errors.general || messages.uploadFailed}
        </p>
      ) : null}

      <section className="bulkUploadCenter crmSectionAnimate" aria-label="Bulk upload actions">
        <div className="bulkUploadCenterActions">
          <CrmButton
            variant="outline"
            type="button"
            className="bulkUploadCenterBtn"
            onClick={handleBulkUploadClick}
            disabled={isUploading || isDownloading}
            aria-label={actions.bulkUploadAriaLabel}
          >
            {DashboardIcons.upload(20)}
            {isUploading ? actions.uploadingLabel : actions.bulkUploadLabel}
          </CrmButton>
          <CrmButton
            variant="primary"
            type="button"
            className="bulkUploadCenterBtn"
            onClick={handleDownloadTemplate}
            disabled={isUploading || isDownloading}
            aria-label={actions.downloadFormatAriaLabel}
          >
            {DashboardIcons.download(20)}
            {isDownloading ? actions.downloadingLabel : actions.downloadFormatLabel}
          </CrmButton>
        </div>
        <p className="bulkUploadCenterHint">{center.hint}</p>
        {file && !isUploading ? (
          <p className="bulkUploadCenterFile" role="status">
            Selected: {file.name}
          </p>
        ) : null}
      </section>

      {uploadResult ? (
        <DataTableCard className="bulkUploadResultsCard crmSectionAnimate">
          <header className="bulkUploadResultsHeader">
            <h2 className="bulkUploadResultsTitle">{results.title}</h2>
            {uploadResult.requestedCount != null ? (
              <p className="bulkUploadResultsMeta">
                {uploadResult.successCount ?? 0} succeeded · {uploadResult.failedCount ?? 0} failed
                · {uploadResult.requestedCount ?? 0} requested
                {uploadResult.dryRun ? ' (dry run)' : ''}
              </p>
            ) : null}
          </header>
          <table className="crmTable bulkUploadResultsTable">
            <thead>
              <tr>
                <th>{results.columns.row}</th>
                <th>{results.columns.admissionNo}</th>
                <th>{results.columns.status}</th>
                <th>{results.columns.message}</th>
                <th>{results.columns.errors}</th>
              </tr>
            </thead>
            <tbody>
              {failedRows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="bulkUploadResultsEmpty">
                    {results.emptyFailed}
                  </td>
                </tr>
              ) : (
                failedRows.map((row) => (
                  <tr key={`row-${row.rowNumber}-${row.admissionNo}`} className="crmTableRow">
                    <td className="crmTableId">{row.rowNumber}</td>
                    <td>{row.admissionNo || '—'}</td>
                    <td>
                      <span className="bulkUploadStatus bulkUploadStatusFailed">
                        {results.statusFailed}
                      </span>
                    </td>
                    <td>{row.message || '—'}</td>
                    <td className="bulkUploadErrorsCell">{formatRowErrors(row.errors)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </DataTableCard>
      ) : null}

      <input
        ref={inputRef}
        type="file"
        className="bulkUploadFileInputHidden"
        accept={BULK_FILE_ACCEPT}
        onChange={handleFileInputChange}
        disabled={isUploading}
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  );
};

export default BulkUploadPage;
