import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../../apis/authApi';
import { routePaths } from '../../../constants/routePaths';
import { forgotPasswordMock } from '../../../data/mocks/login/forgotPassword.mock';
import {
  buildPhoneOnlyPayload,
  validatePhoneField,
} from '../../../utils/loginIdentifier';
import { parseApiError } from '../../../utils/apiError';

const copy = forgotPasswordMock.request;

export const useForgotPasswordRequest = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const updateIdentifier = useCallback((value) => {
    setIdentifier(value);
    setSuccessMessage('');
    setErrors((prev) => {
      if (!prev.email && !prev.general) return prev;
      const next = { ...prev };
      delete next.email;
      delete next.general;
      return next;
    });
  }, []);

  const validate = useCallback(() => {
    const phoneError = validatePhoneField(identifier);
    if (phoneError) {
      setErrors({ email: phoneError });
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
      setSuccessMessage('');

      try {
        const response = await forgotPassword(buildPhoneOnlyPayload(identifier));

        if (!response?.success) {
          setErrors({ general: response?.message || copy.requestFailed });
          return;
        }

        setSuccessMessage(response.message || copy.successMessage);
      } catch (error) {
        const { general } = parseApiError(error);
        setErrors({ general: general || copy.requestFailed });
      } finally {
        setIsSubmitting(false);
      }
    },
    [identifier, validate],
  );

  const handleBackToLogin = useCallback(() => {
    navigate(routePaths.login, { replace: true });
  }, [navigate]);

  return {
    identifier,
    errors,
    isSubmitting,
    successMessage,
    updateIdentifier,
    handleSubmit,
    handleBackToLogin,
  };
};
