const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 255;

export const buildChangePasswordPayload = (form) => ({
  currentPassword: form.currentPassword,
  newPassword: form.newPassword,
  confirmNewPassword: form.confirmNewPassword,
});

export const validateChangePasswordForm = (form, errorCopy) => {
  const errors = {};
  const current = form.currentPassword;
  const next = form.newPassword;
  const confirm = form.confirmNewPassword;

  if (!current) {
    errors.currentPassword = errorCopy.currentPasswordRequired;
  } else if (current.length < PASSWORD_MIN_LENGTH) {
    errors.currentPassword = errorCopy.passwordMin;
  } else if (current.length > PASSWORD_MAX_LENGTH) {
    errors.currentPassword = errorCopy.passwordMax;
  }

  if (!next) {
    errors.newPassword = errorCopy.newPasswordRequired;
  } else if (next.length < PASSWORD_MIN_LENGTH) {
    errors.newPassword = errorCopy.passwordMin;
  } else if (next.length > PASSWORD_MAX_LENGTH) {
    errors.newPassword = errorCopy.passwordMax;
  }

  if (!confirm) {
    errors.confirmNewPassword = errorCopy.confirmNewPasswordRequired;
  } else if (confirm.length < PASSWORD_MIN_LENGTH) {
    errors.confirmNewPassword = errorCopy.passwordMin;
  } else if (confirm.length > PASSWORD_MAX_LENGTH) {
    errors.confirmNewPassword = errorCopy.passwordMax;
  }

  if (
    !errors.newPassword
    && !errors.confirmNewPassword
    && next
    && confirm
    && next !== confirm
  ) {
    errors.confirmNewPassword = errorCopy.passwordMismatch;
  }

  if (
    !errors.currentPassword
    && !errors.newPassword
    && current
    && next
    && current === next
  ) {
    errors.newPassword = errorCopy.sameAsCurrent;
  }

  return errors;
};
