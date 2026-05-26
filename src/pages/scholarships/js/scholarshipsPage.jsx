import { useCallback, useEffect, useState } from 'react';
import '../../../components/reusable/css/crmReusable.css';
import '../css/scholarshipsPage.css';
import { scholarshipsPageMock } from '../../../data/mocks/scholarships/scholarshipsPage.mock';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';
import {
  PageHeader,
  CrmButton,
  TableDateCell,
  useModal,
} from '../../../components/reusable/js/index';
import StatusPill from '../../../components/common/js/statusPill';
import MeritBandsSection from './meritBandsSection';
import ScholarshipSchemeFormModal from './scholarshipSchemeFormModal';
import DeleteScholarshipSchemeModal from './deleteScholarshipSchemeModal';
import { useScholarshipSchemes } from '../hooks/useScholarshipSchemes';
import { useMeritBands } from '../hooks/useMeritBands';
import { useCreateScholarshipForm } from '../hooks/useCreateScholarshipForm';
import { useEditScholarshipForm } from '../hooks/useEditScholarshipForm';
import { useScholarshipSchemeDelete } from '../hooks/useScholarshipSchemeDelete';
import { useScholarshipFeeHeadOptions } from '../hooks/useScholarshipFeeHeadOptions';
import { useMasterDataSelect } from '../../../hooks/useMasterDataSelect';
import { MASTER_DATA_KEYS } from '../../../utils/masterDataOptions';
import { getScholarshipById } from '../../../apis/scholarshipsApi';
import { parseApiError } from '../../../utils/apiError';
import { getSchemeId } from '../../../utils/scholarshipMapper';
import { DISCOUNT_TYPE } from '../../../utils/scholarshipSchemeFormUtils';

