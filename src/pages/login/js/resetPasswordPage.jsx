import { useState } from 'react';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';
import LoginAuthShell from '../../../components/login/js/loginAuthShell';
import { forgotPasswordMock } from '../../../data/mocks/login/forgotPassword.mock';
import { useResetPasswordForm } from '../hooks/useResetPasswordForm';
import '../css/forgotPasswordPage.css';
import '../css/firstLoginChangePasswordPage.css';

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M8 11V8a4 4 0 0 1 8 0v3"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const ResetPasswordPage = () => {
  const copy = forgotPasswordMock.reset;
  const {
    form,
    errors,
    isSubmitting,
    isReady,
    updateField,
    handleSubmit,
    handleBackToLogin,
  } = useResetPasswordForm();

  const [visible, setVisible] = useState({
    newPassword: false,
    confirmNewPassword: false,
  });

  const toggleVisible = (field) => {
    setVisible((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const fields = [
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
        <p className="forgotPasswordStepBadge">{copy.stepLabel}</p>

        <div className="firstLoginSecurityBanner">
          <span className="firstLoginSecurityIcon">
            <LockIcon />
          </span>
          <p className="firstLoginSecurityText">
            Your verification code was accepted. Set a new password to complete the reset.
          </p>
        </div>

        <form className="loginForm firstLoginPasswordForm" onSubmit={handleSubmit} noValidate>
          {errors.general && (
            <p className="loginFormError loginFormErrorBanner" role="alert">
              {errors.general}
            </p>
          )}

          {fields.map((field) => (
            <div key={field.id} className="loginFormField">
              <label className="loginFormLabel" htmlFor={`reset-${field.id}`}>
                {field.label}
              </label>
              <div className="loginFormInputWrap loginFormInputWrapPassword">
                <span className="loginFormInputIcon">
                  <LockIcon />
                </span>
                <input
                  id={`reset-${field.id}`}
                  className={`loginFormInput loginFormInputWithToggle${
                    errors[field.id] ? ' loginFormInputError' : ''
                  }`}
                  type={visible[field.id] ? 'text' : 'password'}
                  autoComplete="new-password"
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

          <button type="submit" className="loginFormSubmit" disabled={isSubmitting}>
            {isSubmitting ? copy.submittingLabel : copy.submitLabel}
          </button>

          <button
            type="button"
            className="firstLoginSkipBtn"
            onClick={handleBackToLogin}
            disabled={isSubmitting}
          >
            {copy.backToLoginLabel}
          </button>
        </form>
      </div>
    </LoginAuthShell>
  );
};

export default ResetPasswordPage;
