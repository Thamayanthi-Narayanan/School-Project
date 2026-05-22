import { useCallback, useEffect, useRef, useState } from 'react';
import {
  createInitialAdmissionForm,
  buildAdmissionPayload,
  validateProfilePhoto,
} from '../../../utils/admissionForm';

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
  const photoUrlRef = useRef('');

  useEffect(
    () => () => {
      revokePhotoUrl(photoUrlRef.current);
    },
    [],
  );

  const updateStudentField = useCallback((name, value) => {
    setForm((prev) => ({
      ...prev,
      student: { ...prev.student, [name]: value },
    }));
  }, []);

  const updateParentsField = useCallback((name, value) => {
    setForm((prev) => ({
      ...prev,
      parents: { ...prev.parents, [name]: value },
    }));
  }, []);

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
  }, [setupClassId, setupAcademicYearId]);

  const resetSetup = useCallback(() => {
    setSetupConfirmed(false);
    setSetupClassId('');
    setSetupAcademicYearId('');
  }, []);

  const getPayload = useCallback(() => buildAdmissionPayload(form), [form]);

  return {
    form,
    setupConfirmed,
    setupClassId,
    setupAcademicYearId,
    profilePhotoError,
    setSetupClassId,
    setSetupAcademicYearId,
    updateStudentField,
    updateParentsField,
    setProfilePhoto,
    confirmSetup,
    resetSetup,
    getPayload,
  };
};

export default useAdmissionForm;
