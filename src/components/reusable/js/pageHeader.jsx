import '../css/crmReusable.css';
import '../css/pageHeader.css';

const PageHeader = ({ title, subtitle, children, className = '' }) => (
  <header className={`crmPageHeader crmSectionAnimate ${className}`.trim()}>
    <div>
      <h1 className="crmPageTitle">{title}</h1>
      {subtitle && <p className="crmPageSubtitle">{subtitle}</p>}
    </div>
    {children && <div className="crmPageActions">{children}</div>}
  </header>
);

export default PageHeader;
