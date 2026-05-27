import { parseRowPrefixedErrorMessage } from '../../../utils/bulkUploadResults';
import BulkUploadResultsView from './bulkUploadResultsView';

const BulkUploadStructuredErrors = ({ message, copy }) => {
  const parsedRows = parseRowPrefixedErrorMessage(message);

  if (!parsedRows?.length) {
    return (
      <p className="bulkUploadErrorBanner" role="alert">
        {message}
      </p>
    );
  }

  const uploadResult = {
    requestedCount: parsedRows.length,
    successCount: 0,
    failedCount: parsedRows.length,
    dryRun: false,
    results: parsedRows.map((group) => ({
      rowNumber: group.rowNumber,
      admissionNo: null,
      success: false,
      message: copy.results.validationFailedMessage,
      errors: group.errors,
    })),
  };

  return (
    <BulkUploadResultsView
      uploadResult={uploadResult}
      failedRows={uploadResult.results}
      copy={copy}
    />
  );
};

export default BulkUploadStructuredErrors;
