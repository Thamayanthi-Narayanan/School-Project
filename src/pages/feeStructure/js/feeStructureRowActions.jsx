import '../css/feeStructureRowActions.css';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';

const FeeStructureRowActions = ({ categoryName, onEditAmounts, onClearAmounts }) => (
  <div className="feeStructureRowActions">
    <button
      type="button"
      className="feeStructureActionBtn feeStructureActionBtnEdit"
      aria-label={`Edit fee amounts for ${categoryName}`}
      title="Edit fee amounts"
      onClick={onEditAmounts}
    >
      {DashboardIcons.feeStructureAmounts(17)}
    </button>
    <button
      type="button"
      className="feeStructureActionBtn feeStructureActionBtnClear"
      aria-label={`Clear fee amounts for ${categoryName}`}
      title="Clear fee amounts"
      onClick={onClearAmounts}
    >
      {DashboardIcons.feeStructureClear(17)}
    </button>
  </div>
);

export default FeeStructureRowActions;
