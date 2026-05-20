import '../css/crmReusable.css';
import { DashboardIcons } from '../../common/js/dashboardIcons';

const TableRowActions = ({ entityName }) => (
  <div className="crmRowActions">
    <button
      type="button"
      className="crmActionBtn crmActionBtnDark"
      aria-label={`View ${entityName}`}
    >
      {DashboardIcons.eye(16)}
    </button>
    <button
      type="button"
      className="crmActionBtn crmActionBtnDark"
      aria-label={`Edit ${entityName}`}
    >
      {DashboardIcons.edit(16)}
    </button>
    <button
      type="button"
      className="crmActionBtn crmActionBtnDanger"
      aria-label={`Delete ${entityName}`}
    >
      {DashboardIcons.trash(16)}
    </button>
  </div>
);

export default TableRowActions;
