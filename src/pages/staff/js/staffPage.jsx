import '../../../components/reusable/css/crmReusable.css';
import { staffPageMock } from '../../../data/mocks/staff/staffPage.mock';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';
import {
  PageHeader,
  CrmButton,
  StaffSearchCard,
  DataTableCard,
  PersonCell,
  PhoneCell,
  TableRowActions,
  EntityFormModal,
  useModal,
} from '../../../components/reusable/js/index';

const StaffPage = () => {
  const {
    title,
    subtitle,
    actions,
    search,
    tableColumns,
    staff,
    addStaffModal,
  } = staffPageMock;

  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="crmListPage staffPage">
      <PageHeader title={title} subtitle={subtitle}>
        <CrmButton variant="primary" onClick={openModal}>
          {DashboardIcons.plus(16)}
          {actions.addStaffLabel}
        </CrmButton>
      </PageHeader>

      <StaffSearchCard placeholder={search.placeholder} ariaLabel={search.ariaLabel} />

      <DataTableCard>
        <table className="crmTable">
          <thead>
            <tr>
              {tableColumns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {staff.map((member, index) => (
              <tr
                key={member.id}
                className="crmTableRow"
                style={{ animationDelay: `${0.04 * index}s` }}
              >
                <td className="crmTableId">{member.id}</td>
                <td>
                  <PersonCell
                    initials={member.initials}
                    name={member.name}
                    tone={member.avatarTone}
                  />
                </td>
                <td>{member.role}</td>
                <td>{member.department}</td>
                <td className="crmTablePhone">
                  <PhoneCell phone={member.phone} />
                </td>
                <td className="crmTableSalary">{member.salary}</td>
                <td>
                  <TableRowActions entityName={member.name} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTableCard>

      <EntityFormModal
        isOpen={isOpen}
        onClose={closeModal}
        modalData={addStaffModal}
      />
    </div>
  );
};

export default StaffPage;
