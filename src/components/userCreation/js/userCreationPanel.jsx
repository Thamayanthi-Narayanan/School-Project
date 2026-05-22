import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import '../../../components/reusable/css/crmReusable.css';
import '../css/userCreationPanel.css';
import { userCreationPanelMock } from '../../../data/mocks/userCreation/userCreationPanel.mock';
import { DashboardIcons } from '../../common/js/dashboardIcons';
import { CrmButton, FormInput, FormSelect } from '../../reusable/js/index';
import { useUserCreationForm } from '../hooks/useUserCreationForm';

const sectionIconMap = {
  userPlus: DashboardIcons.userPlus,
  eye: DashboardIcons.eye,
  edit: DashboardIcons.edit,
  trash: DashboardIcons.trash,
};

const AccountFields = ({ fields, form, errors, updateField, autoFocus = false }) => (
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
      options={fields.userRole.options}
      value={form.userRole}
      onChange={(e) => updateField('userRole', e.target.value)}
      error={errors.userRole}
    />
  </div>
);

const UserDetailCard = ({ user, detailLabels }) => (
  <dl className="userCreationDetailCard">
    <div className="userCreationDetailRow">
      <dt>{detailLabels.userName}</dt>
      <dd>{user.userName}</dd>
    </div>
    <div className="userCreationDetailRow">
      <dt>{detailLabels.userEmail}</dt>
      <dd>{user.userEmail}</dd>
    </div>
    <div className="userCreationDetailRow">
      <dt>{detailLabels.userPhone}</dt>
      <dd>{user.userPhone}</dd>
    </div>
    <div className="userCreationDetailRow">
      <dt>{detailLabels.userRole}</dt>
      <dd>
        <span className="userCreationRoleBadge">{user.userRole}</span>
      </dd>
    </div>
  </dl>
);

