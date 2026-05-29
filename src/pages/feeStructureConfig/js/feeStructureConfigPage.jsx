import { useMemo, useState } from 'react';
import '../../../components/reusable/css/crmReusable.css';
import '../../feeStructure/css/feeStructurePage.css';
import '../css/feeStructureConfigPage.css';
import { feeStructureConfigPageMock } from '../../../data/mocks/feeStructureConfig/feeStructureConfigPage.mock';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';
import {
  PageHeader,
  CrmButton,
  FormSelect,
  FormSearchBar,
  useModal,
} from '../../../components/reusable/js/index';
import FeeCategoriesEditableTable from './feeCategoriesEditableTable';
import EditFeeQuartersModal from '../../feeStructure/js/editFeeQuartersModal';
import DeleteFeeHeadModal from '../../feeStructure/js/deleteFeeHeadModal';
import { useEditFeeQuartersForm } from '../../feeStructure/hooks/useEditFeeQuartersForm';
import { useFeeStructureConfigRows } from '../hooks/useFeeStructureConfigRows';
import { useMasterDataSelect } from '../../../hooks/useMasterDataSelect';
import { MASTER_DATA_KEYS } from '../../../utils/masterDataOptions';
import {
  sumColumnForRows,
  formatInrOrDash,
  tableHasAnyQuarterInput,
} from '../../../utils/feeStructureAmounts';

const FeeStructureConfigPage = () => {
  const {
    title,
    subtitle,
    actions,
    config,
    categories,
    editFeeQuarters,
    deleteCategory,
  } = feeStructureConfigPageMock;

  const { isOpen: isEditOpen, openModal: openEditModal, closeModal: closeEditModal } = useModal();
  const [editTarget, setEditTarget] = useState(null);

  const {
    rows,
    allRows,
    isLoading,
    loadError,
    getRowTotalDisplay,
    updateRow,
    updateRowQuarters,
    addRow,
    refetchFeeHeads,
    searchQuery,
    setSearchQuery,
    handleDeleteRow,
    deleteTarget,
    isDeleting,
    deleteError,
    deleteSuccessMessage,
    closeDeleteConfirm,
    confirmDelete,
  } = useFeeStructureConfigRows(categories, deleteCategory);

  const columnTotals = useMemo(() => {
    const q1 = sumColumnForRows(allRows, 'q1');
    const q2 = sumColumnForRows(allRows, 'q2');
    const q3 = sumColumnForRows(allRows, 'q3');
    const q4 = sumColumnForRows(allRows, 'q4');
    const hasInput = tableHasAnyQuarterInput(allRows);

    return {
      q1: hasInput ? formatInrOrDash(q1) : categories.emptyValueFallback,
      q2: hasInput ? formatInrOrDash(q2) : categories.emptyValueFallback,
      q3: hasInput ? formatInrOrDash(q3) : categories.emptyValueFallback,
      q4: hasInput ? formatInrOrDash(q4) : categories.emptyValueFallback,
      grandTotal: hasInput ? formatInrOrDash(q1 + q2 + q3 + q4) : categories.emptyValueFallback,
    };
  }, [allRows]);

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

  const handleChangeCategory = (rowId, name) => {
    updateRow(rowId, { name });
  };

  const handleChangeQuarter = (rowId, key, value) => {
    updateRowQuarters(rowId, { [key]: value });
  };

  const bannerMessage = updateSuccessMessage || deleteSuccessMessage;

  return (
    <div className="crmListPage feeStructurePage feeStructureConfigPage">
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
          <div className="crmFormField">
            <label className="crmFormLabel">
              {config.searchLabel}
            </label>
            <FormSearchBar
              placeholder={config.searchPlaceholder}
              ariaLabel={config.searchAriaLabel}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="feeStructurePageCard crmSectionAnimate feeStructureSectionDelay1">
        <div className="feeStructurePageBody">
          {bannerMessage ? (
            <p className="feeStructureCreateSuccess" role="status">
              {bannerMessage}
            </p>
          ) : null}

          <header className="feeStructureCategoriesHeader">
            <h2 className="feeStructureCategoriesTitle">{categories.sectionTitle}</h2>
            <CrmButton
              variant="outline"
              className="feeStructureAddCategoryBtn"
              onClick={addRow}
              disabled={isLoading}
            >
              {DashboardIcons.plus(16)}
              {categories.addCategoryLabel}
            </CrmButton>
          </header>

          <FeeCategoriesEditableTable
            categories={categories}
            rows={rows}
            isLoading={isLoading}
            loadError={loadError}
            columnTotals={columnTotals}
            getRowTotalDisplay={getRowTotalDisplay}
            quarterAria={categories.quarterAria}
            onRetry={refetchFeeHeads}
            onChangeCategory={handleChangeCategory}
            onChangeQuarter={handleChangeQuarter}
            onEditRow={handleOpenEditModal}
            onDeleteRow={handleDeleteRow}
          />
        </div>
      </section>

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
        copy={deleteCategory}
        feeHeadName={deleteTarget?.name}
        isDeleting={isDeleting}
        errorMessage={deleteError}
        onClose={closeDeleteConfirm}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default FeeStructureConfigPage;
