import '../../../components/reusable/css/crmReusable.css';
import '../css/scholarshipsPage.css';
import { scholarshipsPageMock } from '../../../data/mocks/scholarships/scholarshipsPage.mock';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';
import { PageHeader, CrmButton, TableDateCell } from '../../../components/reusable/js/index';
import StatusPill from '../../../components/common/js/statusPill';

const ScholarshipsPage = () => {
  const {
    title,
    subtitle,
    actions,
    schemes,
    pendingRequests,
  } = scholarshipsPageMock;

  return (
    <div className="crmListPage scholarshipsPage">
      <PageHeader title={title} subtitle={subtitle} className="scholarshipsPageHeader">
        <CrmButton variant="primary">
          {DashboardIcons.plus(16)}
          {actions.newSchemeLabel}
        </CrmButton>
      </PageHeader>

      <section className="scholarshipsSchemes crmSectionAnimate">
        {schemes.map((scheme) => (
          <article key={scheme.id} className="scholarshipsSchemeCard">
            <div className="scholarshipsSchemeTop">
              <h2 className="scholarshipsSchemeTitle">{scheme.title}</h2>
              <span className="scholarshipsSchemeBadge">{scheme.badge}</span>
            </div>
            <p className="scholarshipsSchemeDesc">{scheme.description}</p>
            <button type="button" className="scholarshipsSchemeEdit">
              {actions.editSchemeLabel}
            </button>
          </article>
        ))}
      </section>

      <section className="scholarshipsTableCard crmSectionAnimate scholarshipsSectionDelay1">
        <h2 className="scholarshipsTableTitle">{pendingRequests.sectionTitle}</h2>
        <div className="scholarshipsTableWrap">
          <table className="crmTable scholarshipsTable">
            <thead>
              <tr>
                {pendingRequests.columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pendingRequests.rows.map((row, index) => (
                <tr key={row.id} className={index % 2 === 1 ? 'scholarshipsTableRowAlt' : ''}>
                  <td className="crmTableId">{row.id}</td>
                  <td className="crmTableStrong">{row.student}</td>
                  <td>{row.scheme}</td>
                  <td>{row.discount}</td>
                  <td className="scholarshipsTableDate">
                    <TableDateCell date={row.date} />
                  </td>
                  <td>
                    <StatusPill status={row.status} type="scholarship" />
                  </td>
                  <td className="scholarshipsTableActionCell">
                    {row.showActions ? (
                      <div className="scholarshipsRowActions">
                        <button type="button" className="scholarshipsActionBtn scholarshipsActionBtnApprove">
                          {DashboardIcons.check(14)}
                          {actions.approveLabel}
                        </button>
                        <button
                          type="button"
                          className="scholarshipsActionBtn scholarshipsActionBtnReject scholarshipsActionBtnRejectDesktop"
                        >
                          {DashboardIcons.xClose(14)}
                          {actions.rejectLabel}
                        </button>
                      </div>
                    ) : (
                      <button type="button" className="scholarshipsViewLink">
                        {actions.viewLabel}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ScholarshipsPage;
