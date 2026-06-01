const SCHOOL_SETUP_COMPLETE = 'SCHOOL_SETUP_COMPLETE';

export const isSchoolSetupComplete = () =>
  localStorage.getItem(SCHOOL_SETUP_COMPLETE) === 'true';

export const setSchoolSetupComplete = (complete = true) => {
  if (complete) {
    localStorage.setItem(SCHOOL_SETUP_COMPLETE, 'true');
    window.dispatchEvent(new Event('school-setup-complete'));
    return;
  }
  localStorage.removeItem(SCHOOL_SETUP_COMPLETE);
  window.dispatchEvent(new Event('school-setup-complete'));
};
