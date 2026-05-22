import { useRef } from 'react';
import '../css/admissionPage.css';
import { CrmButton } from '../../../components/reusable/js/index';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';
import { PROFILE_PHOTO_ACCEPT } from '../../../utils/admissionForm';

const AdmissionDocumentsStep = ({ documents, fields, photoError, onPhotoSelect, onPhotoClear }) => {
  const inputRef = useRef(null);
  const hasPhoto = Boolean(documents.profilePhotoUrl);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      onPhotoSelect(file);
    }
    event.target.value = '';
  };

  return (
    <div className="admissionFormSections">
      <section className="admissionFormSection">
        <h3 className="admissionFormSectionTitle">{fields.sectionTitle}</h3>
        <p className="admissionFormSectionHint">{fields.sectionHint}</p>

        <div className="admissionPhotoUpload">
          {hasPhoto ? (
            <div className="admissionPhotoPreview">
              <img
                src={documents.profilePhotoUrl}
                alt="Student profile preview"
                className="admissionPhotoPreviewImg"
              />
              <div className="admissionPhotoPreviewMeta">
                <p className="admissionPhotoFileName">{documents.profilePhotoName}</p>
                <div className="admissionPhotoPreviewActions">
                  <CrmButton
                    variant="outline"
                    type="button"
                    onClick={() => inputRef.current?.click()}
                  >
                    {fields.changePhotoLabel}
                  </CrmButton>
                  <CrmButton variant="outline" type="button" onClick={onPhotoClear}>
                    {fields.removePhotoLabel}
                  </CrmButton>
                </div>
              </div>
            </div>
          ) : (
            <div className="admissionPhotoDropzone">
              <span className="admissionPhotoDropzoneIcon" aria-hidden="true">
                {DashboardIcons.uploadCloud(28)}
              </span>
              <p className="admissionPhotoDropzoneTitle">{fields.uploadTitle}</p>
              <p className="admissionPhotoDropzoneHint">{fields.uploadHint}</p>
              <CrmButton
                variant="outline"
                type="button"
                className="admissionPhotoBrowseBtn"
                onClick={() => inputRef.current?.click()}
              >
                {fields.browseLabel}
              </CrmButton>
            </div>
          )}

          <input
            ref={inputRef}
            type="file"
            className="admissionPhotoInputHidden"
            accept={PROFILE_PHOTO_ACCEPT}
            onChange={handleFileChange}
          />

          {photoError && (
            <p className="admissionPhotoError" role="alert">
              {photoError}
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdmissionDocumentsStep;
