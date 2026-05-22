import { useCallback, useEffect, useRef, useState } from 'react';
import { admitStudent } from '../../../apis/studentsApi';
import { parseApiError } from '../../../utils/apiError';
import { admissionPageMock } from '../../../data/mocks/admission/admissionPage.mock';
import {
  createInitialAdmissionForm,
  buildAdmissionPayload,
  validateAdmissionForm,
  validateProfilePhoto,
} from '../../../utils/admissionForm';

const errorCopy = admissionPageMock.errors;
const successCopy = admissionPageMock.successPopup;

const revokePhotoUrl = (url) => {
  if (url && url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
};

const useAdmissionForm = () => {
  const [form, setForm] = useState(createInitialAdmissionForm);
  const [setupConfirmed, setSetupConfirmed] = useState(false);
  const [setupClassId, setSetupClassId] = useState('');
  const [setupAcademicYearId, setSetupAcademicYearId] = useState('');
  const [profilePhotoError, setProfilePhotoError] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResult, setSuccessResult] = useState(null);
  const photoUrlRef = useRef('');

  useEffect(
    () => () => {
      revokePhotoUrl(photoUrlRef.current);
    },
    [],
  );

  const clearFieldError = useCallback((name) => {
    setErrors((prev) => {
      if (!prev[name] && !prev.general) return prev;
      const next = { ...prev };
      delete next[name];
      delete next.general;
      return next;
    });
  }, []);

  const updateStudentField = useCallback((name, value) => {
    clearFieldError(name);
    setForm((prev) => ({
      ...prev,
      student: { ...prev.student, [name]: value },
    }));
  }, [clearFieldError]);

  const updateParentsField = useCallback((name, value) => {
    clearFieldError(name);
    setForm((prev) => ({
      ...prev,
      parents: { ...prev.parents, [name]: value },
    }));
  }, [clearFieldError]);

  const setProfilePhoto = useCallback((file) => {
    if (!file) {
      revokePhotoUrl(photoUrlRef.current);
      photoUrlRef.current = '';
      setProfilePhotoError('');
      setForm((prev) => ({
        ...prev,
        documents: {
          profilePhotoUrl: '',
          profilePhotoName: '',
        },
      }));
      return;
    }

    const validationError = validateProfilePhoto(file);
    if (validationError) {
      setProfilePhotoError(validationError);
      return;
    }

    revokePhotoUrl(photoUrlRef.current);
    const previewUrl = URL.createObjectURL(file);
    photoUrlRef.current = previewUrl;
    setProfilePhotoError('');
    setForm((prev) => ({
      ...prev,
      documents: {
        profilePhotoUrl: previewUrl,
        profilePhotoName: file.name,
      },
    }));
  }, []);

  const confirmSetup = useCallback(() => {
    setForm((prev) => ({
      ...prev,
      student: {
        ...prev.student,
        classId: setupClassId,
        academicYearId: setupAcademicYearId,
      },
    }));
    setSetupConfirmed(true);
    setErrors({});
  }, [setupClassId, setupAcademicYearId]);

  const resetFormState = useCallback(() => {
    revokePhotoUrl(photoUrlRef.current);
    photoUrlRef.current = '';
    setForm(createInitialAdmissionForm());
    setProfilePhotoError('');
    setErrors({});
    setSuccessResult(null);
  }, []);

  const resetSetup = useCallback(() => {
    setSetupConfirmed(false);
    setSetupClassId('');
    setSetupAcademicYearId('');
    resetFormState();
  }, [resetFormState]);

  const dismissSuccess = useCallback(() => {
    setSuccessResult(null);
    setSetupConfirmed(false);
    setSetupClassId('');
    setSetupAcademicYearId('');
    resetFormState();
  }, [resetFormState]);

  const submitAdmission = useCallback(async () => {
    const validationErrors = validateAdmissionForm(form, errorCopy);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const payload = buildAdmissionPayload(form);
      const response = await admitStudent(payload);

      if (!response?.success) {
        setErrors({
          general: response?.message || errorCopy.submitFailed,
        });
        return false;
      }

      setSuccessResult({
        message: response.message || successCopy.message,
        data: response.data,
      });
      return true;
    } catch (error) {
      const { general, fieldErrors, status } = parseApiError(error, 'admission');
      setErrors({
        ...fieldErrors,
        ...(general
          ? {
              general:
                status === 409
                  ? errorCopy.conflict
                  : general,
            }
          : {}),
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [form]);

  return {
    form,
    setupConfirmed,
    setupClassId,
    setupAcademicYearId,
    profilePhotoError,
    errors,
    isSubmitting,
    successResult,
    successCopy,
    setSetupClassId,
    setSetupAcademicYearId,
    updateStudentField,
    updateParentsField,
    setProfilePhoto,
    confirmSetup,
    resetSetup,
    submitAdmission,
    dismissSuccess,
  };
};

export default useAdmissionForm;
