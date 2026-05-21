import '../css/admissionPage.css';

const AdmissionReviewStep = ({ subtitle, summary }) => (
  <div className="admissionReview">
    <p className="admissionReviewSubtitle">{subtitle}</p>
    <div className="admissionReviewSummary">
      <p className="admissionReviewRow">
        <span className="admissionReviewLabel">{summary.applicantLabel}:</span>
        {' '}
        {summary.applicantValue}
      </p>
      <p className="admissionReviewRow">
        <span className="admissionReviewLabel">{summary.classLabel}:</span>
        {' '}
        {summary.classValue}
      </p>
      <p className="admissionReviewRow">
        <span className="admissionReviewLabel">{summary.parentLabel}:</span>
        {' '}
        {summary.parentValue}
      </p>
      <p className="admissionReviewRow">
        <span className="admissionReviewLabel">{summary.documentsLabel}:</span>
        {' '}
        {summary.documentsValue}
      </p>
    </div>
  </div>
);

export default AdmissionReviewStep;
