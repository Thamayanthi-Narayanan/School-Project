import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { routePaths } from '../../../constants/routePaths';

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
      nextErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.email = 'Enter a valid email address.';
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
