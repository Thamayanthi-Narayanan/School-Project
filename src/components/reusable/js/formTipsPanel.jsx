import '../css/crmReusable.css';
import '../css/formTipsPanel.css';

const FormTipsPanel = ({ title, items, className = '' }) => (
  <aside className={`crmFormTipsPanel ${className}`.trim()}>
    <h3 className="crmFormTipsTitle">{title}</h3>
    <ul className="crmFormTipsList">
      {items.map((tip) => (
        <li key={tip}>{tip}</li>
      ))}
    </ul>
  </aside>
);

export default FormTipsPanel;
