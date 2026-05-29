import '../css/crmReusable.css';
import '../css/dataTableCard.css';

const DataTableCard = ({ children, footer, className = '' }) => (
  <div className={`crmTableCard crmSectionAnimate crmSectionDelay2 ${className}`.trim()}>
    <div className="crmTableWrap">
      {children}
    </div>
    {footer}
  </div>
);

export default DataTableCard;
