import { useState } from 'react';
import '../../../components/reusable/css/crmReusable.css';
import '../css/feeStructurePage.css';
import { feeStructurePageMock } from '../../../data/mocks/feeStructure/feeStructurePage.mock';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';
import {
  PageHeader,
  CrmButton,
  FormInput,
  FormSelect,
  TableRowActions,
  useModal,
} from '../../../components/reusable/js/index';
import { formatInrAmount } from '../../../utils/feeStructureAmounts';
import FeeHeadFormModal from './feeHeadFormModal';
import EditFeeQuartersModal from './editFeeQuartersModal';
import DeleteFeeHeadModal from './deleteFeeHeadModal';
import { useCreateFeeHeadForm } from '../hooks/useCreateFeeHeadForm';
import { useEditFeeQuartersForm } from '../hooks/useEditFeeQuartersForm';
import { useFeeStructureCategories } from '../hooks/useFeeStructureCategories';
import { useMasterDataSelect } from '../../../hooks/useMasterDataSelect';
import { MASTER_DATA_KEYS } from '../../../utils/masterDataOptions';

const formatQuarterCell = (value) => {
  const trimmed = String(value ?? '').trim();
  return trimmed === '' ? '—' : trimmed;
};

const FeeStructurePage = () => {
  const {
    title,
    subtitle,
    actions,
    createFeeHead,
    editFeeQuarters,
    deleteFeeHead,
    config,
    categories,
    scholarshipPreview,
    finalPayable,
  } = feeStructurePageMock;
  const { isOpen: isCreateOpen, openModal: openCreateModal, closeModal: closeCreateModal } = useModal();
  const { isOpen: isEditOpen, openModal: openEditModal, closeModal: closeEditModal } = useModal();
  const [editTarget, setEditTarget] = useState(null);

  const {
    rows,
    isLoading,
    loadError,
    columnTotals,
    grossTotalAmount,
    getRowTotalDisplay,
    updateRowQuarters,
    refetchFeeHeads,
    deleteTarget,
    isDeleting,
    deleteError,
    deleteSuccessMessage,
    openDeleteConfirm,
    closeDeleteConfirm,
    confirmDelete,
  } = useFeeStructureCategories(categories, deleteFeeHead);

  const {
    form: createForm,
    errors: createErrors,
    isSubmitting: isCreating,
    successMessage: createSuccessMessage,
    updateField: updateCreateField,
    handleSubmit: handleCreateSubmit,
    reset: resetCreate,
    setSuccessMessage: setCreateSuccessMessage,
  } = useCreateFeeHeadForm(createFeeHead, refetchFeeHeads);

  const {
    form: editForm,
    errors: editErrors,
    isSubmitting: isUpdating,
    successMessage: updateSuccessMessage,
    updateField: updateEditField,
    handleSubmit: handleEditSubmit,
    reset: resetEdit,
    setSuccessMessage: setUpdateSuccessMessage,
    previewTotal: editPreviewTotal,
  } = useEditFeeQuartersForm(editFeeQuarters, editTarget, updateRowQuarters);

  const bannerMessage = createSuccessMessage || updateSuccessMessage || deleteSuccessMessage;

  const grossTotalDisplay = grossTotalAmount != null
    ? formatInrAmount(grossTotalAmount)
    : finalPayable.grossTotalValue;

  const handleOpenCreateModal = () => {
    resetCreate();
    setCreateSuccessMessage('');
    openCreateModal();
  };

  const handleCloseCreateModal = () => {
    closeCreateModal();
  };

  const handleOpenEditModal = (row) => {
    setEditTarget(row);
    resetEdit();
    setUpdateSuccessMessage('');
    openEditModal();
  };

  const handleCloseEditModal = () => {
    closeEditModal();
    setEditTarget(null);
  };

  const { quarterAria } = categories;

  const { options: classOptions, isLoading: classLoading } = useMasterDataSelect(
    MASTER_DATA_KEYS.class,
    { useIdAsValue: true, loadingLabel: config.loadingLabel },
  );
  const { options: academicYearOptions, isLoading: yearLoading } = useMasterDataSelect(
    MASTER_DATA_KEYS.academicYear,
    { useIdAsValue: true, loadingLabel: config.loadingLabel },
  );
  const { options: installmentOptions, isLoading: installmentLoading } = useMasterDataSelect(
    MASTER_DATA_KEYS.feeBillingTerm,
    { loadingLabel: config.loadingLabel },
  );
  const { options: discountTypeOptions, isLoading: discountLoading } = useMasterDataSelect(
    MASTER_DATA_KEYS.discountType,
    { loadingLabel: config.loadingLabel },
  );
  const { options: schemeOptions, isLoading: schemeLoading } = useMasterDataSelect(
    MASTER_DATA_KEYS.schemeType,
    { loadingLabel: config.loadingLabel },
  );

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
            options={classOptions}
            defaultValue={classOptions[0]?.value}
            disabled={classLoading}
          />
          <FormSelect
            label={config.academicYearLabel}
            options={academicYearOptions}
            defaultValue={academicYearOptions[0]?.value}
            disabled={yearLoading}
          />
          <FormSelect
            label={config.installmentsLabel}
            options={installmentOptions}
            defaultValue={installmentOptions[0]?.value}
            disabled={installmentLoading}
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
          <CrmButton
            variant="outline"
            className="feeStructureAddCategoryBtn"
            onClick={handleOpenCreateModal}
          >
            {DashboardIcons.plus(16)}
            {actions.addCategoryLabel}
          </CrmButton>
        </div>
        {bannerMessage ? (
          <p className="feeStructureCreateSuccess" role="status">
            {bannerMessage}
          </p>
        ) : null}
        {loadError ? (
          <div className="feeStructureListError" role="alert">
            <p>{loadError}</p>
            <CrmButton variant="outline" onClick={refetchFeeHeads} disabled={isLoading}>
              {categories.list.retryLabel}
            </CrmButton>
          </div>
        ) : null}

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
              {isLoading && !loadError ? (
                <tr>
                  <td colSpan={categories.columns.length + 1} className="feeStructureListState">
                    {categories.list.loadingMessage}
                  </td>
                </tr>
              ) : null}
              {!isLoading && !loadError && rows.length === 0 ? (
                <tr>
                  <td colSpan={categories.columns.length + 1} className="feeStructureListState">
                    {categories.list.emptyMessage}
                  </td>
                </tr>
              ) : null}
              {!isLoading && !loadError && rows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <span className="feeStructureCellText feeStructureCategoryText">{row.name}</span>
                  </td>
                  <td>
                    <span className="feeStructureCellText">{formatQuarterCell(row.q1)}</span>
                  </td>
                  <td>
                    <span className="feeStructureCellText">{formatQuarterCell(row.q2)}</span>
                  </td>
                  <td>
                    <span className="feeStructureCellText">{formatQuarterCell(row.q3)}</span>
                  </td>
                  <td>
                    <span
                      className="feeStructureCellText"
                      aria-label={`${row.name} ${quarterAria.q4}`}
                    >
                      {formatQuarterCell(row.q4)}
                    </span>
                  </td>
                  <td className="feeStructureRowTotal">{getRowTotalDisplay(row)}</td>
                  <td className="feeStructureTableActionCell">
                    <TableRowActions
                      entityName={row.name}
                      showView={false}
                      onEdit={() => handleOpenEditModal(row)}
                      onDelete={() => openDeleteConfirm(row)}
                    />
                  </td>
                </tr>
              ))}
              {!isLoading && !loadError && rows.length > 0 ? (
              <tr className="feeStructureTotalsRow">
                <td className="feeStructureTotalsLabel">{categories.totalsRow.label}</td>
                <td>{columnTotals.q1}</td>
                <td>{columnTotals.q2}</td>
                <td>{columnTotals.q3}</td>
                <td>{columnTotals.q4}</td>
                <td className="feeStructureGrandTotal">{columnTotals.grandTotal}</td>
                <td />
              </tr>
              ) : null}
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
              options={discountTypeOptions}
              defaultValue={discountTypeOptions[0]?.value}
              disabled={discountLoading}
            />
            <FormInput
              label={scholarshipPreview.discountPercentLabel}
              type="text"
              defaultValue={scholarshipPreview.defaultDiscountPercent}
            />
            <FormSelect
              label={scholarshipPreview.schemeLabel}
              options={schemeOptions}
              defaultValue={schemeOptions[0]?.value}
              disabled={schemeLoading}
            />
          </div>
        </article>

        <article className="feeStructurePayableCard">
          <h2 className="feeStructureBottomCardTitle">{finalPayable.cardTitle}</h2>
          <dl className="feeStructurePayableList">
            <div className="feeStructurePayableRow">
              <dt>{finalPayable.grossTotalLabel}</dt>
              <dd>{grossTotalDisplay ?? finalPayable.grossTotalValue}</dd>
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

      <FeeHeadFormModal
        isOpen={isCreateOpen}
        copy={createFeeHead}
        form={createForm}
        errors={createErrors}
        isSubmitting={isCreating}
        titleId="feeHeadCreateTitle"
        onClose={handleCloseCreateModal}
        onChange={updateCreateField}
        onSubmit={handleCreateSubmit}
      />

      <EditFeeQuartersModal
        isOpen={isEditOpen}
        copy={editFeeQuarters}
        categoryName={editTarget?.name}
        form={editForm}
        errors={editErrors}
        isSubmitting={isUpdating}
        previewTotal={editPreviewTotal}
        onClose={handleCloseEditModal}
        onChange={updateEditField}
        onSubmit={handleEditSubmit}
      />

      <DeleteFeeHeadModal
        isOpen={Boolean(deleteTarget)}
        copy={deleteFeeHead}
        feeHeadName={deleteTarget?.name}
        isDeleting={isDeleting}
        errorMessage={deleteError}
        onClose={closeDeleteConfirm}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default FeeStructurePage;
