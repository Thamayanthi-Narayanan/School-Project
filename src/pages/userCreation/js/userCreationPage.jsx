import { createPortal } from 'react-dom';
import '../../../components/reusable/css/crmReusable.css';
import '../css/userCreationPage.css';
import { userCreationPanelMock } from '../../../data/mocks/userCreation/userCreationPanel.mock';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';
import {
  CrmButton,
  DataTableCard,
  FormInput,
  FormSelect,
  PageHeader,
  PersonCell,
  PhoneCell,
  TableRowActions,
} from '../../../components/reusable/js/index';
import {
  formatUserDisplayId,
  getAvatarToneForUser,
  getUserInitials,
} from '../../../utils/userDisplay';
import { useUserCreationForm } from '../../../components/userCreation/hooks/useUserCreationForm';

const sectionIconMap = {
  userPlus: DashboardIcons.userPlus,
  eye: DashboardIcons.eye,
};

const avatarToneClassMap = {
  blue: 'crmAvatarBlue',
  sky: 'crmAvatarSky',
  green: 'crmAvatarGreen',
  orange: 'crmAvatarOrange',
  violet: 'crmAvatarViolet',
};

const AccountFields = ({
  fields,
  form,
  errors,
  updateField,
  roleOptions,
  isRoleSelectDisabled = false,
  autoFocus = false,
}) => (
  <div className="userCreationPanelGrid">
    <FormInput
      label={fields.userName.label}
      placeholder={fields.userName.placeholder}
      value={form.userName}
      onChange={(e) => updateField('userName', e.target.value)}
      error={errors.userName}
      autoFocus={autoFocus}
    />
    <FormInput
      label={fields.userEmail.label}
      type="email"
      placeholder={fields.userEmail.placeholder}
      value={form.userEmail}
      onChange={(e) => updateField('userEmail', e.target.value)}
      error={errors.userEmail}
    />
    <FormInput
      label={fields.userPhone.label}
      type="tel"
      placeholder={fields.userPhone.placeholder}
      value={form.userPhone}
      onChange={(e) => updateField('userPhone', e.target.value)}
      error={errors.userPhone}
    />
    <FormSelect
      label={fields.userRole.label}
      options={roleOptions}
      value={form.userRole}
      onChange={(e) => updateField('userRole', e.target.value)}
      error={errors.userRole}
      disabled={isRoleSelectDisabled}
    />
  </div>
);

