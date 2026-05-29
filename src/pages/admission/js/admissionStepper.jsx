import '../css/admissionStepper.css';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';

const AdmissionStepper = ({ steps, currentStep, onStepClick }) => (
  <nav className="admissionStepper crmSectionAnimate admissionSectionDelay1" aria-label="Admission progress">
    <div className="admissionStepperTrack">
      {steps.map((step, index) => (
        <div key={step.id} className="admissionStepperItemWrap">
          <button
            type="button"
            className={`admissionStepperItem${index === currentStep ? ' admissionStepperItemActive' : ''}${index < currentStep ? ' admissionStepperItemCompleted' : ''}`}
            onClick={() => onStepClick(index)}
            aria-current={index === currentStep ? 'step' : undefined}
          >
            {index < currentStep ? (
              <span className="admissionStepperCheck" aria-hidden="true">
                {DashboardIcons.checkCircle(14)}
              </span>
            ) : (
              <span className="admissionStepperNum">{index + 1}</span>
            )}
            <span className="admissionStepperLabel">{step.label}</span>
          </button>
          {index < steps.length - 1 && (
            <span className="admissionStepperSep" aria-hidden="true">
              {DashboardIcons.chevronRight(14)}
            </span>
          )}
        </div>
      ))}
    </div>
  </nav>
);

export default AdmissionStepper;
