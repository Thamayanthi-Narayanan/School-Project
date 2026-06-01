import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import '../../../components/reusable/css/crmReusable.css';
import '../css/studentDetailPage.css';
import { studentDetailPageMock } from '../../../data/mocks/studentDetail/studentDetailPage.mock';
import { routePaths } from '../../../constants/routePaths';
import StatusPill from '../../../components/common/js/statusPill';
import PersonCell from '../../../components/reusable/js/personCell';
import {
  CrmButton,
  DataTableCard,
} from '../../../components/reusable/js/index';

const StudentDetailPage = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    tabs,
    defaultTab,
    actions,
    feeLedger,
    personal,
    history,
    scholarship,
    studentsById,
    notFound,
  } = studentDetailPageMock;

  const tabFromUrl = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(() => (
    tabs.some((tab) => tab.id === tabFromUrl) ? tabFromUrl : defaultTab
  ));
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (tabFromUrl && tabs.some((tab) => tab.id === tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl, tabs]);

  const student = studentsById[studentId];

  if (!student) {
    return (
      <div className="crmListPage studentDetailPage">
        <div className="studentDetailNotFound crmSectionAnimate">
          <h1 className="crmPageTitle">{notFound.title}</h1>
          <p className="crmPageSubtitle">{notFound.message}</p>
          <CrmButton variant="primary" type="button" onClick={() => navigate(routePaths.students)}>
            {notFound.backLabel}
          </CrmButton>
        </div>
      </div>
    );
  }

  const hasFeeSetup = student.feeTerms && student.feeTerms.length > 0;

  return (
    <div className="crmListPage studentDetailPage">
      <header className="studentDetailHeader crmSectionAnimate">
        <div className="studentDetailIdentity">
          <PersonCell initials={student.initials} name={student.name} tone="blue" />
          <div className="studentDetailMeta">
            <p className="studentDetailAdmission">
              <span className="studentDetailMetaLabel">Admission No</span>
              <strong>{student.admissionNo}</strong>
            </p>
            <p className="studentDetailClassLine">
              {student.className}
              {' · '}
              Section
              {' '}
              {student.section}
              {' · '}
              {student.academicYear}
            </p>
          </div>
        </div>
        <StatusPill status={student.status} type="workflow" />
      </header>

      <div className="studentDetailTabs crmSectionAnimate studentDetailSectionDelay1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`studentDetailTab${activeTab === tab.id ? ' studentDetailTabActive' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'personal' && (
        <section className="studentDetailPanel crmSectionAnimate">
          <div className="studentDetailPanelActions">
            {!isEditing ? (
              <CrmButton variant="outline" type="button" onClick={() => setIsEditing(true)}>
                {actions.editLabel}
              </CrmButton>
            ) : (
              <>
                <CrmButton variant="outline" type="button" onClick={() => setIsEditing(false)}>
                  {actions.cancelLabel}
                </CrmButton>
                <CrmButton variant="primary" type="button" onClick={() => setIsEditing(false)}>
                  {actions.saveLabel}
                </CrmButton>
              </>
            )}
          </div>
          {personal.sections.map((section) => (
            <article key={section.id} className="studentDetailSection">
              <h2 className="studentDetailSectionTitle">{section.title}</h2>
              <dl className={`studentDetailFields${isEditing ? ' studentDetailFieldsEditing' : ''}`}>
                {section.fields.map((field) => (
                  <div
                    key={field.id}
                    className={`studentDetailField${field.fullWidth ? ' studentDetailFieldFull' : ''}`}
                  >
                    <dt>{field.label}</dt>
                    <dd>{student.personal[field.id] ?? '—'}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
          <div className="studentDetailDestructiveWrap">
            <CrmButton variant="outline" type="button" className="studentDetailDiscontinueBtn">
              {actions.discontinueLabel}
            </CrmButton>
          </div>
        </section>
      )}

      {activeTab === 'fees' && (
        <section className="studentDetailPanel crmSectionAnimate">
          {!hasFeeSetup && (
            <div className="studentDetailFeeEmpty">
              <p>{feeLedger.notSetupMessage}</p>
              <CrmButton
                variant="primary"
                type="button"
                onClick={() => navigate(routePaths.studentFeeSetup)}
              >
                {actions.setupFeeLabel}
              </CrmButton>
            </div>
          )}
          {hasFeeSetup && (
            <>
              <div className="studentDetailFeeActions">
                <Link className="studentDetailLink" to={routePaths.studentFeeSetup}>
                  {actions.setupFeeLabel}
                </Link>
                <button type="button" className="studentDetailLink">
                  {actions.viewPaymentHistoryLabel}
                </button>
              </div>
              {student.feeTerms.map((term) => (
                <article key={term.id} className="studentDetailTermCard">
                  <header className="studentDetailTermHeader">
                    <h2>{term.name}</h2>
                    <span className="studentDetailTermDue">{term.totalDue}</span>
                  </header>
                  <DataTableCard>
                    <table className="crmTable studentDetailFeeTable">
                      <thead>
                        <tr>
                          <th>FEE HEAD</th>
                          <th>ANNUAL</th>
                          <th>TERM %</th>
                          <th>TERM AMT</th>
                          <th>DISCOUNT</th>
                          <th>NET</th>
                          <th>PAID</th>
                          <th>BALANCE</th>
                          <th>STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {term.rows.map((row) => (
                          <tr key={`${term.id}-${row.feeHead}`} className="crmTableRow">
                            <td>{row.feeHead}</td>
                            <td>{row.annual}</td>
                            <td>{row.termPercent}</td>
                            <td>{row.termAmount}</td>
                            <td>{row.discount}</td>
                            <td>{row.net}</td>
                            <td>{row.paid}</td>
                            <td>{row.balance}</td>
                            <td>
                              <StatusPill status={row.status} type="fee" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </DataTableCard>
                </article>
              ))}
            </>
          )}
        </section>
      )}

      {activeTab === 'scholarship' && (
        <section className="studentDetailPanel crmSectionAnimate">
          <DataTableCard>
            <table className="crmTable">
              <thead>
                <tr>
                  {scholarship.columns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {student.scholarshipRows.length === 0 && (
                  <tr>
                    <td colSpan={5} className="studentDetailEmpty">
                      {scholarship.emptyMessage}
                    </td>
                  </tr>
                )}
                {student.scholarshipRows.map((row) => (
                  <tr key={row.scheme} className="crmTableRow">
                    <td>{row.scheme}</td>
                    <td>{row.type}</td>
                    <td>{row.discount}</td>
                    <td>
                      <StatusPill status={row.status} type="scholarship" />
                    </td>
                    <td>{row.validFrom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </DataTableCard>
        </section>
      )}

      {activeTab === 'history' && (
        <section className="studentDetailPanel crmSectionAnimate">
          <DataTableCard>
            <table className="crmTable">
              <thead>
                <tr>
                  {history.columns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {student.historyRows.length === 0 && (
                  <tr>
                    <td colSpan={4} className="studentDetailEmpty">
                      {history.emptyMessage}
                    </td>
                  </tr>
                )}
                {student.historyRows.map((row) => (
                  <tr key={`${row.academicYear}-${row.assignedDate}`} className="crmTableRow">
                    <td>{row.academicYear}</td>
                    <td>{row.className}</td>
                    <td>{row.section}</td>
                    <td>{row.assignedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </DataTableCard>
        </section>
      )}
    </div>
  );
};

export default StudentDetailPage;
