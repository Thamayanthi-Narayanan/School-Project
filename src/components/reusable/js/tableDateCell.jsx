import '../css/crmReusable.css';

const parseTableDate = (date) => {
  const parts = date.trim().split(/\s+/).filter(Boolean);

  if (parts.length >= 3) {
    return {
      line1: `${parts[0]} ${parts[1]}`,
      line2: parts[2],
    };
  }

  if (parts.length === 2) {
    return { line1: parts[0], line2: parts[1] };
  }

  return { line1: date, line2: '' };
};

const TableDateCell = ({ date, className = '' }) => {
  const { line1, line2 } = parseTableDate(date);

  return (
    <span className={`crmTableDateCell ${className}`.trim()}>
      <span className="crmTableDateLine">{line1}</span>
      {line2 ? <span className="crmTableDateLine">{line2}</span> : null}
    </span>
  );
};

export default TableDateCell;
