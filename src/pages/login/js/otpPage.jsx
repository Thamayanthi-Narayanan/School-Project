import LoginAuthShell from '../../../components/login/js/loginAuthShell';
import { otpPageMock } from '../../../data/mocks/login/otpPage.mock';
import { useOtpForm } from '../hooks/useOtpForm';
import '../css/otpPage.css';

const OtpPage = () => {
  const {
    identifier,
    otp,
    errors,
    isVerifying,
    isResending,
    cooldown,
    sendNotice,
    updateOtp,
    handleVerify,
    handleResend,
    handleBackToLogin,
  } = useOtpForm();

  if (!identifier) {
    return null;
  }

  const resendLabel = cooldown > 0
    ? otpPageMock.resendCooldownLabel.replace('{seconds}', String(cooldown))
    : otpPageMock.resendLabel;

  return (
    <LoginAuthShell title={otpPageMock.title} subtitle={otpPageMock.subtitle}>
      <p className="firstLoginStepBadge firstLoginStepBadgeOtp">{otpPageMock.stepLabel}</p>
      <form className="loginForm" onSubmit={handleVerify} noValidate>
        {sendNotice && !errors.general && (
          <p className="loginFormSuccessBanner" role="status">
            {sendNotice}
          </p>
        )}
        {errors.general && (
          <p className="loginFormError loginFormErrorBanner" role="alert">
            {errors.general}
          </p>
        )}

        <div className="loginFormField">
          <label className="loginFormLabel" htmlFor="login-otp">
            {otpPageMock.otpLabel}
          </label>
          <input
            id="login-otp"
            className={`loginOtpInput${errors.otp ? ' loginFormInputError' : ''}`}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            placeholder={otpPageMock.otpPlaceholder}
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
          {isVerifying ? otpPageMock.verifyingLabel : otpPageMock.verifyLabel}
        </button>

        <button
          type="button"
          className="loginOtpResendBtn"
          onClick={handleResend}
          disabled={cooldown > 0 || isResending || isVerifying}
        >
          {isResending ? otpPageMock.resendingLabel : resendLabel}
        </button>

        <p className="loginOtpBackWrap">
          <button
            type="button"
            className="loginFormLink loginOtpBackBtn"
            onClick={handleBackToLogin}
          >
            {otpPageMock.backToLoginLabel}
          </button>
        </p>
      </form>
    </LoginAuthShell>
  );
};

export default OtpPage;
