import LoginAuthShell from '../../../components/login/js/loginAuthShell';
import { forgotPasswordMock } from '../../../data/mocks/login/forgotPassword.mock';
import { useForgotPasswordOtp } from '../hooks/useForgotPasswordOtp';
import '../css/forgotPasswordOtpPage.css';

const ForgotPasswordOtpPage = () => {
  const copy = forgotPasswordMock.otp;
  const {
    identifier,
    otp,
    errors,
    isVerifying,
    isResending,
    cooldown,
    notice,
    updateOtp,
    handleVerify,
    handleResend,
    handleBack,
  } = useForgotPasswordOtp();

  if (!identifier) {
    return null;
  }

  const resendLabel = cooldown > 0
    ? copy.resendCooldownLabel.replace('{seconds}', String(cooldown))
    : copy.resendLabel;

  return (
    <LoginAuthShell title={copy.title} subtitle={copy.subtitle}>
      <p className="forgotPasswordStepBadge">{copy.stepLabel}</p>

      <form className="loginForm" onSubmit={handleVerify} noValidate>
        {notice && !errors.general && (
          <p className="loginFormSuccessBanner" role="status">
            {notice}
          </p>
        )}
        {errors.general && (
          <p className="loginFormError loginFormErrorBanner" role="alert">
            {errors.general}
          </p>
        )}

        <div className="loginFormField">
          <label className="loginFormLabel" htmlFor="forgot-otp">
            {copy.otpLabel}
          </label>
          <input
            id="forgot-otp"
            className={`loginOtpInput${errors.otp ? ' loginFormInputError' : ''}`}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            placeholder={copy.otpPlaceholder}
            value={otp}
            onChange={(e) => updateOtp(e.target.value)}
            disabled={isVerifying || isResending}
            autoFocus
          />
          {errors.otp && (
            <p className="loginFormError" role="alert">
              {errors.otp}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="loginFormSubmit"
          disabled={isVerifying || isResending}
        >
          {isVerifying ? copy.verifyingLabel : copy.verifyLabel}
        </button>

        <button
          type="button"
          className="loginOtpResendBtn"
          onClick={handleResend}
          disabled={cooldown > 0 || isResending || isVerifying}
        >
          {isResending ? copy.resendingLabel : resendLabel}
        </button>

        <p className="forgotPasswordBackWrap">
          <button
            type="button"
            className="loginFormLink forgotPasswordBackBtn"
            onClick={handleBack}
          >
            {copy.backLabel}
          </button>
        </p>
      </form>
    </LoginAuthShell>
  );
};

export default ForgotPasswordOtpPage;
