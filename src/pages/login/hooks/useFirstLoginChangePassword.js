import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { changePassword } from '../../../apis/authApi';
import { routePaths } from '../../../constants/routePaths';
import { firstLoginChangePasswordMock } from '../../../data/mocks/login/firstLoginChangePassword.mock';
import {
  clearAuthSession,
  clearFirstLoginPasswordStep,
  clearOtpLoginNotice,
  clearPendingOtpIdentifier,
  getAuthToken,
  isFirstLoginPasswordStep,
  setFirstLoginPasswordStep,
} from '../../../services/authSession';
import { parseApiError } from '../../../utils/apiError';
import {
  buildChangePasswordPayload,
  validateChangePasswordForm,
} from '../../../utils/changePassword';

const errorCopy = firstLoginChangePasswordMock.errors;

const emptyForm = {
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

export const useFirstLoginChangePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromOtpVerify = location.state?.fromOtpVerify === true;

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const inFirstLoginStep = isFirstLoginPasswordStep();

    if (!inFirstLoginStep && !fromOtpVerify) {
      navigate(routePaths.login, { replace: true });
      return;
    }

    if (!inFirstLoginStep) {
      setFirstLoginPasswordStep();
    }

    clearPendingOtpIdentifier();
    clearOtpLoginNotice();
    setHasToken(Boolean(getAuthToken()));
    setIsReady(true);
  }, [navigate, fromOtpVerify]);

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

  const handleSkip = useCallback(() => {
    if (!getAuthToken()) {
      setErrors({ general: firstLoginChangePasswordMock.missingSessionError });
      return;
    }

    clearFirstLoginPasswordStep();
    navigate(routePaths.dashboard, { replace: true });
  }, [navigate]);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (!getAuthToken()) {
        setErrors({ general: firstLoginChangePasswordMock.missingSessionError });
        return;
      }

      const nextErrors = validateChangePasswordForm(form, errorCopy);
      setErrors(nextErrors);
      if (Object.keys(nextErrors).length > 0) return;

      setIsSubmitting(true);

      try {
        const response = await changePassword(buildChangePasswordPayload(form));

        if (!response?.success) {
          setErrors({
            general: response?.message || errorCopy.changeFailed,
          });
          return;
        }

        clearFirstLoginPasswordStep();
        clearAuthSession();
        navigate(routePaths.login, {
          replace: true,
          state: {
            message:
              response.message || firstLoginChangePasswordMock.successRedirectMessage,
          },
        });
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
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, navigate],
  );

  return {
    form,
    errors,
    isSubmitting,
    isReady,
    hasToken,
    updateField,
    handleSubmit,
    handleSkip,
  };
};
