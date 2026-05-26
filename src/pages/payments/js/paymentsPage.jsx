import { useMemo, useState } from 'react';
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
import { useMasterDataSelect } from '../../../hooks/useMasterDataSelect';
import { MASTER_DATA_KEYS } from '../../../utils/masterDataOptions';

const PaymentsPage = () => {
  const {
    title,
    subtitle,
    collectForm,
    receiptPreview,
    recentPayments,
  } = paymentsPageMock;

  const { options: studentOptions, isLoading: studentsLoading } = useMasterDataSelect(
    MASTER_DATA_KEYS.user,
    { useIdAsValue: true, loadingLabel: collectForm.loadingLabel },
  );
  const { options: installmentOptions, isLoading: installmentLoading } = useMasterDataSelect(
    MASTER_DATA_KEYS.feeBillingTerm,
    { loadingLabel: collectForm.loadingLabel },
  );
  const { options: paymentModeOptions, isLoading: modesLoading } = useMasterDataSelect(
    MASTER_DATA_KEYS.paymentMode,
    { loadingLabel: collectForm.loadingLabel },
  );

  const paymentMethods = useMemo(
    () => paymentModeOptions.map((mode) => ({
      id: mode.value,
      label: mode.label,
    })),
    [paymentModeOptions],
  );

  const [paymentMethod, setPaymentMethod] = useState('');

  const effectiveMethod = paymentMethod || paymentMethods[0]?.id || '';

  const selectedMethodLabel =
    paymentMethods.find((m) => m.id === effectiveMethod)?.label ?? '—';

  return (
    <div className="crmListPage paymentsPage">
      <PageHeader title={title} subtitle={subtitle} className="paymentsPageHeader" />

      <section className="paymentsTopRow crmSectionAnimate">
        <article className="paymentsCollectCard">
          <h2 className="paymentsCardTitle">{collectForm.cardTitle}</h2>

          <div className="paymentsFormGrid">
            <FormSelect
              label={collectForm.studentLabel}
              options={studentOptions}
              defaultValue={studentOptions[0]?.value}
              disabled={studentsLoading}
            />
            <FormSelect
              label={collectForm.installmentLabel}
              options={installmentOptions}
              defaultValue={installmentOptions[0]?.value}
              disabled={installmentLoading}
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
              {modesLoading ? (
                <p className="paymentsMethodLoading">{collectForm.loadingLabel}</p>
              ) : (
                paymentMethods.map((method) => {
                  const isSelected = effectiveMethod === method.id;
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
                })
              )}
            </div>
          </fieldset>

          <FormInput
            label={collectForm.remarksLabel}
            placeholder={collectForm.remarksPlaceholder}
            className="crmFormFieldFull"
          />

          <div className="paymentsCollectActions">
            <CrmButton variant="outline">{collectForm.actions.saveDraftLabel}</CrmButton>
            <CrmButton variant="primary">
              {DashboardIcons.receipt(16)}
              {collectForm.actions.collectLabel}
            </CrmButton>
          </div>
        </article>

        <article className="paymentsReceiptCard">
          <div className="paymentsReceiptHeader">
            <h2 className="paymentsCardTitle">{receiptPreview.cardTitle}</h2>
            <div className="paymentsReceiptTools">
              <CrmButton variant="icon" ariaLabel={receiptPreview.printAriaLabel}>
                {DashboardIcons.printer(18)}
              </CrmButton>
              <CrmButton variant="icon" ariaLabel={receiptPreview.downloadAriaLabel}>
                {DashboardIcons.download(18)}
              </CrmButton>
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

          <ul className="paymentsReceiptBreakdown">
            {receiptPreview.breakdown.map((line) => (
              <li key={line.label} className="paymentsReceiptBreakdownRow">
                <span>{line.label}</span>
                <span>{line.value}</span>
              </li>
            ))}
          </ul>

          <div className="paymentsReceiptTotal">
            <span>{receiptPreview.totalLabel}</span>
            <strong>{receiptPreview.totalValue}</strong>
          </div>

          <p className="paymentsReceiptFooter">{receiptPreview.footerNote}</p>
        </article>
      </section>

      <section className="paymentsRecentSection crmSectionAnimate paymentsSectionDelay1">
        <h2 className="paymentsRecentTitle">{recentPayments.sectionTitle}</h2>
        <div className="paymentsTableWrap">
          <table className="crmTable paymentsTable">
            <thead>
              <tr>
                {recentPayments.columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentPayments.rows.map((row, index) => (
                <tr
                  key={row.id}
                  className="crmTableRow"
                  style={{ animationDelay: `${0.04 * index}s` }}
                >
                  <td className="crmTableId">{row.receipt}</td>
                  <td>
                    <span className="paymentsStudentName">{row.studentName}</span>
                    <span className="paymentsStudentClass">{row.studentClass}</span>
                  </td>
                  <td className="crmTableAmount">{row.amount}</td>
                  <td>{row.method}</td>
                  <td>{row.date}</td>
                  <td>
                    <StatusPill status={row.status} />
                  </td>
                  <td>
                    <CrmButton variant="icon" ariaLabel={`View receipt ${row.receipt}`}>
                      {DashboardIcons.eye(16)}
                    </CrmButton>
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
