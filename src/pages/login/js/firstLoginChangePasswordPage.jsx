import { useState } from 'react';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';
import LoginAuthShell from '../../../components/login/js/loginAuthShell';
import { firstLoginChangePasswordMock } from '../../../data/mocks/login/firstLoginChangePassword.mock';
import { useFirstLoginChangePassword } from '../hooks/useFirstLoginChangePassword';
import '../css/firstLoginChangePasswordPage.css';

const FirstLoginChangePasswordPage = () => {
  const copy = firstLoginChangePasswordMock;
  const {
    form,
    errors,
    isSubmitting,
    isReady,
    hasToken,
    updateField,
    handleSubmit,
    handleSkip,
  } = useFirstLoginChangePassword();

  const [visible, setVisible] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const toggleVisible = (field) => {
    setVisible((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const fields = [
    {
      id: 'currentPassword',
      label: copy.currentPasswordLabel,
      placeholder: copy.currentPasswordPlaceholder,
    },
    {
      id: 'newPassword',
      label: copy.newPasswordLabel,
      placeholder: copy.newPasswordPlaceholder,
    },
    {
      id: 'confirmNewPassword',
      label: copy.confirmPasswordLabel,
      placeholder: copy.confirmPasswordPlaceholder,
    },
  ];

  if (!isReady) {
    return null;
  }

  return (
    <LoginAuthShell title={copy.title} subtitle={copy.subtitle}>
      <div className="firstLoginPasswordPage">
        <p className="firstLoginStepBadge">{copy.stepLabel}</p>

        <div className="firstLoginSecurityBanner">
          <span className="firstLoginSecurityIcon">
            {DashboardIcons.lock(20)}
          </span>
          <p className="firstLoginSecurityText">
            Use the password you signed in with as your current password, then choose a new one.
          </p>
        </div>

        {!hasToken && (
          <p className="loginFormError loginFormErrorBanner" role="alert">
            {copy.missingSessionError}
          </p>
        )}

        <form className="loginForm firstLoginPasswordForm" onSubmit={handleSubmit} noValidate>
          {errors.general && (
            <p className="loginFormError loginFormErrorBanner" role="alert">
              {errors.general}
            </p>
          )}

          {fields.map((field) => (
            <div key={field.id} className="loginFormField">
              <label className="loginFormLabel" htmlFor={`first-login-${field.id}`}>
                {field.label}
              </label>
              <div className="loginFormInputWrap loginFormInputWrapPassword">
                <span className="loginFormInputIcon">
                  {DashboardIcons.lock(18)}
                </span>
                <input
                  id={`first-login-${field.id}`}
                  className={`loginFormInput loginFormInputWithToggle${
                    errors[field.id] ? ' loginFormInputError' : ''
                  }`}
                  type={visible[field.id] ? 'text' : 'password'}
                  autoComplete={
                    field.id === 'currentPassword' ? 'current-password' : 'new-password'
                  }
                  placeholder={field.placeholder}
                  value={form[field.id]}
                  onChange={(e) => updateField(field.id, e.target.value)}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="loginFormPasswordToggle"
                  onClick={() => toggleVisible(field.id)}
                  aria-label={visible[field.id] ? 'Hide password' : 'Show password'}
                  disabled={isSubmitting}
                >
                  {visible[field.id]
                    ? DashboardIcons.eyeOff(16)
                    : DashboardIcons.eye(16)}
                </button>
              </div>
              {errors[field.id] && (
                <p className="loginFormError" role="alert">
                  {errors[field.id]}
                </p>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="loginFormSubmit"
            disabled={isSubmitting || !hasToken}
          >
            {isSubmitting ? copy.submittingLabel : copy.submitLabel}
          </button>

          <button
            type="button"
            className="firstLoginSkipBtn"
            onClick={handleSkip}
            disabled={isSubmitting || !hasToken}
          >
            {copy.skipLabel}
          </button>
        </form>
      </div>
    </LoginAuthShell>
  );
};

export default FirstLoginChangePasswordPage;
