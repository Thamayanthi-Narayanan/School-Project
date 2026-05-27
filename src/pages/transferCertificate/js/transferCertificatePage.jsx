import '../../../components/reusable/css/crmReusable.css';
import '../css/transferCertificatePage.css';
import { transferCertificatePageMock } from '../../../data/mocks/transferCertificate/transferCertificatePage.mock';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';
import {
  PageHeader,
  CrmButton,
  FormInput,
  FormSelect,
  FormTextarea,
} from '../../../components/reusable/js/index';
import { useMasterDataSelect } from '../../../hooks/useMasterDataSelect';
import { MASTER_DATA_KEYS } from '../../../utils/masterDataOptions';

const TransferCertificatePage = () => {
  const { title, subtitle, issueForm, preview } = transferCertificatePageMock;

  const { options: studentOptions, isLoading: studentsLoading } = useMasterDataSelect(
    MASTER_DATA_KEYS.user,
    { useIdAsValue: true, loadingLabel: issueForm.loadingLabel },
  );

  return (
    <div className="crmListPage transferCertificatePage">
      <PageHeader title={title} subtitle={subtitle} className="transferCertificatePageHeader" />

      <section className="transferCertificateRow crmSectionAnimate">
        <article className="transferCertificateIssueCard">
          <h2 className="transferCertificateCardTitle">{issueForm.cardTitle}</h2>

          <FormSelect
            label={issueForm.studentLabel}
            options={studentOptions}
            defaultValue={studentOptions[0]?.value}
            className="crmFormFieldFull"
            disabled={studentsLoading}
          />

          <div className="transferCertificateDateGrid">
            <FormInput
              label={issueForm.leavingDateLabel}
              type="text"
              placeholder={issueForm.datePlaceholder}
              icon="calendar"
            />
            <FormInput
              label={issueForm.lastAttendedLabel}
              type="text"
              placeholder={issueForm.datePlaceholder}
              icon="calendar"
            />
          </div>

          <FormInput
            label={issueForm.reasonLabel}
            placeholder={issueForm.reasonPlaceholder}
            className="crmFormFieldFull"
          />

          <FormTextarea
            label={issueForm.remarksLabel}
            placeholder={issueForm.remarksPlaceholder}
            rows={4}
            className="transferCertificateRemarks"
          />

          <div className="transferCertificateIssueActions">
            <CrmButton variant="primary" className="transferCertificateGenerateBtn">
              {DashboardIcons.fileText(16)}
              {issueForm.generateLabel}
            </CrmButton>
          </div>
        </article>

        <article className="transferCertificatePreviewCard">
          <div className="transferCertificatePreviewHeader">
            <h2 className="transferCertificateCardTitle">{preview.cardTitle}</h2>
            <div className="transferCertificatePreviewActions">
              <CrmButton variant="outline">
                {DashboardIcons.printer(16)}
                {preview.printLabel}
              </CrmButton>
              <CrmButton variant="outline">
                {DashboardIcons.download(16)}
                {preview.downloadPdfLabel}
              </CrmButton>
            </div>
          </div>

          <div className="transferCertificateDocument">
            <header className="transferCertificateDocHeader">
              <span className="transferCertificateDocLogo" aria-hidden="true">
                {DashboardIcons.graduationCap(18)}
              </span>
              <div>
                <p className="transferCertificateDocSchoolName">{preview.school.name}</p>
                <p className="transferCertificateDocSchoolLine">{preview.school.address}</p>
                <p className="transferCertificateDocSchoolLine">{preview.school.affiliation}</p>
              </div>
            </header>

            <h3 className="transferCertificateDocTitle">{preview.documentTitle}</h3>
            <p className="transferCertificateDocMeta">{preview.meta}</p>

            <dl className="transferCertificateDocFields">
              {preview.fields.map((field) => (
                <div key={field.label} className="transferCertificateDocRow">
                  <dt>{field.label}</dt>
                  <dd>{field.value}</dd>
                </div>
              ))}
            </dl>

            <footer className="transferCertificateDocSignatures">
              <span>{preview.signatures.left}</span>
              <span>{preview.signatures.right}</span>
            </footer>
          </div>
        </article>
      </section>
    </div>
  );
};

export default TransferCertificatePage;
