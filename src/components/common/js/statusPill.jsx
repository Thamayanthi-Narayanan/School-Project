import '../css/statusPill.css';

const workflowStatusMap = {
  Success: 'statusPillSuccess',
  Approved: 'statusPillSuccess',
  Pending: 'statusPillPending',
  Review: 'statusPillReview',
  Rejected: 'statusPillRejected',
};

const feeStatusMap = {
  Paid: 'statusPillSuccess',
  Pending: 'statusPillFeePending',
  Partial: 'statusPillReview',
};

const StatusPill = ({ status, type = 'workflow' }) => {
  const map = type === 'fee' ? feeStatusMap : workflowStatusMap;
  const className = map[status] || 'statusPillPending';
  return (
    <span className={`statusPill ${className}`}>
      <span className="statusPillDot" />
      {status}
    </span>
  );
};

export default StatusPill;
