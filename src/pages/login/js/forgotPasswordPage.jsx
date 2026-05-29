import LoginAuthShell from '../../../components/login/js/loginAuthShell';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';
import { forgotPasswordMock } from '../../../data/mocks/login/forgotPassword.mock';
import { useForgotPasswordRequest } from '../hooks/useForgotPasswordRequest';
import '../css/forgotPasswordPage.css';

const ForgotPasswordPage = () => {
  const copy = forgotPasswordMock.request;
  const {
    identifier,
    errors,
    isSubmitting,
    updateIdentifier,
    handleSubmit,
    handleBackToLogin,
  } = useForgotPasswordRequest();

  return (
    <LoginAuthShell title={copy.title} subtitle={copy.subtitle}>
      <p className="forgotPasswordStepBadge">{copy.stepLabel}</p>

      <form className="loginForm" onSubmit={handleSubmit} noValidate>
        {errors.general && (
          <p className="loginFormError loginFormErrorBanner" role="alert">
            {errors.general}
          </p>
        )}

        <div className="loginFormField">
          <label className="loginFormLabel" htmlFor="forgot-identifier">
            {copy.identifierLabel}
          </label>
          <div className="loginFormInputWrap">
            <span className="loginFormInputIcon">
              {DashboardIcons.users(18)}
            </span>
            <input
              id="forgot-identifier"
              className={`loginFormInput${errors.email ? ' loginFormInputError' : ''}`}
              type="text"
              autoComplete="username"
              inputMode="text"
              placeholder={copy.identifierPlaceholder}
              value={identifier}
              onChange={(e) => updateIdentifier(e.target.value)}
              disabled={isSubmitting}
              autoFocus
            />
          </div>
          {errors.email && (
            <p className="loginFormError" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <button type="submit" className="loginFormSubmit" disabled={isSubmitting}>
          {isSubmitting ? copy.submittingLabel : copy.submitLabel}
        </button>

        <p className="forgotPasswordBackWrap">
          <button
            type="button"
            className="loginFormLink forgotPasswordBackBtn"
            onClick={handleBackToLogin}
          >
            {copy.backToLoginLabel}
          </button>
        </p>
      </form>
    </LoginAuthShell>
  );
};

export default ForgotPasswordPage;
