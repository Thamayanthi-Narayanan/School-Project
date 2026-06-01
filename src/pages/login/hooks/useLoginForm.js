import { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { routePaths } from '../../../constants/routePaths';
import { login } from '../../../apis/authApi';
import {
  setAuthSession,
  setRememberedLogin,
  clearRememberedLogin,
  setFirstLoginPasswordStep,
} from '../../../services/authSession';
import { buildLoginPayload, validateLoginForm } from '../../../utils/loginIdentifier';
import { extractAuthSessionFromResponse } from '../../../utils/authResponse';
import { parseApiError } from '../../../utils/apiError';

const initialForm = {
  email: '',
  password: '',
  rememberMe: true,
};

const isFirstLoginRequired = (response) => {
  const data = response?.data ?? response;
  return (
    data?.firstLogin === true
    || data?.mustChangePassword === true
    || data?.user?.mustChangePassword === true
    || data?.user?.firstLogin === true
  );
};

const isInactiveAccountError = (message) => {
  const lower = String(message || '').toLowerCase();
  return lower.includes('deactivat') || lower.includes('inactive');
};

export const useLoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
          const message = response?.message || 'Incorrect phone number or password.';
          setErrors({
            general: isInactiveAccountError(message)
              ? 'Your account has been deactivated. Contact your administrator.'
              : message,
          });
          return;
        }

        if (isFirstLoginRequired(response)) {
          const session = extractAuthSessionFromResponse(response);
          if (session) setAuthSession(session);
          setFirstLoginPasswordStep();
          navigate(routePaths.firstLoginChangePassword, { replace: true });
          return;
        }

        const session = extractAuthSessionFromResponse(response);

        if (!session) {
          setErrors({ general: 'Incorrect phone number or password.' });
          return;
        }

        setAuthSession(session);

        if (form.rememberMe) {
          setRememberedLogin(form.email.trim());
        } else {
          clearRememberedLogin();
        }

        const redirectTo = location.state?.from || routePaths.dashboard;
        navigate(redirectTo, { replace: true });
      } catch (error) {
        const { general, status } = parseApiError(error);
        const message = general || 'Incorrect phone number or password.';
        setErrors({
          general: status === 403 && isInactiveAccountError(message)
            ? 'Your account has been deactivated. Contact your administrator.'
            : message,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [form, validate, navigate, location.state],
  );

  return {
    form,
    errors,
    isLoading,
    updateField,
    handleSubmit,
  };
};
