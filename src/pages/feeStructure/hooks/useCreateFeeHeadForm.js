import { useCallback, useMemo, useState } from 'react';
import { createFeeHead } from '../../../apis/feesApi';
import { parseApiError } from '../../../utils/apiError';
import {
  buildCreateFeeHeadPayload,
  initialFeeHeadForm,
  validateFeeHeadFormFields,
} from '../../../utils/feeHeadFormUtils';

export const useCreateFeeHeadForm = (copy, onCreated) => {
  const [form, setForm] = useState(initialFeeHeadForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const reset = useCallback(() => {
    setForm(initialFeeHeadForm);
    setErrors({});
  }, []);

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

  const payload = useMemo(() => buildCreateFeeHeadPayload(form), [form]);

  const handleSubmit = useCallback(async () => {
    const validationErrors = validateFeeHeadFormFields(form, copy.validation, {
      requireCore: true,
    });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return false;

    setIsSubmitting(true);
    setSuccessMessage('');

    try {
      const response = await createFeeHead(payload);

      if (!response?.success) {
        setErrors({ general: response?.message || copy.createFailed });
        return false;
      }

      setSuccessMessage(response.message || copy.createSuccess);
      if (onCreated) await onCreated(response.data);
      reset();
      return true;
    } catch (error) {
      const { general, fieldErrors } = parseApiError(error);
      setErrors({
        ...fieldErrors,
        ...(general ? { general } : { general: copy.createFailed }),
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [copy, form, onCreated, payload, reset]);

  return {
    form,
    errors,
    isSubmitting,
    successMessage,
    updateField,
    handleSubmit,
    reset,
    setSuccessMessage,
  };
};
