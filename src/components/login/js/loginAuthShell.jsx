import { appConfig } from '../../../constants/appConfig';
import loginHeroImage from '../../../assets/images/loginHero.png';
import '../../../pages/login/css/loginPage.css';

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

const LoginAuthShell = ({ title, subtitle, children }) => (
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

          <footer className="loginBrandFooter">{appConfig.footerText}</footer>
        </div>
      </section>

      <section className="loginFormPanel">
        <div className="loginFormWrapper">
          <div className="loginFormCard">
            <header className="loginFormHeader">
              <h2 className="loginFormTitle">{title}</h2>
              {subtitle ? <p className="loginFormSubtitle">{subtitle}</p> : null}
            </header>
            {children}
          </div>
        </div>
      </section>
    </div>
  </div>
);

export default LoginAuthShell;