const UserCreationPanel = ({ isOpen, onClose }) => {
  const mock = userCreationPanelMock;
  const {
    title,
    subtitle,
    sections,
    fields,
    selectUser,
    create,
    view,
    edit,
    delete: deleteCopy,
    detailLabels,
  } = mock;

  const {
    users,
    activeSection,
    selectedUserId,
    selectedUser,
    form,
    errors,
    isSubmitting,
    userOptions,
    resetForm,
    updateField,
    handleSectionChange,
    handleSelectUser,
    handleCreateSubmit,
    handleEditSubmit,
    handleDeleteSubmit,
  } = useUserCreationForm();

  const resetPanel = useCallback(() => {
    resetForm();
  }, [resetForm]);

  useEffect(() => {
    if (!isOpen) {
      resetPanel();
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose, resetPanel]);

  const handleUserSelectChange = (event) => {
    const userName = event.target.value;
    if (userName === selectUser.emptyOption) {
      handleSelectUser('');
      return;
    }
    const user = users.find((item) => item.userName === userName);
    handleSelectUser(user?.id ?? '');
  };

  const selectedUserName = selectedUser?.userName ?? selectUser.emptyOption;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (activeSection === 'create') {
      const success = await handleCreateSubmit();
      if (success) onClose();
      return;
    }

    if (activeSection === 'edit') {
      await handleEditSubmit();
      return;
    }

    if (activeSection === 'delete') {
      const success = await handleDeleteSubmit();
      if (success) onClose();
    }
  };

  const renderUserPicker = () => (
    <FormSelect
      label={selectUser.label}
      options={userOptions}
      value={selectedUserName}
      onChange={handleUserSelectChange}
      error={errors.selectedUser}
    />
  );

  const renderSectionContent = () => {
    if (activeSection === 'create') {
      return (
        <>
          <section className="userCreationPanelSection">
            <h3 className="userCreationPanelSectionTitle">{create.accountSectionTitle}</h3>
            <AccountFields
              fields={fields}
              form={form}
              errors={errors}
              updateField={updateField}
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
        </>
      );
    }

    if (activeSection === 'view') {
      return (
        <section className="userCreationPanelSection">
          <h3 className="userCreationPanelSectionTitle">{view.sectionTitle}</h3>
          {renderUserPicker()}
          {selectedUser ? (
            <UserDetailCard user={selectedUser} detailLabels={detailLabels} />
          ) : (
            <p className="userCreationEmptyState">{view.emptyMessage}</p>
          )}
        </section>
      );
    }

    if (activeSection === 'edit') {
      return (
        <section className="userCreationPanelSection">
          <h3 className="userCreationPanelSectionTitle">{edit.accountSectionTitle}</h3>
          {renderUserPicker()}
          {selectedUser ? (
            <AccountFields fields={fields} form={form} errors={errors} updateField={updateField} />
          ) : (
            <p className="userCreationEmptyState">{view.emptyMessage}</p>
          )}
        </section>
      );
    }

    return (
      <section className="userCreationPanelSection">
        <h3 className="userCreationPanelSectionTitle">{deleteCopy.sectionTitle}</h3>
        {renderUserPicker()}
        <div className="userCreationWarningCard">
          <p className="userCreationWarningTitle">{deleteCopy.warningTitle}</p>
          <p className="userCreationWarningText">{deleteCopy.warningText}</p>
        </div>
        {selectedUser && (
          <UserDetailCard user={selectedUser} detailLabels={detailLabels} />
        )}
        <p className="userCreationDeleteHint">{deleteCopy.confirmHint}</p>
      </section>
    );
  };

  const renderFooter = () => {
    if (activeSection === 'view') {
      return (
        <footer className="userCreationPanelFooter">
          <CrmButton variant="primary" type="button" onClick={onClose}>
            {view.submitLabel}
          </CrmButton>
        </footer>
      );
    }

    const copy = activeSection === 'create' ? create : activeSection === 'edit' ? edit : deleteCopy;
    const isDelete = activeSection === 'delete';

    return (
      <footer className="userCreationPanelFooter">
        <CrmButton variant="outline" type="button" onClick={onClose} disabled={isSubmitting}>
          {copy.cancelLabel}
        </CrmButton>
        <CrmButton
          variant="primary"
          type="submit"
          disabled={isSubmitting || (isDelete && !selectedUser)}
          className={isDelete ? 'userCreationDeleteBtn' : ''}
        >
          {copy.submitLabel}
        </CrmButton>
      </footer>
    );
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="userCreationOverlay" role="presentation" onClick={onClose}>
      <aside
        className="userCreationPanel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="userCreationPanelTitle"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="userCreationPanelHeader">
          <div className="userCreationPanelHeaderMain">
            <span className="userCreationPanelIcon" aria-hidden="true">
              {DashboardIcons.userPlus(22)}
            </span>
            <div>
              <h2 id="userCreationPanelTitle" className="userCreationPanelTitle">
                {title}
              </h2>
              <p className="userCreationPanelSubtitle">{subtitle}</p>
            </div>
          </div>
          <button
            type="button"
            className="userCreationPanelClose"
            aria-label="Close panel"
            onClick={onClose}
          >
            {DashboardIcons.xClose(20)}
          </button>
        </header>

        <div className="userCreationPanelLayout">
          <nav className="userCreationPanelNav" aria-label="User management sections">
            {sections.map((section) => {
              const Icon = sectionIconMap[section.icon];
              const isActive = activeSection === section.id;

              return (
                <button
                  key={section.id}
                  type="button"
                  className={`userCreationPanelNavItem${isActive ? ' userCreationPanelNavItemActive' : ''}`}
                  onClick={() => handleSectionChange(section.id)}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={section.label}
                  title={section.label}
                >
                  <span className="userCreationPanelNavIcon" aria-hidden="true">
                    {Icon(14)}
                  </span>
                  <span className="userCreationPanelNavLabel">{section.shortLabel}</span>
                </button>
              );
            })}
          </nav>

          <form className="userCreationPanelForm" onSubmit={handleSubmit} noValidate>
            <div className="userCreationPanelBody">{renderSectionContent()}</div>
            {renderFooter()}
          </form>
        </div>
      </aside>
    </div>,
    document.body,
  );
};

export default UserCreationPanel;
