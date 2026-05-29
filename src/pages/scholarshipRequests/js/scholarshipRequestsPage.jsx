import { useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../../components/reusable/css/crmReusable.css';
import '../../../components/common/css/notificationListItem.css';
import '../css/scholarshipRequestsPage.css';
import { scholarshipRequestsPageMock } from '../../../data/mocks/scholarshipRequests/scholarshipRequestsPage.mock';
import { routePaths } from '../../../constants/routePaths';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';
import { PageHeader, TableDateCell } from '../../../components/reusable/js/index';
import StatusPill from '../../../components/common/js/statusPill';
import NotificationListItem from '../../../components/common/js/notificationListItem';

const ScholarshipRequestsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, subtitle, actions, table, notificationSection } = scholarshipRequestsPageMock;

  const fromNotification = location.state?.fromNotification ?? null;
  const highlightedApplicationId = location.state?.highlightedApplicationId ?? null;

  useEffect(() => {
    if (!fromNotification || !highlightedApplicationId) return undefined;

    const rowId = `scholarship-request-${highlightedApplicationId}`;
    const timer = window.setTimeout(() => {
      document.getElementById(rowId)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 150);

    return () => window.clearTimeout(timer);
  }, [fromNotification, highlightedApplicationId]);

  const tableRows = useMemo(() => {
    if (!fromNotification?.payload) return table.rows;

    const payload = fromNotification.payload;
    const applicationId = highlightedApplicationId;

    const exists = table.rows.some((row) => row.applicationId === applicationId);
    if (exists) return table.rows;

    const discount =
      payload.approvedDiscountPercent != null
        ? `${payload.approvedDiscountPercent}%`
        : payload.requestedDiscountPercent != null
          ? `${payload.requestedDiscountPercent}%`
          : table.emptyValueFallback;

    return [
      {
        id: `APP-${applicationId}`,
        applicationId,
        student: payload.studentName || table.emptyValueFallback,
        scheme: payload.schemeName || table.emptyValueFallback,
        discount,
        date: fromNotification.timeLabel || table.emptyValueFallback,
        status:
          payload.status === 'PENDING'
            ? table.pendingStatusLabel
            : payload.status || table.pendingStatusLabel,
        showActions: payload.status === 'PENDING',
      },
      ...table.rows,
    ];
  }, [fromNotification, highlightedApplicationId, table.rows]);

  return (
    <div className="crmListPage scholarshipRequestsPage">
      <PageHeader title={title} subtitle={subtitle} className="scholarshipRequestsPageHeader" />

      {fromNotification ? (
        <section className="scholarshipRequestsNotificationCard crmSectionAnimate">
          <div className="scholarshipRequestsNotificationCardHeader">
            <h2 className="scholarshipRequestsNotificationCardTitle">
              {notificationSection.title}
            </h2>
            <Link
              to={routePaths.notifications}
              className="scholarshipRequestsNotificationBackLink"
            >
              {notificationSection.backLabel}
            </Link>
          </div>
          <div className="scholarshipRequestsNotificationItemWrap">
            <NotificationListItem item={fromNotification} isLast isActive />
          </div>
        </section>
      ) : null}

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
              {tableRows.map((row, index) => {
                const isHighlighted =
                  highlightedApplicationId != null
                  && row.applicationId === highlightedApplicationId;

                return (
                  <tr
                    key={row.id}
                    id={isHighlighted ? `scholarship-request-${row.applicationId}` : undefined}
                    className={[
                      index % 2 === 1 ? 'scholarshipRequestsTableRowAlt' : '',
                      isHighlighted ? 'scholarshipRequestsTableRowHighlight' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
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
                        <button
                          type="button"
                          className="scholarshipRequestsViewLink"
                          onClick={() =>
                            navigate(routePaths.notifications)
                          }
                        >
                          {actions.viewLabel}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ScholarshipRequestsPage;
