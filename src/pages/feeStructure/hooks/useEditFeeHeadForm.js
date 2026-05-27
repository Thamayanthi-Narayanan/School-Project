import { useCallback, useEffect, useMemo, useState } from 'react';
import { updateFeeType } from '../../../apis/feesApi';
import { parseApiError } from '../../../utils/apiError';
import {
  buildUpdateFeeHeadPayload,
  feeHeadFromApiToForm,
  initialFeeHeadForm,
  validateFeeHeadFormFields,
} from '../../../utils/feeHeadFormUtils';

export const useEditFeeHeadForm = (copy, editTarget, onUpdated) => {
  const [form, setForm] = useState(initialFeeHeadForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!editTarget) {
      setForm(initialFeeHeadForm);
      setErrors({});
      return;
    }
    setForm(feeHeadFromApiToForm(editTarget));
    setErrors({});
  }, [editTarget]);

  const reset = useCallback(() => {
    setForm(editTarget ? feeHeadFromApiToForm(editTarget) : initialFeeHeadForm);
    setErrors({});
  }, [editTarget]);

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

  const payload = useMemo(
    () => buildUpdateFeeHeadPayload(form, editTarget),
    [form, editTarget],
  );

  const handleSubmit = useCallback(async () => {
    if (!editTarget?.id) return false;

    const validationErrors = validateFeeHeadFormFields(form, copy.validation, {
      requireCore: true,
    });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return false;

    if (Object.keys(payload).length === 0) {
      setErrors({ general: copy.noChanges });
      return false;
    }

    setIsSubmitting(true);
    setSuccessMessage('');

    try {
      const response = await updateFeeType(editTarget.id, payload);

      if (!response?.success) {
        setErrors({ general: response?.message || copy.updateFailed });
        return false;
      }

      setSuccessMessage(response.message || copy.updateSuccess);
      if (onUpdated) await onUpdated(response.data);
      return true;
    } catch (error) {
      const { general, fieldErrors } = parseApiError(error);
      setErrors({
        ...fieldErrors,
        ...(general ? { general } : { general: copy.updateFailed }),
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [copy, editTarget, form, onUpdated, payload]);

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
