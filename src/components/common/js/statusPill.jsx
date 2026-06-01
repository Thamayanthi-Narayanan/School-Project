import '../css/statusPill.css';

const workflowStatusMap = {
  Success: 'statusPillSuccess',
  Approved: 'statusPillSuccess',
  Uploaded: 'statusPillSuccess',
  Completed: 'statusPillSuccess',
  Active: 'statusPillSuccess',
  Pending: 'statusPillPending',
  Review: 'statusPillReview',
  Rejected: 'statusPillRejected',
  Inactive: 'statusPillRejected',
};

const feeStatusMap = {
  Paid: 'statusPillSuccess',
  PAID: 'statusPillSuccess',
  Pending: 'statusPillFeePending',
  Partial: 'statusPillReview',
  PARTIAL: 'statusPillReview',
  Overdue: 'statusPillFeePending',
  UNPAID: 'statusPillFeePending',
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
