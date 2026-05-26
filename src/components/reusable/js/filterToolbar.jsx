import '../css/crmReusable.css';
import { DashboardIcons } from '../../common/js/dashboardIcons';
import FormSearchBar from './formSearchBar';
import FormSelect from './formSelect';
import CrmButton from './crmButton';

const FilterToolbar = ({
  searchPlaceholder,
  searchAriaLabel,
  selects = [],
  showExport = false,
  exportAriaLabel = 'Export',
  className = '',
}) => (
  <div className={`crmFilterToolbar crmSectionAnimate crmSectionDelay1 ${className}`.trim()}>
    <FormSearchBar placeholder={searchPlaceholder} ariaLabel={searchAriaLabel} />
    {(selects.length > 0 || showExport) && (
      <div className="crmFilterToolbarRight">
        {selects.length > 0 && (
          <div className="crmFilterSelects">
            {selects.map((select) => (
              <FormSelect
                key={select.id}
                ariaLabel={select.ariaLabel}
                options={select.options}
                defaultValue={select.defaultValue}
                variant="filter"
              />
            ))}
          </div>
        )}
        {showExport && (
          <CrmButton variant="icon" className="crmFilterExportBtn" ariaLabel={exportAriaLabel}>
            {DashboardIcons.download(18)}
          </CrmButton>
        )}
      </div>
    )}
  </div>
);

export default FilterToolbar;
