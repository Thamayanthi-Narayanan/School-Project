import {
  CrmButton,
  FormInput,
  FormSelect,
} from '../../../components/reusable/js/index';

const MeritBandsSection = ({
  copy,
  academicYearOptions,
  academicYearId,
  onAcademicYearChange,
  yearLoading,
  rows,
  isLoading,
  loadError,
  onRetry,
  columns,
  marks,
  onMarksChange,
  preview,
  previewError,
  isResolving,
  onPreview,
  previewCopy,
}) => (
  <section className="scholarshipsMeritCard crmSectionAnimate scholarshipsSectionDelay05">
    <div className="scholarshipsMeritHeader">
      <div>
        <h2 className="scholarshipsMeritTitle">{copy.sectionTitle}</h2>
        <p className="scholarshipsMeritHint">{copy.sectionHint}</p>
      </div>
      <div className="scholarshipsMeritYearField">
        <FormSelect
          label={copy.academicYearLabel}
          options={academicYearOptions}
          value={academicYearId}
          onChange={(event) => onAcademicYearChange(event.target.value)}
          disabled={yearLoading}
        />
      </div>
    </div>

    <div className="scholarshipsMeritBody">
      {loadError ? (
        <div className="scholarshipsListError" role="alert">
          <p>{loadError}</p>
          <CrmButton variant="outline" onClick={onRetry} disabled={isLoading}>
            {copy.list.retryLabel}
          </CrmButton>
        </div>
      ) : null}

      <div className="scholarshipsMeritTableWrap">
        <table className="crmTable scholarshipsMeritTable">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading && !loadError ? (
              <tr>
                <td colSpan={columns.length} className="scholarshipsListState">
                  {copy.list.loadingMessage}
                </td>
              </tr>
            ) : null}
            {!isLoading && !loadError && !academicYearId ? (
              <tr>
                <td colSpan={columns.length} className="scholarshipsListState">
                  {copy.list.selectYearMessage}
                </td>
              </tr>
            ) : null}
            {!isLoading && !loadError && academicYearId && rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="scholarshipsListState">
                  {copy.list.emptyMessage}
                </td>
              </tr>
            ) : null}
            {!isLoading && !loadError && rows.map((row, index) => (
              <tr
                key={row.id}
                className={index % 2 === 1 ? 'scholarshipsTableRowAlt' : ''}
              >
                <td className="crmTableStrong">{row.bandLabel}</td>
                <td>{row.minMark}</td>
                <td>{row.maxMark}</td>
                <td>{row.discountPercent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="scholarshipsMeritPreview">
        <h3 className="scholarshipsMeritPreviewTitle">{previewCopy.title}</h3>
        <p className="scholarshipsMeritPreviewHint">{previewCopy.hint}</p>
        <div className="scholarshipsMeritPreviewForm">
          <FormInput
            label={previewCopy.marksLabel}
            type="text"
            inputMode="decimal"
            placeholder={previewCopy.marksPlaceholder}
            value={marks}
            onChange={(event) => onMarksChange(event.target.value)}
          />
          <CrmButton
            variant="primary"
            type="button"
            className="scholarshipsMeritPreviewBtn"
            onClick={onPreview}
            disabled={isResolving || !academicYearId}
          >
            {isResolving ? previewCopy.previewingLabel : previewCopy.previewLabel}
          </CrmButton>
        </div>
        {previewError ? (
          <p className="scholarshipsListError" role="alert">{previewError}</p>
        ) : null}
        {preview && !previewError ? (
          <div
            className={`scholarshipsMeritPreviewResult${preview.matched ? '' : ' scholarshipsMeritPreviewResultMuted'}`}
            role="status"
          >
            {preview.matched ? (
              <>
                <p className="scholarshipsMeritPreviewResultMain">
                  {previewCopy.matchedLabel.replace('{band}', preview.bandLabel || '—')}
                </p>
                <p className="scholarshipsMeritPreviewResultSub">
                  {previewCopy.discountLabel.replace('{discount}', preview.discountPercent || '—')}
                  {' · '}
                  {previewCopy.marksResultLabel.replace('{marks}', String(preview.marks ?? marks))}
                </p>
              </>
            ) : (
              <p className="scholarshipsMeritPreviewResultMain">
                {previewCopy.noMatchLabel.replace('{marks}', String(preview.marks ?? marks))}
              </p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  </section>
);

export default MeritBandsSection;
