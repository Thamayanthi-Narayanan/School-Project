import '../css/admissionPage.css';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';
import StatusPill from '../../../components/common/js/statusPill';
import { CrmButton } from '../../../components/reusable/js/index';

const AdmissionDocumentsStep = ({ upload, files }) => (
  <div className="admissionDocuments">
    <div className="admissionUploadZone">
      <span className="admissionUploadIcon" aria-hidden="true">
        {DashboardIcons.uploadCloud(28)}
      </span>
      <p className="admissionUploadTitle">{upload.title}</p>
      <p className="admissionUploadSubtext">{upload.subtext}</p>
      <CrmButton variant="outline" type="button" className="admissionBrowseBtn">
        {upload.browseLabel}
      </CrmButton>
    </div>

    <ul className="admissionFilesGrid">
      {files.map((file) => (
        <li key={file.id} className="admissionFileItem">
          <span className="admissionFileName">{file.name}</span>
          <StatusPill status={file.status} />
        </li>
      ))}
    </ul>
  </div>
);

export default AdmissionDocumentsStep;
