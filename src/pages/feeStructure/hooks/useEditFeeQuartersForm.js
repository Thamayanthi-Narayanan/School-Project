import { useCallback, useEffect, useState } from 'react';
import { parseQuarterAmount } from '../../../utils/feeStructureAmounts';

const initialQuartersForm = {
  q1: '',
  q2: '',
  q3: '',
  q4: '',
};

const quartersFromRow = (row) => ({
  q1: row?.q1 ?? '',
  q2: row?.q2 ?? '',
  q3: row?.q3 ?? '',
  q4: row?.q4 ?? '',
});

const validateQuarterValue = (value, errorMessage) => {
  const trimmed = String(value ?? '').trim().replace(/,/g, '');
  if (!trimmed) return null;
  if (!/^\d+(\.\d+)?$/.test(trimmed)) return errorMessage;
  return null;
};

const quartersChanged = (form, original) =>
  form.q1 !== (original?.q1 ?? '')
  || form.q2 !== (original?.q2 ?? '')
  || form.q3 !== (original?.q3 ?? '')
  || form.q4 !== (original?.q4 ?? '');

export const useEditFeeQuartersForm = (copy, editTarget, onSave) => {
  const [form, setForm] = useState(initialQuartersForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!editTarget) {
      setForm(initialQuartersForm);
      setErrors({});
      return;
    }
    setForm(quartersFromRow(editTarget));
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

  const reset = useCallback(() => {
    setForm(editTarget ? quartersFromRow(editTarget) : initialQuartersForm);
    setErrors({});
  }, [editTarget]);

  const handleSubmit = useCallback(async () => {
    if (!editTarget?.id) return false;

    const validationErrors = {};
    ['q1', 'q2', 'q3', 'q4'].forEach((key) => {
      const error = validateQuarterValue(form[key], copy.validation.invalidAmount);
      if (error) validationErrors[key] = error;
    });

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return false;

    if (!quartersChanged(form, editTarget)) {
      setErrors({ general: copy.noChanges });
      return false;
    }

    setIsSubmitting(true);
    setSuccessMessage('');

    try {
      const normalized = {
        q1: String(form.q1).trim(),
        q2: String(form.q2).trim(),
        q3: String(form.q3).trim(),
        q4: String(form.q4).trim(),
      };

      if (onSave) {
        onSave(editTarget.id, normalized);
      }

      setSuccessMessage(copy.saveSuccess);
      return true;
    } finally {
      setIsSubmitting(false);
    }
  }, [copy, editTarget, form, onSave]);

  return {
    form,
    errors,
    isSubmitting,
    successMessage,
    updateField,
    handleSubmit,
    reset,
    setSuccessMessage,
    previewTotal: ['q1', 'q2', 'q3', 'q4'].reduce(
      (sum, key) => sum + parseQuarterAmount(form[key]),
      0,
    ),
  };
};
