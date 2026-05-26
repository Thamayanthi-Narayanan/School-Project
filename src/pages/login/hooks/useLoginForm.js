import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { routePaths } from '../../../constants/routePaths';
import { login } from '../../../apis/authApi';
import {
  setAuthSession,
  setRememberedLogin,
  clearRememberedLogin,
  setPendingOtpIdentifier,
  setOtpLoginNotice,
  requiresOtpVerification,
} from '../../../services/authSession';
import { buildLoginPayload, validateLoginForm } from '../../../utils/loginIdentifier';
import { extractAuthSessionFromResponse } from '../../../utils/authResponse';
import { parseApiError } from '../../../utils/apiError';

const initialForm = {
  email: '',
  password: '',
  rememberMe: true,
};

export const useLoginForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  const validate = useCallback(() => {
    const nextErrors = validateLoginForm(form.email, form.password);
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [form.email, form.password]);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (!validate()) return;

      setIsLoading(true);
      setErrors({});

      try {
        const payload = buildLoginPayload(form.email, form.password);
        const response = await login(payload);

        if (!response?.success) {
          setErrors({
            general: response?.message || 'Login failed. Please try again.',
          });
          return;
        }

        if (requiresOtpVerification(response)) {
          const identifier = form.email.trim();
          const otpSentMessage =
            response.message || 'OTP sent successfully. Check your email or phone.';

          setPendingOtpIdentifier(identifier);
          setOtpLoginNotice(otpSentMessage);

          if (form.rememberMe) {
            setRememberedLogin(identifier);
          } else {
            clearRememberedLogin();
          }

          navigate(routePaths.loginOtp, {
            replace: true,
            state: { otpSentMessage },
          });
          return;
        }

        const session = extractAuthSessionFromResponse(response);

        if (!session) {
          setErrors({
            general: response?.message || 'Login failed. Please try again.',
          });
          return;
        }

        setAuthSession(session);

        if (form.rememberMe) {
          setRememberedLogin(form.email.trim());
        } else {
          clearRememberedLogin();
        }

        navigate(routePaths.dashboard, { replace: true });
      } catch (error) {
        const { general, fieldErrors } = parseApiError(error);
        setErrors({
          ...fieldErrors,
          ...(general ? { general } : {}),
        });
      } finally {
        setIsLoading(false);
      }
    },
    [form, validate, navigate],
  );

  return {
    form,
    errors,
    isLoading,
    updateField,
    handleSubmit,
  };
};
