import { useState } from 'react';
import '../../../components/reusable/css/crmReusable.css';
import '../css/paymentsPage.css';
import { paymentsPageMock } from '../../../data/mocks/payments/paymentsPage.mock';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';
import {
  PageHeader,
  CrmButton,
  FormInput,
  FormSelect,
} from '../../../components/reusable/js/index';
import StatusPill from '../../../components/common/js/statusPill';

const PaymentsPage = () => {
  const {
    title,
    subtitle,
    collectForm,
    receiptPreview,
    recentPayments,
  } = paymentsPageMock;

  const [paymentMethod, setPaymentMethod] = useState(collectForm.defaultPaymentMethod);

  const selectedMethodLabel =
    collectForm.paymentMethods.find((m) => m.id === paymentMethod)?.label ?? 'UPI';

  return (
    <div className="crmListPage paymentsPage">
      <PageHeader title={title} subtitle={subtitle} className="paymentsPageHeader" />

      <section className="paymentsTopRow crmSectionAnimate">
        <article className="paymentsCollectCard">
          <h2 className="paymentsCardTitle">{collectForm.cardTitle}</h2>

          <div className="paymentsFormGrid">
            <FormSelect
              label={collectForm.studentLabel}
              options={collectForm.studentOptions}
              defaultValue={collectForm.defaultStudent}
            />
            <FormSelect
              label={collectForm.installmentLabel}
              options={collectForm.installmentOptions}
              defaultValue={collectForm.defaultInstallment}
            />
            <FormInput
              label={collectForm.amountLabel}
              type="text"
              defaultValue={collectForm.defaultAmount}
            />
            <FormInput
              label={collectForm.dateLabel}
              type="text"
              placeholder={collectForm.datePlaceholder}
              icon="calendar"
            />
          </div>

          <fieldset className="paymentsMethodFieldset">
            <legend className="crmFormLabel">{collectForm.paymentMethodLabel}</legend>
            <div className="paymentsMethodTiles" role="radiogroup" aria-label={collectForm.paymentMethodLabel}>
              {collectForm.paymentMethods.map((method) => {
                const isSelected = paymentMethod === method.id;
                return (
                  <label
                    key={method.id}
                    className={`paymentsMethodTile${isSelected ? ' paymentsMethodTileSelected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={isSelected}
                      onChange={() => setPaymentMethod(method.id)}
                      className="paymentsMethodInput"
                    />
                    <span className="paymentsMethodRadio" aria-hidden="true" />
                    <span className="paymentsMethodLabel">{method.label}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <FormInput
            label={collectForm.remarksLabel}
            placeholder={collectForm.remarksPlaceholder}
            className="paymentsRemarksField"
          />

          <div className="paymentsFormActions">
            <CrmButton variant="outline">{collectForm.actions.saveDraftLabel}</CrmButton>
            <CrmButton variant="primary" className="paymentsCollectBtn">
              {DashboardIcons.dollarSign(16)}
              {collectForm.actions.collectLabel}
            </CrmButton>
          </div>
        </article>

        <article className="paymentsReceiptCard">
          <div className="paymentsReceiptHeader">
            <h2 className="paymentsCardTitle">{receiptPreview.cardTitle}</h2>
            <div className="paymentsReceiptIconActions">
              <button type="button" className="paymentsReceiptIconBtn" aria-label={receiptPreview.printAriaLabel}>
                {DashboardIcons.printer(18)}
              </button>
              <button type="button" className="paymentsReceiptIconBtn" aria-label={receiptPreview.downloadAriaLabel}>
                {DashboardIcons.download(18)}
              </button>
            </div>
          </div>

          <dl className="paymentsReceiptMeta">
            {receiptPreview.rows.map((row) => (
              <div key={row.label} className="paymentsReceiptMetaRow">
                <dt>{row.label}</dt>
                <dd>{row.valueKey === 'method' ? selectedMethodLabel : row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="paymentsReceiptBreakdown">
            {receiptPreview.breakdown.map((line) => (
              <div key={line.label} className="paymentsReceiptBreakdownRow">
                <span>{line.label}</span>
                <span>{line.value}</span>
              </div>
            ))}
          </div>

          <div className="paymentsReceiptTotal">
            <span>{receiptPreview.totalLabel}</span>
            <span className="paymentsReceiptTotalValue">{receiptPreview.totalValue}</span>
          </div>

          <p className="paymentsReceiptFooter">{receiptPreview.footerNote}</p>
        </article>
      </section>

      <section className="paymentsTableCard crmSectionAnimate paymentsSectionDelay1">
        <h2 className="paymentsTableTitle">{recentPayments.sectionTitle}</h2>
        <div className="paymentsTableWrap">
          <table className="crmTable paymentsTable">
            <thead>
              <tr>
                {recentPayments.columns.map((col) => (
                  <th key={col || 'action'}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentPayments.rows.map((row, index) => (
                <tr key={row.id} className={index % 2 === 1 ? 'paymentsTableRowAlt' : ''}>
                  <td className="crmTableId">{row.receipt}</td>
                  <td>
                    <span className="crmTableStrong">{row.studentName}</span>
                    <span className="paymentsStudentSub">{row.studentClass}</span>
                  </td>
                  <td>{row.amount}</td>
                  <td>{row.method}</td>
                  <td className="paymentsTableDate">{row.date}</td>
                  <td>
                    <StatusPill status={row.status} />
                  </td>
                  <td className="paymentsTableActionCell">
                    <button type="button" className="paymentsReceiptLink">
                      {DashboardIcons.download(14)}
                      {recentPayments.receiptActionLabel}
                    </button>
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

export default PaymentsPage;
