import { useCallback, useMemo, useState } from 'react';
import { createUser } from '../../../apis/authApi';
import { userCreationPanelMock } from '../../../data/mocks/userCreation/userCreationPanel.mock';
import { getAuthUser } from '../../../services/authSession';
import { parseApiError } from '../../../utils/apiError';
import {
  buildCreateUserPayload,
  getAssignableRoleOptions,
  mapApiUserToLocal,
  validateCreateUserForm,
} from '../../../utils/createUser';

const { fields, errors: errorCopy, users: initialUsers } = userCreationPanelMock;

const ROLE_PLACEHOLDER = 'Select role';

const emptyForm = {
  userName: '',
  userEmail: '',
  userPhone: '',
  userRole: ROLE_PLACEHOLDER,
  password: '',
  confirmPassword: '',
};

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const isValidPhone = (value) => {
  const digits = value.replace(/\D/g, '');
  if (digits.length === 10) return /^[6-9]\d{9}$/.test(digits);
  if (digits.length === 12 && digits.startsWith('91')) return /^91[6-9]\d{9}$/.test(digits);
  return false;
};

const validateAccountFields = (form, nextErrors, requireRole = true) => {
  const trimmedName = form.userName.trim();
  const trimmedEmail = form.userEmail.trim();
  const trimmedPhone = form.userPhone.trim();

  if (!trimmedName) nextErrors.userName = errorCopy.userNameRequired;
  if (!trimmedEmail) nextErrors.userEmail = errorCopy.emailRequired;
  else if (!isValidEmail(trimmedEmail)) nextErrors.userEmail = errorCopy.emailInvalid;
  if (!trimmedPhone) nextErrors.userPhone = errorCopy.phoneRequired;
  else if (!isValidPhone(trimmedPhone)) nextErrors.userPhone = errorCopy.phoneInvalid;
  if (requireRole && (form.userRole === ROLE_PLACEHOLDER || !form.userRole)) {
    nextErrors.userRole = errorCopy.roleRequired;
  }
};

export const useUserCreationForm = () => {
  const [users, setUsers] = useState(initialUsers);
  const [activeSection, setActiveSection] = useState(userCreationPanelMock.defaultSection);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const callerRole = getAuthUser()?.role ?? 'PRINCIPAL';

  const createRoleOptions = useMemo(
    () => getAssignableRoleOptions(callerRole),
    [callerRole],
  );

  const selectedUser = users.find((user) => user.id === selectedUserId) ?? null;

  const userOptions = [
    userCreationPanelMock.selectUser.emptyOption,
    ...users.map((user) => user.userName),
  ];

  const resetForm = useCallback(() => {
    setActiveSection(userCreationPanelMock.defaultSection);
    setSelectedUserId('');
    setForm(emptyForm);
    setErrors({});
    setSuccessMessage('');
    setIsSubmitting(false);
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
    setSuccessMessage('');
  }, []);

  const handleSectionChange = useCallback((sectionId) => {
    setActiveSection(sectionId);
    setErrors({});
    setSuccessMessage('');
    setSelectedUserId('');
    setForm(emptyForm);
  }, []);

  const handleSelectUser = useCallback((userId) => {
    setSelectedUserId(userId);
    setErrors((prev) => {
      if (!prev.selectedUser) return prev;
      const next = { ...prev };
      delete next.selectedUser;
      return next;
    });

    const user = users.find((item) => item.id === userId);
    if (user) {
      setForm({
        userName: user.userName,
        userEmail: user.userEmail,
        userPhone: user.userPhone,
        userRole: user.userRole,
        password: '',
        confirmPassword: '',
      });
    } else {
      setForm(emptyForm);
    }
  }, [users]);

  const validateEdit = useCallback(() => {
    const nextErrors = {};
    if (!selectedUserId) nextErrors.selectedUser = errorCopy.userRequired;
    validateAccountFields(form, nextErrors);
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [form, selectedUserId]);

  const validateDelete = useCallback(() => {
    const nextErrors = {};
    if (!selectedUserId) nextErrors.selectedUser = errorCopy.userRequired;
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [selectedUserId]);

  const handleCreateSubmit = useCallback(async () => {
    const nextErrors = validateCreateUserForm(form, errorCopy);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return false;

    setIsSubmitting(true);
    setSuccessMessage('');

    try {
      const payload = buildCreateUserPayload(form);
      const response = await createUser(payload);

      if (!response?.success || !response?.data) {
        setErrors({
          general: response?.message || errorCopy.createFailed,
        });
        return false;
      }

      const newUser = mapApiUserToLocal(response.data);
      setUsers((prev) => [...prev, newUser]);
      setForm(emptyForm);
      setErrors({});
      setSuccessMessage(response.message || errorCopy.createSuccess);
      return true;
    } catch (error) {
      const { general, fieldErrors } = parseApiError(error, 'createUser');
      setErrors({
        ...fieldErrors,
        ...(general ? { general } : {}),
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [form]);

  const handleEditSubmit = useCallback(async () => {
    if (!validateEdit()) return false;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      setUsers((prev) =>
        prev.map((user) =>
          user.id === selectedUserId
            ? {
                ...user,
                userName: form.userName.trim(),
                userEmail: form.userEmail.trim(),
                userPhone: form.userPhone.trim(),
                userRole: form.userRole,
              }
            : user,
        ),
      );
      return true;
    } finally {
      setIsSubmitting(false);
    }
  }, [form, selectedUserId, validateEdit]);

  const handleDeleteSubmit = useCallback(async () => {
    if (!validateDelete()) return false;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      setUsers((prev) => prev.filter((user) => user.id !== selectedUserId));
      setSelectedUserId('');
      setForm(emptyForm);
      return true;
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedUserId, validateDelete]);

  return {
    users,
    activeSection,
    selectedUserId,
    selectedUser,
    form,
    errors,
    isSubmitting,
    successMessage,
    userOptions,
    createRoleOptions,
    resetForm,
    updateField,
    handleSectionChange,
    handleSelectUser,
    handleCreateSubmit,
    handleEditSubmit,
    handleDeleteSubmit,
  };
};
