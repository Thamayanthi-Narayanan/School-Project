import { useCallback, useState } from 'react';
import { userCreationPanelMock } from '../../../data/mocks/userCreation/userCreationPanel.mock';

const { fields, errors: errorCopy, users: initialUsers } = userCreationPanelMock;

const emptyForm = {
  userName: '',
  userEmail: '',
  userPhone: '',
  userRole: fields.userRole.options[0],
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
  if (requireRole && form.userRole === fields.userRole.options[0]) {
    nextErrors.userRole = errorCopy.roleRequired;
  }
};

const validatePasswordFields = (form, nextErrors) => {
  if (!form.password) nextErrors.password = errorCopy.passwordRequired;
  else if (form.password.length < 8) nextErrors.password = errorCopy.passwordMin;
  if (!form.confirmPassword) nextErrors.confirmPassword = errorCopy.confirmPasswordRequired;
  else if (form.password !== form.confirmPassword) {
    nextErrors.confirmPassword = errorCopy.passwordMismatch;
  }
};

export const useUserCreationForm = () => {
  const [users, setUsers] = useState(initialUsers);
  const [activeSection, setActiveSection] = useState(userCreationPanelMock.defaultSection);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(false);
  }, []);

  const updateField = useCallback((name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const handleSectionChange = useCallback((sectionId) => {
    setActiveSection(sectionId);
    setErrors({});
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

  const validateCreate = useCallback(() => {
    const nextErrors = {};
    validateAccountFields(form, nextErrors);
    validatePasswordFields(form, nextErrors);
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [form]);

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
    if (!validateCreate()) return false;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      const newUser = {
        id: `user-${Date.now()}`,
        userName: form.userName.trim(),
        userEmail: form.userEmail.trim(),
        userPhone: form.userPhone.trim(),
        userRole: form.userRole,
      };
      setUsers((prev) => [...prev, newUser]);
      setForm(emptyForm);
      setErrors({});
      return true;
    } finally {
      setIsSubmitting(false);
    }
  }, [form, validateCreate]);

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
    userOptions,
    resetForm,
    updateField,
    handleSectionChange,
    handleSelectUser,
    handleCreateSubmit,
    handleEditSubmit,
    handleDeleteSubmit,
  };
};
