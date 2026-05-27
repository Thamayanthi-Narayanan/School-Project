export const firstLoginChangePasswordMock = {
  stepLabel: 'Step 2 of 2',
  title: 'Set a new password',
  subtitle:
    'Your account is verified. Create a new password to finish setup, then sign in again with it.',
  missingSessionError:
    'Your session could not be started. Please sign in and verify OTP again.',
  currentPasswordLabel: 'Current password',
  currentPasswordPlaceholder: 'Enter current password',
  newPasswordLabel: 'New password',
  newPasswordPlaceholder: 'At least 8 characters',
  confirmPasswordLabel: 'Confirm new password',
  confirmPasswordPlaceholder: 'Re-enter new password',
  submitLabel: 'Update password',
  submittingLabel: 'Updating…',
  skipLabel: 'Skip to dashboard',
  errors: {
    currentPasswordRequired: 'Current password is required.',
    newPasswordRequired: 'New password is required.',
    confirmNewPasswordRequired: 'Please confirm your new password.',
    passwordMin: 'Password must be at least 8 characters.',
    passwordMax: 'Password must be at most 255 characters.',
    passwordMismatch: 'New password and confirmation do not match.',
    sameAsCurrent: 'New password must be different from your current password.',
    changeFailed: 'Could not update password. Please try again.',
  },
  successRedirectMessage:
    'Password changed successfully. Sign in with your new password.',
};
