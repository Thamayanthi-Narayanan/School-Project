import '../css/feeHeadRowActions.css';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';

const FeeHeadRowActions = ({ labels, feeHeadName, onEditHead, onDeleteHead }) => (
  <div className="feeHeadRowActions">
    <button
      type="button"
      className="feeHeadActionBtn feeHeadActionBtnEdit"
      aria-label={`${labels.editAriaLabel} ${feeHeadName}`}
      onClick={onEditHead}
    >
      <span className="feeHeadActionBtnIcon" aria-hidden="true">
        {DashboardIcons.feeHeadEdit(15)}
      </span>
      <span className="feeHeadActionBtnLabel">{labels.editLabel}</span>
    </button>
    <button
      type="button"
      className="feeHeadActionBtn feeHeadActionBtnDelete"
      aria-label={`${labels.deleteAriaLabel} ${feeHeadName}`}
      onClick={onDeleteHead}
    >
      <span className="feeHeadActionBtnIcon" aria-hidden="true">
        {DashboardIcons.feeHeadDelete(15)}
      </span>
      <span className="feeHeadActionBtnLabel">{labels.deleteLabel}</span>
    </button>
  </div>
);

export default FeeHeadRowActions;
