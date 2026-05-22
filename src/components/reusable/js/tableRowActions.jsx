import '../css/crmReusable.css';
import { DashboardIcons } from '../../common/js/dashboardIcons';

const TableRowActions = ({
  entityName,
  showView = true,
  showDelete = true,
  onView,
  onEdit,
  onDelete,
}) => (
  <div className="crmRowActions">
    {showView && (
      <button
        type="button"
        className="crmActionBtn crmActionBtnDark"
        aria-label={`View ${entityName}`}
        onClick={onView}
      >
        {DashboardIcons.eye(16)}
      </button>
    )}
    <button
      type="button"
      className="crmActionBtn crmActionBtnDark"
      aria-label={`Edit ${entityName}`}
      onClick={onEdit}
    >
      {DashboardIcons.edit(16)}
    </button>
    {showDelete && (
      <button
        type="button"
        className="crmActionBtn crmActionBtnDanger"
        aria-label={`Delete ${entityName}`}
        onClick={onDelete}
      >
        {DashboardIcons.trash(16)}
      </button>
    )}
  </div>
);

export default TableRowActions;
