import '../css/statusPill.css';

const statusClassMap = {
  Success: 'statusPillSuccess',
  Approved: 'statusPillSuccess',
  Pending: 'statusPillPending',
  Review: 'statusPillReview',
  Rejected: 'statusPillRejected',
};

const StatusPill = ({ status }) => {
  const className = statusClassMap[status] || 'statusPillPending';
  return (
    <span className={`statusPill ${className}`}>
      <span className="statusPillDot" />
      {status}
    </span>
  );
};

export default StatusPill;
