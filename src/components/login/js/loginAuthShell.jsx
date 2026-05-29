import { appConfig } from '../../../constants/appConfig';
import '../../../pages/login/css/loginPage.css';
import { DashboardIcons } from '../../common/js/dashboardIcons';

const LoginAuthShell = ({ title, subtitle, children }) => (
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
