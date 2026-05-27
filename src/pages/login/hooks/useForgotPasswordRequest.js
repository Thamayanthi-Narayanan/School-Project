import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../../apis/authApi';
import { routePaths } from '../../../constants/routePaths';
import { forgotPasswordMock } from '../../../data/mocks/login/forgotPassword.mock';
import {
  setForgotPasswordNotice,
  setPendingResetIdentifier,
} from '../../../services/authSession';
import {
  buildIdentifierOnlyPayload,
  isValidEmailOrPhone,
} from '../../../utils/loginIdentifier';
import { parseApiError } from '../../../utils/apiError';

const copy = forgotPasswordMock.request;

export const useForgotPasswordRequest = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateIdentifier = useCallback((value) => {
    setIdentifier(value);
    setErrors((prev) => {
      if (!prev.email && !prev.general) return prev;
      const next = { ...prev };
      delete next.email;
      delete next.general;
      return next;
    });
  }, []);

  const validate = useCallback(() => {
    const trimmed = identifier.trim();
    if (!trimmed) {
      setErrors({ email: 'Email or phone number is required.' });
      return false;
    }
    if (!isValidEmailOrPhone(trimmed)) {
      setErrors({ email: 'Enter a valid email address or phone number.' });
      return false;
    }
    return true;
  }, [identifier]);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (!validate()) return;

      setIsSubmitting(true);
      setErrors({});

      try {
        const response = await forgotPassword(buildIdentifierOnlyPayload(identifier));

        if (!response?.success) {
          setErrors({ general: response?.message || copy.requestFailed });
          return;
        }

        const message = response.message || copy.defaultSuccessMessage;
        setPendingResetIdentifier(identifier.trim());
        setForgotPasswordNotice(message);

        navigate(routePaths.forgotPasswordOtp, {
          replace: false,
          state: { otpSentMessage: message },
        });
      } catch (error) {
        const { general } = parseApiError(error, 'otp');
        setErrors({ general: general || copy.requestFailed });
      } finally {
        setIsSubmitting(false);
      }
    },
    [identifier, validate, navigate],
  );

  const handleBackToLogin = useCallback(() => {
    navigate(routePaths.login, { replace: true });
  }, [navigate]);

  return {
    identifier,
    errors,
    isSubmitting,
    updateIdentifier,
    handleSubmit,
    handleBackToLogin,
  };
};
