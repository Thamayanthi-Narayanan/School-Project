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
  useModal,
} from '../../../components/reusable/js/index';
import FeeHeadFormFields from './feeHeadFormFields';
import FeeHeadFormModal from './feeHeadFormModal';
import FeeCategoriesViewTable from './feeCategoriesViewTable';
import EditFeeQuartersModal from './editFeeQuartersModal';
import DeleteFeeHeadModal from './deleteFeeHeadModal';
import ClearFeeAmountsModal from './clearFeeAmountsModal';
import { useCreateFeeHeadForm } from '../hooks/useCreateFeeHeadForm';
import { useEditFeeHeadForm } from '../hooks/useEditFeeHeadForm';
import { useEditFeeQuartersForm } from '../hooks/useEditFeeQuartersForm';
import { useFeeStructureCategories } from '../hooks/useFeeStructureCategories';
import { useMasterDataSelect } from '../../../hooks/useMasterDataSelect';
import { MASTER_DATA_KEYS } from '../../../utils/masterDataOptions';

const sectionIconMap = {
  plus: DashboardIcons.plus,
  eye: DashboardIcons.eye,
};

const emptyQuarters = { q1: '', q2: '', q3: '', q4: '' };

const FeeHeadPage = () => {
  const {
    title,
    subtitle,
    sections,
    defaultSection,
    actions,
    createFeeHead,
    editFeeHead,
    editFeeQuarters,
    deleteFeeHead,
    clearFeeAmounts,
    config,
    categories,
  } = feeStructurePageMock;

  const [activeSection, setActiveSection] = useState(defaultSection);
  const { isOpen: isEditOpen, openModal: openEditModal, closeModal: closeEditModal } = useModal();
  const { isOpen: isHeadEditOpen, openModal: openHeadEditModal, closeModal: closeHeadEditModal } = useModal();
  const [editTarget, setEditTarget] = useState(null);
  const [headEditTarget, setHeadEditTarget] = useState(null);
  const [clearAmountsTarget, setClearAmountsTarget] = useState(null);

  const {
    rows,
    isLoading,
    loadError,
    columnTotals,
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
    form: headEditForm,
    errors: headEditErrors,
    isSubmitting: isHeadUpdating,
    successMessage: headUpdateSuccessMessage,
    updateField: updateHeadEditField,
    handleSubmit: handleHeadEditSubmit,
    reset: resetHeadEdit,
    setSuccessMessage: setHeadUpdateSuccessMessage,
  } = useEditFeeHeadForm(editFeeHead, headEditTarget, refetchFeeHeads);

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

  const bannerMessage =
    createSuccessMessage
    || headUpdateSuccessMessage
    || updateSuccessMessage
    || deleteSuccessMessage;

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    if (sectionId === 'create') {
      resetCreate();
      setCreateSuccessMessage('');
    }
  };

  const handleCreateFormSubmit = async (event) => {
    event.preventDefault();
    const isSuccess = await handleCreateSubmit();
    if (isSuccess) {
      setActiveSection('view');
    }
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

  const handleOpenHeadEditModal = (row) => {
    setHeadEditTarget(row);
    resetHeadEdit();
    setHeadUpdateSuccessMessage('');
    openHeadEditModal();
  };

  const handleCloseHeadEditModal = () => {
    closeHeadEditModal();
    setHeadEditTarget(null);
  };

  const handleOpenClearAmounts = (row) => {
    setClearAmountsTarget(row);
  };

  const handleCloseClearAmounts = () => {
    setClearAmountsTarget(null);
  };

  const handleConfirmClearAmounts = () => {
    if (!clearAmountsTarget?.id) return;
    updateRowQuarters(clearAmountsTarget.id, emptyQuarters);
    setClearAmountsTarget(null);
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

  return (
    <div className="crmListPage feeStructurePage">
      <PageHeader title={title} subtitle={subtitle} className="feeStructurePageHeader">
        <CrmButton variant="primary">
          {DashboardIcons.save(16)}
          {actions.saveLabel}
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

      <div className="feeStructurePageCard crmSectionAnimate feeStructureSectionDelay1">
        <nav className="feeStructurePageTabs" aria-label="Fee head sections">
          {sections.map((section) => {
            const Icon = sectionIconMap[section.icon];
            const isActive = activeSection === section.id;

            return (
              <button
                key={section.id}
                type="button"
                className={`feeStructurePageTab${isActive ? ' feeStructurePageTabActive' : ''}`}
                onClick={() => handleSectionChange(section.id)}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="feeStructurePageTabIcon" aria-hidden="true">
                  {Icon(14)}
                </span>
                {section.shortLabel}
              </button>
            );
          })}
        </nav>

        <div className="feeStructurePageBody">
          {bannerMessage ? (
            <p className="feeStructureCreateSuccess" role="status">
              {bannerMessage}
            </p>
          ) : null}

          {activeSection === 'create' ? (
            <>
              <form className="feeHeadInlineForm" onSubmit={handleCreateFormSubmit} noValidate>
                <section className="feeStructurePanelSection">
                  <h2 className="feeStructurePanelSectionTitle">{createFeeHead.sectionTitle}</h2>
                  <p className="feeStructurePanelSectionHint">{createFeeHead.sectionHint}</p>
                  {createErrors.general ? (
                    <p className="feeHeadModalError" role="alert">{createErrors.general}</p>
                  ) : null}
                  <FeeHeadFormFields
                    fields={createFeeHead.fields}
                    form={createForm}
                    errors={createErrors}
                    isSubmitting={isCreating}
                    onChange={updateCreateField}
                    variant="inline"
                  />
                </section>
                <footer className="feeStructurePageFormFooter">
                  <CrmButton variant="primary" type="submit" disabled={isCreating}>
                    {isCreating ? createFeeHead.submittingLabel : createFeeHead.submitLabel}
                  </CrmButton>
                </footer>
              </form>
              <section className="feeStructureViewSection feeStructureViewSectionBelowForm">
                <h2 className="feeStructureCategoriesTitle">{categories.sectionTitle}</h2>
                <FeeCategoriesViewTable
                  variant="create"
                  categories={categories}
                  rows={rows}
                  isLoading={isLoading}
                  loadError={loadError}
                  columnTotals={columnTotals}
                  getRowTotalDisplay={getRowTotalDisplay}
                  quarterAria={quarterAria}
                  onRetry={refetchFeeHeads}
                  onEditHead={handleOpenHeadEditModal}
                  onDeleteHead={openDeleteConfirm}
                />
              </section>
            </>
          ) : (
            <section className="feeStructureViewSection">
              <h2 className="feeStructureCategoriesTitle">{categories.sectionTitle}</h2>
              <FeeCategoriesViewTable
                variant="view"
                categories={categories}
                rows={rows}
                isLoading={isLoading}
                loadError={loadError}
                columnTotals={columnTotals}
                getRowTotalDisplay={getRowTotalDisplay}
                quarterAria={quarterAria}
                onRetry={refetchFeeHeads}
                onEditHead={handleOpenHeadEditModal}
                onDeleteHead={openDeleteConfirm}
                onEditAmounts={handleOpenEditModal}
              />
            </section>
          )}
        </div>
      </div>

      <FeeHeadFormModal
        isOpen={isHeadEditOpen}
        copy={editFeeHead}
        form={headEditForm}
        errors={headEditErrors}
        isSubmitting={isHeadUpdating}
        titleId="feeHeadEditTitle"
        entityName={headEditTarget?.name}
        onClose={handleCloseHeadEditModal}
        onChange={updateHeadEditField}
        onSubmit={handleHeadEditSubmit}
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

      <ClearFeeAmountsModal
        isOpen={Boolean(clearAmountsTarget)}
        copy={clearFeeAmounts}
        categoryName={clearAmountsTarget?.name}
        onClose={handleCloseClearAmounts}
        onConfirm={handleConfirmClearAmounts}
      />
    </div>
  );
};

export default FeeHeadPage;
