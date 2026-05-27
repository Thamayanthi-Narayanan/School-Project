import { useCallback, useState } from 'react';
import { createScholarship } from '../../../apis/scholarshipsApi';
import { parseApiError } from '../../../utils/apiError';
import {
  buildCreateScholarshipPayload,
  initialScholarshipSchemeForm,
  mapApiFieldErrorsToForm,
  validateScholarshipSchemeForm,
} from '../../../utils/scholarshipSchemeFormUtils';

export const useCreateScholarshipForm = (copy, onCreated) => {
  const [form, setForm] = useState(initialScholarshipSchemeForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const reset = useCallback((defaults = {}) => {
    setForm({ ...initialScholarshipSchemeForm, ...defaults });
    setErrors({});
  }, []);

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

  const handleSubmit = useCallback(async () => {
    const validationErrors = validateScholarshipSchemeForm(form, copy.validation);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return false;

    setIsSubmitting(true);
    setSuccessMessage('');

    try {
      const response = await createScholarship(buildCreateScholarshipPayload(form));

      if (!response?.success) {
        setErrors({ general: response?.message || copy.createFailed });
        return false;
      }

      setSuccessMessage(response.message || copy.createSuccess);
      if (onCreated) await onCreated(response.data);
      reset();
      return true;
    } catch (error) {
      const { general, fieldErrors, status } = parseApiError(error);
      const mapped = mapApiFieldErrorsToForm({
        ...fieldErrors,
        ...(general ? { general } : {}),
      });

      if (status === 404 && general?.toLowerCase().includes('academic year')) {
        mapped.academicYearId = general;
      }

      setErrors(
        Object.keys(mapped).length > 0
          ? mapped
          : { general: copy.createFailed },
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [copy, form, onCreated, reset]);

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
