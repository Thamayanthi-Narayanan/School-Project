import '../../../components/reusable/css/crmReusable.css';
import '../css/invoicesPage.css';
import { invoicesPageMock } from '../../../data/mocks/invoices/invoicesPage.mock';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';
import { PageHeader, CrmButton } from '../../../components/reusable/js/index';

const InvoicesPage = () => {
  const {
    title,
    subtitle,
    actions,
    invoice,
  } = invoicesPageMock;

  return (
    <div className="crmListPage invoicesPage">
      <PageHeader title={title} subtitle={subtitle}>
        <CrmButton variant="outline">
          {DashboardIcons.printer(16)}
          {actions.printLabel}
        </CrmButton>
        <CrmButton variant="outline">
          {DashboardIcons.download(16)}
          {actions.downloadPdfLabel}
        </CrmButton>
        <CrmButton variant="primary">
          {DashboardIcons.plus(16)}
          {actions.newInvoiceLabel}
        </CrmButton>
      </PageHeader>

      <article className="invoiceDocument crmSectionAnimate">
        <header className="invoiceDocumentHeader">
          <div className="invoiceSchoolBlock">
            <span className="invoiceSchoolLogo" aria-hidden="true">
              {DashboardIcons.graduationCap(22)}
            </span>
            <div>
              <h2 className="invoiceSchoolName">{invoice.school.name}</h2>
              <p className="invoiceSchoolLine">{invoice.school.address}</p>
              <p className="invoiceSchoolLine">{invoice.school.gstin}</p>
              <p className="invoiceSchoolLine">{invoice.school.email}</p>
            </div>
          </div>
          <div className="invoiceMetaBlock">
            <span className="invoiceMetaLabel">{invoice.meta.label}</span>
            <p className="invoiceMetaNumber">{invoice.meta.number}</p>
            <p className="invoiceMetaDate">{invoice.meta.issued}</p>
            <p className="invoiceMetaDate">{invoice.meta.due}</p>
          </div>
        </header>

        <div className="invoiceDetailsRow">
          <div className="invoiceDetailBlock">
            <span className="invoiceDetailLabel">{invoice.billedTo.label}</span>
            <p className="invoiceDetailName">{invoice.billedTo.name}</p>
            <p className="invoiceDetailSub">{invoice.billedTo.detail}</p>
            <p className="invoiceDetailSub">{invoice.billedTo.phone}</p>
          </div>
          <div className="invoiceDetailBlock invoiceDetailBlockRight">
            <span className="invoiceDetailLabel">{invoice.academicYear.label}</span>
            <p className="invoiceDetailName">{invoice.academicYear.year}</p>
            <p className="invoiceDetailSub">{invoice.academicYear.quarter}</p>
          </div>
        </div>

        <table className="invoiceLineTable">
          <thead>
            <tr>
              {invoice.tableColumns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {invoice.lineItems.map((item) => (
              <tr key={item.id}>
                <td>{item.description}</td>
                <td>{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="invoiceSummary">
          {invoice.summary.map((row) => (
            <div
              key={row.id}
              className={`invoiceSummaryRow invoiceSummaryRow${row.type.charAt(0).toUpperCase() + row.type.slice(1)}`}
            >
              <span className="invoiceSummaryLabel">{row.label}</span>
              <span className="invoiceSummaryAmount">{row.amount}</span>
            </div>
          ))}
        </div>

        <p className="invoiceFooterNote">{invoice.footerNote}</p>
      </article>
    </div>
  );
};

export default InvoicesPage;
