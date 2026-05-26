import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../../apis/authApi';
import { routePaths } from '../../../constants/routePaths';
import { settingsPageMock } from '../../../data/mocks/settings/settingsPage.mock';
import { clearAuthSession } from '../../../services/authSession';
import { parseApiError } from '../../../utils/apiError';
import {
  buildChangePasswordPayload,
  validateChangePasswordForm,
} from '../../../utils/changePassword';

const errorCopy = settingsPageMock.securityErrors;
const securityCopy = settingsPageMock.panels.security;

const emptyForm = {
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

export const useChangePasswordForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = useCallback((name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name] && !prev.general) return prev;
      const next = { ...prev };
      delete next[name];
      delete next.general;
      return next;
    });
  }, []);

  const resetForm = useCallback(() => {
    setForm(emptyForm);
    setErrors({});
    setIsSubmitting(false);
  }, []);

  const handleSubmit = useCallback(async () => {
    const nextErrors = validateChangePasswordForm(form, errorCopy);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return false;

    setIsSubmitting(true);

    try {
      const response = await changePassword(buildChangePasswordPayload(form));

      if (!response?.success) {
        setErrors({
          general: response?.message || errorCopy.changeFailed,
        });
        return false;
      }

      clearAuthSession();
      navigate(routePaths.login, {
        replace: true,
        state: {
          message: response.message || securityCopy.successRedirectMessage,
        },
      });
      return true;
    } catch (error) {
      const { general, fieldErrors, status } = parseApiError(error, 'changePassword');
      const isWrongCurrent =
        status === 401
        && (general?.toLowerCase().includes('current password') ?? false);

      setErrors({
        ...fieldErrors,
        ...(isWrongCurrent
          ? { currentPassword: general, general: undefined }
          : general
            ? { general }
            : {}),
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [form, navigate]);

  return {
    form,
    errors,
    isSubmitting,
    updateField,
    resetForm,
    handleSubmit,
  };
};
