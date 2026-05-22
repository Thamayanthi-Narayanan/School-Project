import { useEffect } from 'react';
import '../css/loginPage.css';
import { useLoginForm } from '../hooks/useLoginForm';
import { loginPageMock } from '../../../data/mocks/login/loginPage.mock';
import { appConfig } from '../../../constants/appConfig';
import loginHeroImage from '../../../assets/images/loginHero.png';

const GraduationCapIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 3L2 8.5l10 5.5 10-5.5L12 3z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M6 11.5V16c0 0 2.5 3 6 3s6-3 6-3v-4.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path d="M22 8.5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M16 11.5a2.5 2.5 0 0 1 0 5M19 19c0-2.5-1.5-4.5-3.5-5.2"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const ReceiptIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M6 3h12a1 1 0 0 1 1 1v17l-2-1.5L15 21l-3-1.5L9 21l-2-1.5L5 21V4a1 1 0 0 1 1-1z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M9 8h6M9 12h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const AwardIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="9" r="4" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M8.5 14.5L7 20l5-2.5L17 20l-1.5-5.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

const ShieldIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const UserInputIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const LockInputIcon = () => (
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

const brandStats = [
  { id: 'students', icon: UsersIcon, label: '1,284 Students' },
  { id: 'fees', icon: ReceiptIcon, label: '₹38.6L Collected' },
  { id: 'scholarships', icon: AwardIcon, label: '18 Scholarships' },
];

const LoginPage = () => {
  const { form, errors, isLoading, updateField, handleSubmit } = useLoginForm();

  useEffect(() => {
    const remembered = localStorage.getItem('rememberEmail');
    if (remembered) {
      updateField('email', remembered);
      updateField('rememberMe', true);
    }
  }, [updateField]);

  return (
    <div
      className="loginPage"
      style={{ '--login-hero-image': `url(${loginHeroImage})` }}
    >
      <div className="loginPageBg loginPageBgBlur" aria-hidden="true" />
      <div className="loginPageBg loginPageBgSharp" aria-hidden="true" />
      <div className="loginPageOverlay" aria-hidden="true" />

      <div className="loginPageContent">
        <section className="loginBrandPanel">
          <div className="loginBrandInner">
            <header className="loginBrandHeader">
              <span className="loginBrandLogoIcon">
                <GraduationCapIcon />
              </span>
              <span className="loginBrandName">{appConfig.appName}</span>
            </header>

            <div className="loginBrandHero">
              <h1 className="loginBrandTitle">Run your school. Simply.</h1>
              <p className="loginBrandSubtitle">
                One workspace for students, staff, attendance, fees, and reports — built
                for modern school teams.
              </p>
            </div>

            <ul className="loginBrandStats">
              {brandStats.map(({ id, icon: Icon, label }) => (
                <li key={id} className="loginBrandStat">
                  <Icon />
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
                <h2 className="loginFormTitle">Welcome</h2>
                <p className="loginFormSubtitle">Sign in to your school workspace.</p>
              </header>

              <form className="loginForm" onSubmit={handleSubmit} noValidate>
                <div className="loginFormField">
                  <label className="loginFormLabel" htmlFor="login-email">
                    {loginPageMock.emailOrPhoneLabel}
                  </label>
                  <div className="loginFormInputWrap">
                    <span className="loginFormInputIcon">
                      <UserInputIcon />
                    </span>
                    <input
                      id="login-email"
                      className={`loginFormInput${errors.email ? ' loginFormInputError' : ''}`}
                      type="text"
                      name="email"
                      autoComplete="username"
                      inputMode="text"
                      placeholder={loginPageMock.emailOrPhonePlaceholder}
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
                      Password
                    </label>
                    <a className="loginFormLink" href="#forgot-password">
                      Forgot password?
                    </a>
                  </div>
                  <div className="loginFormInputWrap">
                    <span className="loginFormInputIcon">
                      <LockInputIcon />
                    </span>
                    <input
                      id="login-password"
                      className={`loginFormInput${errors.password ? ' loginFormInputError' : ''}`}
                      type="password"
                      name="password"
                      autoComplete="current-password"
                      placeholder="••••••••"
                      value={form.password}
                      onChange={(e) => updateField('password', e.target.value)}
                      disabled={isLoading}
                    />
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
                  <span>Remember me on this device</span>
                </label>

                <button type="submit" className="loginFormSubmit" disabled={isLoading}>
                  {isLoading ? 'Signing in…' : 'Continue'}
                </button>

                <p className="loginFormSecure">
                  <span className="loginFormSecureIcon">
                    <ShieldIcon />
                  </span>
                  Encrypted, secure login
                </p>
              </form>

              <p className="loginFormFooter">
                Need help?{' '}
                <a className="loginFormFooterLink" href="#support">
                  Contact support
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
