import '../css/statusPill.css';

const workflowStatusMap = {
  Success: 'statusPillSuccess',
  Approved: 'statusPillSuccess',
  Uploaded: 'statusPillSuccess',
  Pending: 'statusPillPending',
  Review: 'statusPillReview',
  Rejected: 'statusPillRejected',
};

const feeStatusMap = {
  Paid: 'statusPillSuccess',
  Pending: 'statusPillFeePending',
  Partial: 'statusPillReview',
  Overdue: 'statusPillFeePending',
  Exempted: 'statusPillPending',
};

const scholarshipStatusMap = {
  Pending: 'statusPillReview',
  Approved: 'statusPillSuccess',
  Rejected: 'statusPillRejected',
};

const StatusPill = ({ status, type = 'workflow' }) => {
  const map = type === 'fee'
    ? feeStatusMap
    : type === 'scholarship'
      ? scholarshipStatusMap
      : workflowStatusMap;
  const className = map[status] || 'statusPillPending';
  return (
    <span className={`statusPill ${className}`}>
      <span className="statusPillDot" />
      {status}
    </span>
  );
};

export default StatusPill;