const UsersViewTable = ({ users, labels, isLoading, onEdit, onDelete }) => {
  if (isLoading) {
    return <p className="userCreationLoadingState">{labels.loadingMessage}</p>;
  }

  if (!users.length) {
    return <p className="userCreationEmptyState">{labels.emptyMessage}</p>;
  }

  return (
    <div className="userCreationViewWrap">
      <DataTableCard className="userCreationTableCard">
        <table className="crmTable userCreationTable">
          <thead>
            <tr>
              {labels.tableColumns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className="crmTableRow userCreationTableRow"
                style={{ animationDelay: `${0.04 * index}s` }}
              >
                <td className="crmTableId">{formatUserDisplayId(user.id)}</td>
                <td>
                  <PersonCell
                    initials={getUserInitials(user.userName)}
                    name={user.userName}
                    subtext={user.username}
                    tone={getAvatarToneForUser(user.id)}
                  />
                </td>
                <td>{user.userRole}</td>
                <td className="userCreationTableEmail">{user.userEmail}</td>
                <td className="crmTablePhone">
                  <PhoneCell phone={user.userPhone} />
                </td>
                <td>
                  {user.status ? (
                    <span className="userCreationStatusBadge">{user.status}</span>
                  ) : (
                    '—'
                  )}
                </td>
                <td>
                  <TableRowActions
                    entityName={user.userName}
                    showView={false}
                    onEdit={() => onEdit(user.id)}
                    onDelete={() => onDelete(user.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTableCard>
    </div>
  );
};

const UserSuccessPopup = ({ popup, copy, onDismiss }) => {
  if (!popup) return null;

  const { user, userName, message } = popup;
  const displayName = user?.userName || userName;
  const displayRole = user?.userRole;

  return createPortal(
    <div
      className="userCreatedPopupOverlay"
      role="presentation"
      onClick={onDismiss}
    >
      <div
        className="userCreatedPopup"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="userSuccessPopupTitle"
        aria-describedby="userSuccessPopupDesc"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="userCreatedPopupIconWrap" aria-hidden="true">
          <span className="userCreatedPopupIconRing" />
          <span className="userCreatedPopupIcon">
            {DashboardIcons.check(28)}
          </span>
        </div>
        <h3 id="userSuccessPopupTitle" className="userCreatedPopupTitle">
          {copy.title}
        </h3>
        <p id="userSuccessPopupDesc" className="userCreatedPopupMessage">
          {message}
        </p>
        {displayName && (
          <div className="userCreatedPopupUser">
            <span className="userCreatedPopupUserName">{displayName}</span>
            {displayRole ? (
              <span className="userCreationRoleBadge">{displayRole}</span>
            ) : null}
          </div>
        )}
        <CrmButton variant="primary" type="button" onClick={onDismiss}>
          {copy.dismissLabel}
        </CrmButton>
      </div>
    </div>,
    document.body,
  );
};

const UserEditModal = ({
  isOpen,
  user,
  fields,
  form,
  errors,
  updateField,
  roleOptions,
  isRoleSelectDisabled = false,
  copy,
  isLoading,
  isSubmitting,
  onClose,
  onSubmit,
}) => {
  if (!isOpen) return null;

  const displayName = user?.userName || form.userName || 'User';
  const initials = getUserInitials(displayName);
  const tone = getAvatarToneForUser(user?.id ?? 0);
  const avatarClass = avatarToneClassMap[tone] || avatarToneClassMap.blue;

  return createPortal(
    <div className="crmModalOverlay" role="presentation" onClick={onClose}>
      <div
        className="crmModal userEditModal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="userEditModalTitle"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="userEditModalHeader">
          <div className="userEditModalHeaderMain">
            <span className={`crmAvatar ${avatarClass} userEditModalAvatar`}>
              {initials}
            </span>
            <div className="userEditModalHeaderText">
              <h2 id="userEditModalTitle" className="userEditModalTitle">
                {copy.title}
              </h2>
              <p className="userEditModalSubtitle">{copy.subtitle}</p>
            </div>
          </div>
          <button
            type="button"
            className="userEditModalClose"
            aria-label="Close edit user"
            onClick={onClose}
            disabled={isSubmitting}
          >
            {DashboardIcons.xClose(20)}
          </button>
        </header>

        {isLoading ? (
          <div className="userEditModalBody">
            <p className="userCreationLoadingState">{copy.loadingMessage}</p>
          </div>
        ) : (
          <form
            className="userEditModalBody"
            onSubmit={(event) => {
              event.preventDefault();
              onSubmit();
            }}
            noValidate
          >
            {errors.general && (
              <p className="userCreationAlert userCreationAlertError" role="alert">
                {errors.general}
              </p>
            )}

            <div className="userEditModalMeta">
              <div className="userEditModalMetaItem">
                <span className="userEditModalMetaLabel">{fields.username.label}</span>
                <span className="userEditModalMetaValue">@{form.username || '—'}</span>
              </div>
              <div className="userEditModalMetaItem">
                <span className="userEditModalMetaLabel">{fields.userName.label}</span>
                <span className="userEditModalMetaValue">{displayName}</span>
              </div>
            </div>

            <section className="userEditModalSection">
              <h3 className="userCreationPanelSectionTitle">{copy.profileSectionTitle}</h3>
              <div className="userCreationPanelGrid">
                <FormInput
                  label={fields.userName.label}
                  placeholder={fields.userName.placeholder}
                  value={form.userName}
                  onChange={(e) => updateField('userName', e.target.value)}
                  error={errors.userName}
                  autoFocus
                />
                <FormInput
                  label={fields.userEmail.label}
                  type="email"
                  placeholder={fields.userEmail.placeholder}
                  value={form.userEmail}
                  onChange={(e) => updateField('userEmail', e.target.value)}
                  error={errors.userEmail}
                />
                <FormInput
                  label={fields.userPhone.label}
                  type="tel"
                  placeholder={fields.userPhone.placeholder}
                  value={form.userPhone}
                  onChange={(e) => updateField('userPhone', e.target.value)}
                  error={errors.userPhone}
                />
                <FormSelect
                  label={fields.userRole.label}
                  options={roleOptions}
                  value={form.userRole}
                  onChange={(e) => updateField('userRole', e.target.value)}
                  error={errors.userRole}
                  disabled={isRoleSelectDisabled || isSubmitting}
                />
                <FormSelect
                  label={fields.userStatus.label}
                  options={userStatusOptions}
                  value={form.userStatus}
                  onChange={(e) => updateField('userStatus', e.target.value)}
                  error={errors.userStatus}
                  disabled={isLoadingUserStatus || isSubmitting}
                />
              </div>
            </section>

            <footer className="userEditModalFooter">
              <CrmButton variant="outline" type="button" onClick={onClose} disabled={isSubmitting}>
                {copy.cancelLabel}
              </CrmButton>
              <CrmButton variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving…' : copy.submitLabel}
              </CrmButton>
            </footer>
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
};

const UserDeleteModal = ({
  isOpen,
  user,
  copy,
  errors,
  isSubmitting,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !user) return null;

  const initials = getUserInitials(user.userName);
  const tone = getAvatarToneForUser(user.id);
  const avatarClass = avatarToneClassMap[tone] || avatarToneClassMap.blue;

  return createPortal(
    <div className="crmModalOverlay" role="presentation" onClick={onClose}>
      <div
        className="crmModal userDeleteModal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="userDeleteModalTitle"
        aria-describedby="userDeleteModalDesc"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="userDeleteModalHeader">
          <span className="userDeleteModalIcon" aria-hidden="true">
            {DashboardIcons.trash(22)}
          </span>
          <div className="userDeleteModalHeaderText">
            <h2 id="userDeleteModalTitle" className="userDeleteModalTitle">
              {copy.title}
            </h2>
            <p id="userDeleteModalDesc" className="userDeleteModalSubtitle">
              {copy.subtitle}
            </p>
          </div>
        </header>

        <div className="userDeleteModalBody">
          {errors.general && (
            <p className="userCreationAlert userCreationAlertError" role="alert">
              {errors.general}
            </p>
          )}

          <div className="userDeleteModalUserCard">
            <span className={`crmAvatar ${avatarClass} userDeleteModalAvatar`}>
              {initials}
            </span>
            <div className="userDeleteModalUserInfo">
              <span className="userDeleteModalUserName">{user.userName}</span>
              {user.username && (
                <span className="userDeleteModalUsername">@{user.username}</span>
              )}
              <div className="userDeleteModalUserMeta">
                <span className="userCreationRoleBadge">{user.userRole}</span>
                {user.userEmail && (
                  <span className="userDeleteModalEmail">{user.userEmail}</span>
                )}
              </div>
            </div>
          </div>

          <p className="userDeleteModalWarning">{copy.warningText}</p>
        </div>

        <footer className="userDeleteModalFooter">
          <CrmButton variant="outline" type="button" onClick={onClose} disabled={isSubmitting}>
            {copy.cancelLabel}
          </CrmButton>
          <CrmButton
            variant="primary"
            type="button"
            className="userCreationDeleteBtn"
            disabled={isSubmitting}
            onClick={onConfirm}
          >
            {isSubmitting ? 'Removing…' : copy.submitLabel}
          </CrmButton>
        </footer>
      </div>
    </div>,
    document.body,
  );
};

const UserCreationPage = () => {
  const mock = userCreationPanelMock;
  const {
    title,
    subtitle,
    sections,
    fields,
    create,
    view,
    edit,
    delete: deleteCopy,
    detailLabels,
    createSuccessPopup,
    editSuccessPopup,
    deleteSuccessPopup: deleteSuccessCopy,
  } = mock;

  const {
    users,
    activeSection,
    form,
    errors,
    isSubmitting,
    isLoadingUsers,
    createdUserPopup,
    updatedUserPopup,
    editingUserId,
    editingUserSnapshot,
    isLoadingEditUser,
    deletingUserId,
    deleteSuccessPopup,
    createRoleOptions,
    editRoleOptions,
    userStatusOptions,
    isLoadingRoles,
    isLoadingUserStatus,
    roleOptionsError,
    refetchRoles,
    updateField,
    handleSectionChange,
    dismissCreatedUserPopup,
    dismissUpdatedUserPopup,
    dismissDeleteSuccessPopup,
    openEditUser,
    closeEditUser,
    openDeleteUser,
    closeDeleteUser,
    handleCreateSubmit,
    handleEditSubmit,
    handleDeleteSubmit,
  } = useUserCreationForm();

  const deletingUser =
    users.find((user) => String(user.id) === String(deletingUserId)) ?? null;

  const handleCreateFormSubmit = async (event) => {
    event.preventDefault();
    await handleCreateSubmit();
  };

  return (
    <div className="crmListPage userCreationPage">
      <PageHeader title={title} subtitle={subtitle} />

      <div className="userCreationPageCard crmSectionAnimate crmSectionDelay1">
        <nav className="userCreationPageTabs" aria-label="User management sections">
          {sections.map((section) => {
            const Icon = sectionIconMap[section.icon];
            const isActive = activeSection === section.id;

            return (
              <button
                key={section.id}
                type="button"
                className={`userCreationPageTab${isActive ? ' userCreationPageTabActive' : ''}`}
                onClick={() => handleSectionChange(section.id)}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="userCreationPageTabIcon" aria-hidden="true">
                  {Icon(14)}
                </span>
                {section.shortLabel}
              </button>
            );
          })}
        </nav>

        <div className="userCreationPageBody">
          {errors.general && (
            <p className="userCreationAlert userCreationAlertError" role="alert">
              {errors.general}
            </p>
          )}
          {roleOptionsError && (
            <div className="userCreationAlert userCreationAlertError userCreationRolesError">
              <p role="alert">{roleOptionsError}</p>
              <CrmButton variant="outline" type="button" onClick={refetchRoles}>
                Try again
              </CrmButton>
            </div>
          )}

          {activeSection === 'create' ? (
            <form onSubmit={handleCreateFormSubmit} noValidate>
              <section className="userCreationPanelSection">
                <h3 className="userCreationPanelSectionTitle">{create.accountSectionTitle}</h3>
                <AccountFields
                  fields={fields}
                  form={form}
                  errors={errors}
                  updateField={updateField}
                  roleOptions={createRoleOptions}
                  isRoleSelectDisabled={isLoadingRoles || Boolean(roleOptionsError) || createRoleOptions.length <= 1}
                  autoFocus
                />
              </section>
              <section className="userCreationPanelSection">
                <h3 className="userCreationPanelSectionTitle">{create.securitySectionTitle}</h3>
                <div className="userCreationPanelGrid userCreationPanelGridStacked">
                  <FormInput
                    label={fields.password.label}
                    type="password"
                    placeholder={fields.password.placeholder}
                    value={form.password}
                    onChange={(e) => updateField('password', e.target.value)}
                    error={errors.password}
                  />
                  <FormInput
                    label={fields.confirmPassword.label}
                    type="password"
                    placeholder={fields.confirmPassword.placeholder}
                    value={form.confirmPassword}
                    onChange={(e) => updateField('confirmPassword', e.target.value)}
                    error={errors.confirmPassword}
                  />
                </div>
              </section>
              <footer className="userCreationPageFormFooter">
                <CrmButton
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting || isLoadingRoles || Boolean(roleOptionsError)}
                >
                  {isSubmitting ? 'Creating…' : create.submitLabel}
                </CrmButton>
              </footer>
            </form>
          ) : (
            <UsersViewTable
              users={users}
              labels={view}
              isLoading={isLoadingUsers}
              onEdit={openEditUser}
              onDelete={openDeleteUser}
            />
          )}
        </div>
      </div>

      <UserSuccessPopup
        popup={createdUserPopup}
        copy={createSuccessPopup}
        onDismiss={dismissCreatedUserPopup}
      />

      <UserSuccessPopup
        popup={updatedUserPopup}
        copy={editSuccessPopup}
        onDismiss={dismissUpdatedUserPopup}
      />

      <UserEditModal
        isOpen={Boolean(editingUserId)}
        user={editingUserSnapshot}
        fields={fields}
        form={form}
        errors={errors}
        updateField={updateField}
        roleOptions={editRoleOptions}
        isRoleSelectDisabled={isLoadingRoles || Boolean(roleOptionsError)}
        copy={edit}
        isLoading={isLoadingEditUser}
        isSubmitting={isSubmitting}
        onClose={closeEditUser}
        onSubmit={handleEditSubmit}
      />

      <UserSuccessPopup
        popup={deleteSuccessPopup}
        copy={deleteSuccessCopy}
        onDismiss={dismissDeleteSuccessPopup}
      />

      <UserDeleteModal
        isOpen={Boolean(deletingUserId)}
        user={deletingUser}
        copy={deleteCopy}
        errors={errors}
        isSubmitting={isSubmitting}
        onClose={closeDeleteUser}
        onConfirm={handleDeleteSubmit}
      />
    </div>
  );
};

export default UserCreationPage;
