import '../../../components/reusable/css/crmReusable.css';
import '../css/feeStructurePage.css';
import { feeStructurePageMock } from '../../../data/mocks/feeStructure/feeStructurePage.mock';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';
import {
  PageHeader,
  CrmButton,
  FormInput,
  FormSelect,
} from '../../../components/reusable/js/index';

const FeeStructurePage = () => {
  const {
    title,
    subtitle,
    actions,
    config,
    categories,
    scholarshipPreview,
    finalPayable,
  } = feeStructurePageMock;

  return (
    <div className="crmListPage feeStructurePage">
      <PageHeader title={title} subtitle={subtitle} className="feeStructurePageHeader">
        <CrmButton variant="primary">
          {DashboardIcons.save(16)}
          {actions.saveStructureLabel}
        </CrmButton>
      </PageHeader>

      <section className="feeStructureConfigCard crmSectionAnimate">
        <div className="feeStructureConfigGrid">
          <FormSelect
            label={config.classLabel}
            options={config.classOptions}
            defaultValue={config.defaultClass}
          />
          <FormSelect
            label={config.academicYearLabel}
            options={config.academicYearOptions}
            defaultValue={config.defaultAcademicYear}
          />
          <FormSelect
            label={config.installmentsLabel}
            options={config.installmentsOptions}
            defaultValue={config.defaultInstallments}
          />
          <FormInput
            label={config.lateFeeLabel}
            type="text"
            defaultValue={config.defaultLateFee}
          />
        </div>
      </section>

      <section className="feeStructureCategoriesCard crmSectionAnimate feeStructureSectionDelay1">
        <div className="feeStructureCategoriesHeader">
          <h2 className="feeStructureCategoriesTitle">{categories.sectionTitle}</h2>
          <CrmButton variant="outline" className="feeStructureAddCategoryBtn">
            {DashboardIcons.plus(16)}
            {actions.addCategoryLabel}
          </CrmButton>
        </div>

        <div className="feeStructureTableWrap">
          <table className="feeStructureTable">
            <thead>
              <tr>
                {categories.columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
                <th className="feeStructureTableActionHead" aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {categories.rows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <input
                      type="text"
                      className="feeStructureCellInput feeStructureCategoryInput"
                      defaultValue={row.name}
                      aria-label={`${row.name} category`}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="feeStructureCellInput"
                      defaultValue={row.q1}
                      aria-label={`${row.name} Q1`}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="feeStructureCellInput"
                      defaultValue={row.q2}
                      aria-label={`${row.name} Q2`}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="feeStructureCellInput"
                      defaultValue={row.q3}
                      aria-label={`${row.name} Q3`}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="feeStructureCellInput"
                      defaultValue={row.q4}
                      aria-label={`${row.name} Q4`}
                    />
                  </td>
                  <td className="feeStructureRowTotal">{row.total}</td>
                  <td className="feeStructureTableActionCell">
                    <button
                      type="button"
                      className="feeStructureDeleteBtn"
                      aria-label={`Delete ${row.name}`}
                    >
                      {DashboardIcons.trash(16)}
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="feeStructureTotalsRow">
                <td className="feeStructureTotalsLabel">{categories.totalsRow.label}</td>
                <td>{categories.totalsRow.q1}</td>
                <td>{categories.totalsRow.q2}</td>
                <td>{categories.totalsRow.q3}</td>
                <td>{categories.totalsRow.q4}</td>
                <td className="feeStructureGrandTotal">{categories.totalsRow.grandTotal}</td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="feeStructureBottomRow crmSectionAnimate feeStructureSectionDelay2">
        <article className="feeStructureScholarshipCard">
          <h2 className="feeStructureBottomCardTitle">{scholarshipPreview.cardTitle}</h2>
          <div className="feeStructureScholarshipGrid">
            <FormSelect
              label={scholarshipPreview.discountTypeLabel}
              options={scholarshipPreview.discountTypeOptions}
              defaultValue={scholarshipPreview.defaultDiscountType}
            />
            <FormInput
              label={scholarshipPreview.discountPercentLabel}
              type="text"
              defaultValue={scholarshipPreview.defaultDiscountPercent}
            />
            <FormSelect
              label={scholarshipPreview.schemeLabel}
              options={scholarshipPreview.schemeOptions}
              defaultValue={scholarshipPreview.defaultScheme}
            />
          </div>
        </article>

        <article className="feeStructurePayableCard">
          <h2 className="feeStructureBottomCardTitle">{finalPayable.cardTitle}</h2>
          <dl className="feeStructurePayableList">
            <div className="feeStructurePayableRow">
              <dt>{finalPayable.grossTotalLabel}</dt>
              <dd>{finalPayable.grossTotalValue}</dd>
            </div>
            <div className="feeStructurePayableRow">
              <dt>{finalPayable.discountLabel}</dt>
              <dd className="feeStructurePayableDiscount">{finalPayable.discountValue}</dd>
            </div>
            <div className="feeStructurePayableRow feeStructurePayableRowHighlight">
              <dt>{finalPayable.payableLabel}</dt>
              <dd className="feeStructurePayableAmount">{finalPayable.payableValue}</dd>
            </div>
          </dl>
        </article>
      </section>
    </div>
  );
};

export default FeeStructurePage;
