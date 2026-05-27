import { useRef } from 'react';
import '../../../components/reusable/css/crmReusable.css';
import '../css/bulkUploadPage.css';
import { bulkUploadPageMock } from '../../../data/mocks/bulkUpload/bulkUploadPage.mock';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';
import { PageHeader, CrmButton } from '../../../components/reusable/js/index';
import { getFailedUploadRows } from '../../../utils/bulkUploadResults';
import { useBulkUploadForm } from '../hooks/useBulkUploadForm';
import BulkUploadResultsView from './bulkUploadResultsView';
import BulkUploadStructuredErrors from './bulkUploadStructuredErrors';

const BULK_FILE_ACCEPT =
  '.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

const BulkUploadPage = () => {
  const pageCopy = bulkUploadPageMock;
  const { title, subtitle, actions, center, messages, results } = pageCopy;

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
  const showStructuredGeneralError =
    Boolean(errors.general) && !uploadResult && /Row\s+\d+\s*:/i.test(errors.general);

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

      {errors.file ? (
        <p className="bulkUploadErrorBanner" role="alert">
          {errors.file}
        </p>
      ) : null}

      {showStructuredGeneralError ? (
        <BulkUploadStructuredErrors message={errors.general} copy={pageCopy} />
      ) : null}

      {errors.general && !showStructuredGeneralError && !uploadResult ? (
        <p className="bulkUploadErrorBanner" role="alert">
          {errors.general || messages.uploadFailed}
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
        <BulkUploadResultsView
          uploadResult={uploadResult}
          failedRows={failedRows}
          copy={pageCopy}
        />
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
