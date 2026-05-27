import { useCallback, useEffect, useMemo, useState } from 'react';
import { updateScholarship } from '../../../apis/scholarshipsApi';
import { parseApiError } from '../../../utils/apiError';
import { getSchemeId } from '../../../utils/scholarshipMapper';
import {
  buildUpdateScholarshipPayload,
  initialScholarshipSchemeForm,
  mapApiFieldErrorsToForm,
  scholarshipFromApiToForm,
  validateScholarshipSchemeForm,
} from '../../../utils/scholarshipSchemeFormUtils';

export const useEditScholarshipForm = (copy, editTarget, onUpdated) => {
  const [form, setForm] = useState(initialScholarshipSchemeForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!editTarget) {
      setForm(initialScholarshipSchemeForm);
      setErrors({});
      return;
    }
    setForm(scholarshipFromApiToForm(editTarget));
    setErrors({});
  }, [editTarget]);

  const reset = useCallback(() => {
    setForm(editTarget ? scholarshipFromApiToForm(editTarget) : initialScholarshipSchemeForm);
    setErrors({});
  }, [editTarget]);

  const updateField = useCallback((name, value) => {
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === 'applicableTo' && value !== 'SPECIFIC_HEAD') {
        next.feeHeadId = '';
      }
      return next;
    });
    setErrors((prev) => {
      if (!prev[name] && !prev.general) return prev;
      const next = { ...prev };
      delete next[name];
      delete next.general;
      return next;
    });
  }, []);

  const payload = useMemo(
    () => buildUpdateScholarshipPayload(form, editTarget),
    [form, editTarget],
  );

  const handleSubmit = useCallback(async () => {
    const schemeId = getSchemeId(editTarget);
    if (!schemeId) return false;

    const validationErrors = validateScholarshipSchemeForm(form, copy.validation);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return false;

    if (Object.keys(payload).length === 0) {
      setErrors({ general: copy.noChanges });
      return false;
    }

    setIsSubmitting(true);
    setSuccessMessage('');

    try {
      const response = await updateScholarship(schemeId, payload);

      if (!response?.success) {
        setErrors({ general: response?.message || copy.updateFailed });
        return false;
      }

      setSuccessMessage(response.message || copy.updateSuccess);
      if (onUpdated) await onUpdated(response.data);
      return true;
    } catch (error) {
      const { general, fieldErrors, status } = parseApiError(error);
      const mapped = mapApiFieldErrorsToForm({
        ...fieldErrors,
        ...(general ? { general } : {}),
      });

      if (status === 404) {
        mapped.general = copy.notFound;
      }

      setErrors(
        Object.keys(mapped).length > 0
          ? mapped
          : { general: copy.updateFailed },
      );
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
