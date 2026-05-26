import { useCallback, useEffect } from 'react';
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
import ScholarshipSchemeDetailModal from './scholarshipSchemeDetailModal';
import ScholarshipSchemeFormModal from './scholarshipSchemeFormModal';
import { useScholarshipSchemes } from '../hooks/useScholarshipSchemes';
import { useMeritBands } from '../hooks/useMeritBands';
import { useScholarshipSchemeDetail } from '../hooks/useScholarshipSchemeDetail';
import { useCreateScholarshipForm } from '../hooks/useCreateScholarshipForm';
import { useScholarshipFeeHeadOptions } from '../hooks/useScholarshipFeeHeadOptions';
import { useMasterDataSelect } from '../../../hooks/useMasterDataSelect';
import { MASTER_DATA_KEYS } from '../../../utils/masterDataOptions';
import { DISCOUNT_TYPE } from '../../../utils/scholarshipSchemeFormUtils';

const ScholarshipsPage = () => {
  const {
    title,
    subtitle,
    actions,
    schemes: schemesCopy,
    createScheme,
    schemeDetail,
    meritBands,
    pendingRequests,
  } = scholarshipsPageMock;

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
    scheme: detailScheme,
    isLoading: detailLoading,
    loadError: detailError,
    openScheme,
    closeScheme,
    isOpen: isDetailOpen,
  } = useScholarshipSchemeDetail(schemeDetail);

  const {
    isOpen: isCreateOpen,
    openModal: openCreateModal,
    closeModal: closeCreateModal,
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

  const { options: createAcademicYearOptions, isLoading: createYearLoading } = useMasterDataSelect(
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
  } = useScholarshipFeeHeadOptions(createScheme.feeHeads, { enabled: isCreateOpen });

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

  const handleOpenCreateModal = useCallback(() => {
    const defaultYear =
      academicYearId
      || pickDefaultOption(createAcademicYearOptions)
      || '';
    const defaultSchemeType = pickDefaultOption(schemeTypeOptions, 'MERIT');
    const defaultDiscountType = pickDefaultOption(discountTypeOptions, DISCOUNT_TYPE.percentage);
    const defaultApplicableTo = pickDefaultOption(applicableToOptions, 'TUITION_ONLY');

    resetCreate({
      schemeType: defaultSchemeType,
      discountType: defaultDiscountType,
      applicableTo: defaultApplicableTo,
      academicYearId: defaultYear,
    });
    setCreateSuccessMessage('');
    refetchFeeHeads();
    openCreateModal();
  }, [
    academicYearId,
    applicableToOptions,
    createAcademicYearOptions,
    discountTypeOptions,
    openCreateModal,
    refetchFeeHeads,
    resetCreate,
    schemeTypeOptions,
    setCreateSuccessMessage,
  ]);

  const handleCloseCreateModal = useCallback(() => {
    closeCreateModal();
    resetCreate();
    setCreateSuccessMessage('');
  }, [closeCreateModal, resetCreate, setCreateSuccessMessage]);

  const bannerMessage = createSuccessMessage;

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
            <button
              type="button"
              className="scholarshipsSchemeEdit"
              onClick={() => openScheme(scheme)}
            >
              {actions.editSchemeLabel}
            </button>
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
        isOpen={isCreateOpen}
        copy={createScheme}
        form={createForm}
        errors={createErrors}
        isSubmitting={isCreating}
        schemeTypeOptions={schemeTypeOptions}
        schemeTypeLoading={schemeTypeLoading}
        discountTypeOptions={discountTypeOptions}
        discountTypeLoading={discountTypeLoading}
        applicableToOptions={applicableToOptions}
        applicableToLoading={applicableToLoading}
        academicYearOptions={createAcademicYearOptions}
        academicYearLoading={createYearLoading}
        feeHeadOptions={feeHeadOptions}
        feeHeadLoading={feeHeadLoading}
        onClose={handleCloseCreateModal}
        onChange={updateCreateField}
        onSubmit={handleCreateSubmit}
      />

      <ScholarshipSchemeDetailModal
        isOpen={isDetailOpen}
        copy={schemeDetail}
        scheme={detailScheme}
        isLoading={detailLoading}
        loadError={detailError}
        onClose={closeScheme}
      />
    </div>
  );
};

export default ScholarshipsPage;
