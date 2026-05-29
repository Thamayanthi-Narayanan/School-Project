import { useMemo } from 'react';
import '../../../components/reusable/css/crmReusable.css';
import '../css/staffPage.css';
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
import { useMasterDataSelect } from '../../../hooks/useMasterDataSelect';
import { MASTER_DATA_KEYS } from '../../../utils/masterDataOptions';

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

  const { options: roleOptions, isLoading: roleLoading } = useMasterDataSelect(
    MASTER_DATA_KEYS.role,
    {
      includeEmpty: true,
      placeholder: addStaffModal.rolePlaceholder,
      loadingLabel: addStaffModal.loadingLabel,
    },
  );

  const addStaffModalData = useMemo(
    () => ({
      ...addStaffModal,
      fields: addStaffModal.fields.map((field) =>
        (field.type === 'select' ? { ...field, options: undefined } : field),
      ),
    }),
    [addStaffModal],
  );

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
            {staff.map((member) => (
              <tr
                key={member.id}
                className="crmTableRow"
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
        modalData={addStaffModalData}
        fieldOptionsMap={{
          role: roleOptions,
        }}
      />
    </div>
  );
};

export default StaffPage;
