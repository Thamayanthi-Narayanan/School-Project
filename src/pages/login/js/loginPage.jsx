import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';
import { routePaths } from '../../../constants/routePaths';
import '../css/loginPage.css';
import { useLoginForm } from '../hooks/useLoginForm';
import { loginPageMock } from '../../../data/mocks/login/loginPage.mock';
import { appConfig } from '../../../constants/appConfig';
import { getRememberedLogin } from '../../../services/authSession';

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const location = useLocation();
  const successMessage = location.state?.message;
  const { form, errors, isLoading, updateField, handleSubmit } = useLoginForm();

  useEffect(() => {
    const remembered = getRememberedLogin();
    if (remembered) {
      updateField('email', remembered);
      updateField('rememberMe', true);
    }
  }, [updateField]);

  return (
    <div className="loginPage">
      <div className="loginPageBg loginPageBgBlur" aria-hidden="true" />
      <div className="loginPageBg loginPageBgSharp" aria-hidden="true" />
      <div className="loginPageOverlay" aria-hidden="true" />

      <div className="loginPageContent">
        <section className="loginBrandPanel">
          <div className="loginBrandInner">
            <header className="loginBrandHeader">
              <span className="loginBrandLogoIcon">
                {DashboardIcons.graduationCap(22)}
              </span>
              <span className="loginBrandName">{appConfig.appName}</span>
            </header>

            <div className="loginBrandHero">
              <h1 className="loginBrandTitle">{loginPageMock.headline}</h1>
              <p className="loginBrandSubtitle">{loginPageMock.subtitle}</p>
            </div>

            <ul className="loginBrandStats">
              {loginPageMock.stats.map(({ id, icon, label }) => (
                <li key={id} className="loginBrandStat">
                  {DashboardIcons[icon]?.(16)}
                  <span>{label}</span>
                </li>
              ))}
            </ul>

            <footer className="loginBrandFooter">{appConfig.footerText}</footer>
          </div>
        </section>

        <section className="loginFormPanel">
          <div className="loginFormWrapper">
            <div className="loginFormCard">
              <header className="loginFormHeader">
                <h2 className="loginFormTitle">{loginPageMock.welcomeTitle}</h2>
                <p className="loginFormSubtitle">{loginPageMock.welcomeSubtitle}</p>
              </header>

              <form className="loginForm" onSubmit={handleSubmit} noValidate>
                {successMessage && (
                  <p className="loginFormSuccessBanner" role="status">
                    {successMessage}
                  </p>
                )}
                {errors.general && (
                  <p className="loginFormError loginFormErrorBanner" role="alert">
                    {errors.general}
                  </p>
                )}

                <div className="loginFormField">
                  <label className="loginFormLabel" htmlFor="login-email">
                    {loginPageMock.phoneLabel}
                  </label>
                  <div className="loginFormInputWrap">
                    <span className="loginFormInputIcon">
                      {DashboardIcons.users(18)}
                    </span>
                    <input
                      id="login-email"
                      className={`loginFormInput${errors.email ? ' loginFormInputError' : ''}`}
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      inputMode="numeric"
                      placeholder={loginPageMock.phonePlaceholder}
                      value={form.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.email && (
                    <p className="loginFormError" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="loginFormField">
                  <div className="loginFormLabelRow">
                    <label className="loginFormLabel" htmlFor="login-password">
                      {loginPageMock.passwordLabel}
                    </label>
                    <Link className="loginFormLink" to={routePaths.forgotPassword}>
                      {loginPageMock.forgotPasswordLabel}
                    </Link>
                  </div>
                  <div className="loginFormInputWrap loginFormInputWrapPassword">
                    <span className="loginFormInputIcon">
                      {DashboardIcons.lock(18)}
                    </span>
                    <input
                      id="login-password"
                      className={`loginFormInput loginFormInputWithToggle${errors.password ? ' loginFormInputError' : ''}`}
                      type={passwordVisible ? 'text' : 'password'}
                      name="password"
                      autoComplete="current-password"
                      placeholder={loginPageMock.passwordPlaceholder}
                      value={form.password}
                      onChange={(e) => updateField('password', e.target.value)}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="loginFormPasswordToggle"
                      onClick={() => setPasswordVisible((visible) => !visible)}
                      aria-label={passwordVisible
                        ? loginPageMock.hidePasswordAriaLabel
                        : loginPageMock.showPasswordAriaLabel}
                      disabled={isLoading}
                    >
                      {passwordVisible ? DashboardIcons.eyeOff(16) : DashboardIcons.eye(16)}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="loginFormError" role="alert">
                      {errors.password}
                    </p>
                  )}
                </div>

                <label className="loginFormRemember">
                  <input
                    type="checkbox"
                    className="loginFormCheckbox"
                    checked={form.rememberMe}
                    onChange={(e) => updateField('rememberMe', e.target.checked)}
                    disabled={isLoading}
                  />
                  <span className="loginFormCheckboxUi" aria-hidden="true" />
                  <span>{loginPageMock.rememberMeLabel}</span>
                </label>

                <button type="submit" className="loginFormSubmit" disabled={isLoading}>
                  {isLoading ? loginPageMock.signingInLabel : loginPageMock.continueLabel}
                </button>

                <p className="loginFormSecure">
                  <span className="loginFormSecureIcon">
                    {DashboardIcons.shield(14)}
                  </span>
                  {loginPageMock.secureLoginLabel}
                </p>
              </form>

              <p className="loginFormFooter">
                {loginPageMock.helpPrefix}{' '}
                <a className="loginFormFooterLink" href="#support">
                  {loginPageMock.contactSupportLabel}
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
