import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../../apis/authApi';
import { routePaths } from '../../../constants/routePaths';
import { forgotPasswordMock } from '../../../data/mocks/login/forgotPassword.mock';
import {
  clearForgotPasswordFlow,
  clearPendingResetIdentifier,
  getPasswordResetToken,
} from '../../../services/authSession';
import { parseApiError } from '../../../utils/apiError';
import {
  buildResetPasswordPayload,
  validateResetPasswordForm,
} from '../../../utils/resetPassword';

const copy = forgotPasswordMock.reset;
const errorCopy = copy.errors;

const emptyForm = {
  newPassword: '',
  confirmNewPassword: '',
};

export const useResetPasswordForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromForgotPasswordOtp = location.state?.fromForgotPasswordOtp === true;

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const resetToken = getPasswordResetToken();

    if (!resetToken && !fromForgotPasswordOtp) {
      navigate(routePaths.forgotPassword, { replace: true });
      return;
    }

    if (!resetToken) {
      navigate(routePaths.forgotPassword, { replace: true });
      return;
    }

    setIsReady(true);
  }, [navigate, fromForgotPasswordOtp]);

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

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      const resetToken = getPasswordResetToken();
      if (!resetToken) {
        setErrors({ general: copy.missingTokenError });
        return;
      }

      const nextErrors = validateResetPasswordForm(form, errorCopy);
      setErrors(nextErrors);
      if (Object.keys(nextErrors).length > 0) return;

      setIsSubmitting(true);

      try {
        const response = await resetPassword(
          buildResetPasswordPayload(resetToken, form),
        );

        if (!response?.success) {
          setErrors({ general: response?.message || copy.resetFailed });
          return;
        }

        clearPendingResetIdentifier();
        clearForgotPasswordFlow();

        navigate(routePaths.login, {
          replace: true,
          state: {
            message: response.message || copy.successRedirectMessage,
          },
        });
      } catch (error) {
        const { general, fieldErrors } = parseApiError(error, 'resetPassword');
        setErrors({
          ...fieldErrors,
          ...(general ? { general } : {}),
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, navigate],
  );

  const handleBackToLogin = useCallback(() => {
    clearForgotPasswordFlow();
    clearPendingResetIdentifier();
    navigate(routePaths.login, { replace: true });
  }, [navigate]);

  return {
    form,
    errors,
    isSubmitting,
    isReady,
    updateField,
    handleSubmit,
    handleBackToLogin,
  };
};
