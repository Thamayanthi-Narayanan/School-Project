import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { routePaths } from '../../../constants/routePaths';

const initialForm = {
  email: '',
  password: '',
  rememberMe: true,
};

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const isValidPhone = (value) => {
  const digits = value.replace(/\D/g, '');

  if (digits.length === 10) {
    return /^[6-9]\d{9}$/.test(digits);
  }

  if (digits.length === 12 && digits.startsWith('91')) {
    return /^91[6-9]\d{9}$/.test(digits);
  }

  return false;
};

const isValidEmailOrPhone = (value) => isValidEmail(value) || isValidPhone(value);

export const useLoginForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const updateField = useCallback((name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const validate = useCallback(() => {
    const nextErrors = {};
    const trimmedEmail = form.email.trim();

    if (!trimmedEmail) {
      nextErrors.email = 'Email or phone number is required.';
    } else if (!isValidEmailOrPhone(trimmedEmail)) {
      nextErrors.email = 'Enter a valid email address or phone number.';
    }

    if (!form.password) {
      nextErrors.password = 'Password is required.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [form.email, form.password]);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (!validate()) return;

      setIsLoading(true);
      try {
        if (form.rememberMe) {
          localStorage.setItem('rememberEmail', form.email.trim());
        } else {
          localStorage.removeItem('rememberEmail');
        }
        // API integration: authApi.login(form) when backend is ready
        await new Promise((resolve) => setTimeout(resolve, 600));
        navigate(routePaths.dashboard, { replace: true });
      } finally {
        setIsLoading(false);
      }
    },
    [form, validate, navigate]
  );

  return {
    form,
    errors,
    isLoading,
    updateField,
    handleSubmit,
  };
};
