import '../css/crmReusable.css';

const parsePhoneLines = (phone) => {
  const parts = phone.trim().split(/\s+/).filter(Boolean);

  if (parts.length >= 3) {
    return {
      line1: parts[0],
      line2: parts[1],
      line3: parts.slice(2).join(' '),
    };
  }

  if (parts.length === 2) {
    return { line1: parts[0], line2: parts[1], line3: '' };
  }

  return { line1: phone, line2: '', line3: '' };
};

const PhoneCell = ({ phone, className = '' }) => {
  const { line1, line2, line3 } = parsePhoneLines(phone);

  return (
    <span className={`crmPhoneCell ${className}`.trim()}>
      <span className="crmPhoneCellLine">{line1}</span>
      {line2 ? <span className="crmPhoneCellLine">{line2}</span> : null}
      {line3 ? <span className="crmPhoneCellLine">{line3}</span> : null}
    </span>
  );
};

export default PhoneCell;
