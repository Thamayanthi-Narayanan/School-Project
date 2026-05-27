import '../../../components/reusable/css/crmReusable.css';
import '../css/scholarshipRequestsPage.css';
import { scholarshipRequestsPageMock } from '../../../data/mocks/scholarshipRequests/scholarshipRequestsPage.mock';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';
import { PageHeader, TableDateCell } from '../../../components/reusable/js/index';
import StatusPill from '../../../components/common/js/statusPill';

const ScholarshipRequestsPage = () => {
  const { title, subtitle, actions, table } = scholarshipRequestsPageMock;

  return (
    <div className="crmListPage scholarshipRequestsPage">
      <PageHeader title={title} subtitle={subtitle} className="scholarshipRequestsPageHeader" />

      <section className="scholarshipRequestsTableCard crmSectionAnimate">
        <h2 className="scholarshipRequestsTableTitle">{table.sectionTitle}</h2>
        <div className="scholarshipRequestsTableWrap">
          <table className="crmTable scholarshipRequestsTable">
            <thead>
              <tr>
                {table.columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={index % 2 === 1 ? 'scholarshipRequestsTableRowAlt' : ''}
                >
                  <td className="crmTableId">{row.id}</td>
                  <td className="crmTableStrong">{row.student}</td>
                  <td>{row.scheme}</td>
                  <td>{row.discount}</td>
                  <td className="scholarshipRequestsTableDate">
                    <TableDateCell date={row.date} />
                  </td>
                  <td>
                    <StatusPill status={row.status} type="scholarship" />
                  </td>
                  <td className="scholarshipRequestsTableActionCell">
                    {row.showActions ? (
                      <div className="scholarshipRequestsRowActions">
                        <button
                          type="button"
                          className="scholarshipRequestsActionBtn scholarshipRequestsActionBtnApprove"
                        >
                          {DashboardIcons.check(14)}
                          {actions.approveLabel}
                        </button>
                        <button
                          type="button"
                          className="scholarshipRequestsActionBtn scholarshipRequestsActionBtnReject scholarshipRequestsActionBtnRejectDesktop"
                        >
                          {DashboardIcons.xClose(14)}
                          {actions.rejectLabel}
                        </button>
                      </div>
                    ) : (
                      <button type="button" className="scholarshipRequestsViewLink">
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

export default ScholarshipRequestsPage;
