import { useCallback, useState } from 'react';

const useAdmissionWizard = (totalSteps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentStep((step) => Math.min(totalSteps - 1, step + 1));
  }, [totalSteps]);

  const goToPrevious = useCallback(() => {
    setCurrentStep((step) => Math.max(0, step - 1));
  }, []);

  const goToStep = useCallback((index) => {
    setCurrentStep(Math.max(0, Math.min(totalSteps - 1, index)));
  }, [totalSteps]);

  return {
    currentStep,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === totalSteps - 1,
    goToNext,
    goToPrevious,
    goToStep,
  };
};

export default useAdmissionWizard;