const ScholarshipsPage = () => {
  const {
    title,
    subtitle,
    actions,
    schemes: schemesCopy,
    createScheme,
    editScheme,
    deleteScheme,
    meritBands,
    pendingRequests,
  } = scholarshipsPageMock;

  const [formMode, setFormMode] = useState(null);
  const [editLoadError, setEditLoadError] = useState(null);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [editingSchemeName, setEditingSchemeName] = useState('');

  const {
    schemes,
    isLoading: schemesLoading,
    loadError: schemesError,
    refetchSchemes,
  } = useScholarshipSchemes(schemesCopy.list);

  const {
    academicYearId,
    setAcademicYearId,
    rows: meritBandRows,
    isLoading: bandsLoading,
    loadError: bandsError,
    refetchBands,
    marks,
    setMarks,
    preview,
    previewError,
    isResolving,
    resolvePreview,
  } = useMeritBands(meritBands);

  const {
    isOpen: isFormOpen,
    openModal: openFormModal,
    closeModal: closeFormModal,
  } = useModal();

  const {
    form: createForm,
    errors: createErrors,
    isSubmitting: isCreating,
    successMessage: createSuccessMessage,
    updateField: updateCreateField,
    handleSubmit: handleCreateSubmit,
    reset: resetCreate,
    setSuccessMessage: setCreateSuccessMessage,
  } = useCreateScholarshipForm(createScheme, refetchSchemes);

  const [editTarget, setEditTarget] = useState(null);

  const {
    form: editForm,
    errors: editErrors,
    isSubmitting: isUpdating,
    successMessage: updateSuccessMessage,
    updateField: updateEditField,
    handleSubmit: handleEditSubmit,
    reset: resetEdit,
    setSuccessMessage: setUpdateSuccessMessage,
  } = useEditScholarshipForm(editScheme, editTarget, refetchSchemes);

  const {
    deleteTarget,
    isDeleting,
    deleteError,
    deleteSuccessMessage,
    openDeleteConfirm,
    closeDeleteConfirm,
    confirmDelete,
    setDeleteSuccessMessage,
  } = useScholarshipSchemeDelete(deleteScheme, refetchSchemes);

  const masterSelectConfig = {
    loadingLabel: createScheme.loadingLabel,
    includeEmpty: true,
  };

  const { options: academicYearOptions, isLoading: yearLoading } = useMasterDataSelect(
    MASTER_DATA_KEYS.academicYear,
    {
      ...masterSelectConfig,
      useIdAsValue: true,
      placeholder: createScheme.fields.academicYearId.placeholder,
      loadingLabel: meritBands.loadingLabel,
    },
  );

  const { options: schemeTypeOptions, isLoading: schemeTypeLoading } = useMasterDataSelect(
    MASTER_DATA_KEYS.schemeType,
    {
      ...masterSelectConfig,
      placeholder: createScheme.fields.schemeType.placeholder,
    },
  );

  const { options: discountTypeOptions, isLoading: discountTypeLoading } = useMasterDataSelect(
    MASTER_DATA_KEYS.discountType,
    {
      ...masterSelectConfig,
      placeholder: createScheme.fields.discountType.placeholder,
    },
  );

  const { options: applicableToOptions, isLoading: applicableToLoading } = useMasterDataSelect(
    MASTER_DATA_KEYS.applicableTo,
    {
      ...masterSelectConfig,
      placeholder: createScheme.fields.applicableTo.placeholder,
    },
  );

  const { options: formAcademicYearOptions, isLoading: formYearLoading } = useMasterDataSelect(
    MASTER_DATA_KEYS.academicYear,
    {
      ...masterSelectConfig,
      useIdAsValue: true,
      placeholder: createScheme.fields.academicYearId.placeholder,
    },
  );

  const {
    options: feeHeadOptions,
    isLoading: feeHeadLoading,
    refetchFeeHeads,
  } = useScholarshipFeeHeadOptions(createScheme.feeHeads, { enabled: isFormOpen });

  useEffect(() => {
    if (academicYearId || yearLoading || academicYearOptions.length === 0) return;
    const firstYear = academicYearOptions.find((option) => option.value)?.value;
    if (firstYear) {
      setAcademicYearId(firstYear);
    }
  }, [academicYearId, academicYearOptions, setAcademicYearId, yearLoading]);

  const pickDefaultOption = (options, preferredValue) => {
    const withValue = options.filter((option) => option.value);
    if (preferredValue) {
      const match = withValue.find((option) => option.value === preferredValue);
      if (match) return match.value;
    }
    return withValue[0]?.value ?? '';
  };

  const handleCloseFormModal = useCallback(() => {
    closeFormModal();
    setFormMode(null);
    setEditTarget(null);
    setEditLoadError(null);
    setIsEditLoading(false);
    setEditingSchemeName('');
    resetCreate();
    resetEdit();
    setCreateSuccessMessage('');
    setUpdateSuccessMessage('');
  }, [
    closeFormModal,
    resetCreate,
    resetEdit,
    setCreateSuccessMessage,
    setUpdateSuccessMessage,
  ]);

  const handleOpenCreateModal = useCallback(() => {
    const defaultYear =
      academicYearId
      || pickDefaultOption(formAcademicYearOptions)
      || '';

    resetCreate({
      schemeType: pickDefaultOption(schemeTypeOptions, 'MERIT'),
      discountType: pickDefaultOption(discountTypeOptions, DISCOUNT_TYPE.percentage),
      applicableTo: pickDefaultOption(applicableToOptions, 'TUITION_ONLY'),
      academicYearId: defaultYear,
    });
    setFormMode('create');
    setEditTarget(null);
    setEditLoadError(null);
    setCreateSuccessMessage('');
    refetchFeeHeads();
    openFormModal();
  }, [
    academicYearId,
    applicableToOptions,
    discountTypeOptions,
    formAcademicYearOptions,
    openFormModal,
    refetchFeeHeads,
    resetCreate,
    schemeTypeOptions,
    setCreateSuccessMessage,
  ]);

  const handleOpenEditModal = useCallback(async (scheme) => {
    const schemeId = getSchemeId(scheme?.raw) ?? scheme?.id;
    if (!schemeId) return;

    setFormMode('edit');
    setEditTarget(null);
    setEditLoadError(null);
    setEditingSchemeName(scheme.title || '');
    setUpdateSuccessMessage('');
    openFormModal();
    refetchFeeHeads();
    setIsEditLoading(true);

    try {
      const response = await getScholarshipById(schemeId);

      if (!response?.success) {
        setEditLoadError(response?.message || editScheme.loadFailed);
        return;
      }

      setEditTarget(response.data ?? {});
      setEditingSchemeName(response.data?.schemeName || scheme.title || '');
    } catch (error) {
      const { general, status } = parseApiError(error);
      setEditLoadError(
        status === 404
          ? editScheme.notFound
          : status === 403
            ? editScheme.accessDenied
            : status === 401
              ? editScheme.authFailed
              : general || editScheme.loadFailed,
      );
    } finally {
      setIsEditLoading(false);
    }
  }, [editScheme, openFormModal, refetchFeeHeads, setUpdateSuccessMessage]);

  const isCreateMode = formMode === 'create';
  const formCopy = isCreateMode ? createScheme : editScheme;
  const formState = isCreateMode ? createForm : editForm;
  const formErrors = isCreateMode ? createErrors : editErrors;
  const isFormSubmitting = isCreateMode ? isCreating : isUpdating;
  const handleFormSubmit = isCreateMode ? handleCreateSubmit : handleEditSubmit;
  const handleFormChange = isCreateMode ? updateCreateField : updateEditField;

  const bannerMessage =
    createSuccessMessage || updateSuccessMessage || deleteSuccessMessage;

  return (
    <div className="crmListPage scholarshipsPage">
      <PageHeader title={title} subtitle={subtitle} className="scholarshipsPageHeader">
        <CrmButton variant="primary" onClick={handleOpenCreateModal}>
          {DashboardIcons.plus(16)}
          {actions.newSchemeLabel}
        </CrmButton>
      </PageHeader>

      {bannerMessage ? (
        <p className="scholarshipsPageBanner" role="status">
          {bannerMessage}
        </p>
      ) : null}

      <section className="scholarshipsSchemes crmSectionAnimate" aria-busy={schemesLoading}>
        {schemesError ? (
          <div className="scholarshipsSchemesMessage scholarshipsListError" role="alert">
            <p>{schemesError}</p>
            <CrmButton variant="outline" onClick={refetchSchemes} disabled={schemesLoading}>
              {schemesCopy.list.retryLabel}
            </CrmButton>
          </div>
        ) : null}
        {schemesLoading && !schemesError ? (
          <p className="scholarshipsSchemesMessage scholarshipsListState">
            {schemesCopy.list.loadingMessage}
          </p>
        ) : null}
        {!schemesLoading && !schemesError && schemes.length === 0 ? (
          <p className="scholarshipsSchemesMessage scholarshipsListState">
            {schemesCopy.list.emptyMessage}
          </p>
        ) : null}
        {!schemesLoading && !schemesError && schemes.map((scheme) => (
          <article key={scheme.id} className="scholarshipsSchemeCard">
            <div className="scholarshipsSchemeTop">
              <h2 className="scholarshipsSchemeTitle">{scheme.title}</h2>
              <span className="scholarshipsSchemeBadge">{scheme.badge}</span>
            </div>
            <p className="scholarshipsSchemeDesc">{scheme.description}</p>
            <div className="scholarshipsSchemeCardActions">
              <button
                type="button"
                className="scholarshipsSchemeEdit"
                onClick={() => handleOpenEditModal(scheme)}
              >
                {actions.editSchemeLabel}
              </button>
              <button
                type="button"
                className="scholarshipsSchemeDelete"
                aria-label={`Delete ${scheme.title}`}
                onClick={() => openDeleteConfirm(scheme)}
              >
                {DashboardIcons.trash(16)}
              </button>
            </div>
          </article>
        ))}
      </section>

      <MeritBandsSection
        copy={meritBands}
        academicYearOptions={academicYearOptions}
        academicYearId={academicYearId}
        onAcademicYearChange={setAcademicYearId}
        yearLoading={yearLoading}
        rows={meritBandRows}
        isLoading={bandsLoading}
        loadError={bandsError}
        onRetry={refetchBands}
        columns={meritBands.columns}
        marks={marks}
        onMarksChange={setMarks}
        preview={preview}
        previewError={previewError}
        isResolving={isResolving}
        onPreview={resolvePreview}
        previewCopy={meritBands.preview}
      />

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

      <ScholarshipSchemeFormModal
        isOpen={isFormOpen}
        copy={formCopy}
        form={formState}
        errors={formErrors}
        isSubmitting={isFormSubmitting}
        isFormLoading={!isCreateMode && isEditLoading}
        loadError={!isCreateMode ? editLoadError : null}
        schemeName={editingSchemeName}
        titleId={isCreateMode ? 'scholarshipSchemeCreateTitle' : 'scholarshipSchemeEditTitle'}
        schemeTypeOptions={schemeTypeOptions}
        schemeTypeLoading={schemeTypeLoading}
        discountTypeOptions={discountTypeOptions}
        discountTypeLoading={discountTypeLoading}
        applicableToOptions={applicableToOptions}
        applicableToLoading={applicableToLoading}
        academicYearOptions={formAcademicYearOptions}
        academicYearLoading={formYearLoading}
        feeHeadOptions={feeHeadOptions}
        feeHeadLoading={feeHeadLoading}
        onClose={handleCloseFormModal}
        onChange={handleFormChange}
        onSubmit={handleFormSubmit}
      />

      <DeleteScholarshipSchemeModal
        isOpen={Boolean(deleteTarget)}
        copy={deleteScheme}
        schemeName={deleteTarget?.title || deleteTarget?.raw?.schemeName}
        isDeleting={isDeleting}
        errorMessage={deleteError}
        onClose={closeDeleteConfirm}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default ScholarshipsPage;
