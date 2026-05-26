import { useCallback, useMemo, useState } from 'react';
import { createUser, deleteUser, getUserById, listUsers, updateUser } from '../../../apis/authApi';
import { userCreationPanelMock } from '../../../data/mocks/userCreation/userCreationPanel.mock';
import { parseApiError } from '../../../utils/apiError';
import { useMasterDataContext } from '../../../context/masterDataContext';
import { buildRoleLoadingOptions, MASTER_DATA_KEYS } from '../../../utils/masterDataOptions';
import {
  buildCreateUserPayload,
  buildUpdateUserPayload,
  mapApiUserToLocal,
  mapApiUsersListToLocal,
  ROLE_SELECT_PLACEHOLDER,
  validateCreateUserForm,
  validateUpdateUserForm,
} from '../../../utils/createUser';
import {
  buildCreateRoleSelectOptions,
  buildEditRoleSelectOptions,
} from '../../../utils/roleSelectOptions';

const { fields, errors: errorCopy } = userCreationPanelMock;

const ROLE_PLACEHOLDER = fields.userRole.placeholder || ROLE_SELECT_PLACEHOLDER;

const emptyForm = {
  userName: '',
  userEmail: '',
  userPhone: '',
  userRole: ROLE_PLACEHOLDER,
  userStatus: 'ACTIVE',
  username: '',
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

const SECTIONS_NEEDING_USER_LIST = new Set(['view']);

export const useUserCreationForm = () => {
  const [users, setUsers] = useState([]);
  const [activeSection, setActiveSection] = useState(userCreationPanelMock.defaultSection);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [createdUserPopup, setCreatedUserPopup] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingUserSnapshot, setEditingUserSnapshot] = useState(null);
  const [isLoadingEditUser, setIsLoadingEditUser] = useState(false);
  const [updatedUserPopup, setUpdatedUserPopup] = useState(null);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [deleteSuccessPopup, setDeleteSuccessPopup] = useState(null);

  const {
    data: masterData,
    isLoading: isLoadingMasterData,
    error: masterDataError,
    refetch: refetchMasterData,
    getRawOptions,
  } = useMasterDataContext();

  const isLoadingRoles = isLoadingMasterData;
  const rolesLoadError = masterDataError;
  const refetchRoles = refetchMasterData;

  const createRoleOptions = useMemo(() => {
    if (isLoadingRoles) {
      return buildRoleLoadingOptions(errorCopy.loadingRoles);
    }
    return buildCreateRoleSelectOptions(
      getRawOptions(MASTER_DATA_KEYS.role),
      ROLE_PLACEHOLDER,
    );
  }, [getRawOptions, isLoadingRoles, errorCopy.loadingRoles]);

  const editRoleOptions = useMemo(() => {
    if (isLoadingRoles) {
      return buildRoleLoadingOptions(errorCopy.loadingRoles);
    }
    return buildEditRoleSelectOptions(
      getRawOptions(MASTER_DATA_KEYS.role),
      editingUserSnapshot?.userRole,
    );
  }, [editingUserSnapshot?.userRole, getRawOptions, isLoadingRoles, errorCopy.loadingRoles]);

  const userStatusOptions = useMemo(() => {
    if (isLoadingMasterData) {
      return buildRoleLoadingOptions(errorCopy.loadingRoles);
    }
    return getRawOptions(MASTER_DATA_KEYS.userStatus);
  }, [getRawOptions, isLoadingMasterData, errorCopy.loadingRoles]);

  const isLoadingUserStatus = isLoadingMasterData;

  const roleOptionsError = rolesLoadError ? errorCopy.loadRolesFailed : null;

  const selectedUser = users.find((user) => String(user.id) === String(selectedUserId)) ?? null;

  const userOptions = [
    userCreationPanelMock.selectUser.emptyOption,
    ...users.map((user) => user.userName),
  ];

  const fetchUsersList = useCallback(async () => {
    setIsLoadingUsers(true);
    setErrors((prev) => {
      if (!prev.general) return prev;
      const next = { ...prev };
      delete next.general;
      return next;
    });

    try {
      const response = await listUsers();

      if (!response?.success || !Array.isArray(response.data)) {
        setUsers([]);
        setErrors({ general: response?.message || errorCopy.loadUsersFailed });
        return;
      }

      setUsers(mapApiUsersListToLocal(response.data));
    } catch (error) {
      const { general } = parseApiError(error, 'createUser');
      setUsers([]);
      setErrors({ general: general || errorCopy.loadUsersFailed });
    } finally {
      setIsLoadingUsers(false);
    }
  }, []);

  const populateFormForUser = useCallback((user) => {
    if (!user) {
      setForm(emptyForm);
      return;
    }

    setForm({
      userName: user.userName,
      userEmail: user.userEmail,
      userPhone: user.userPhone,
      userRole: user.userRole,
      userStatus: user.status || 'ACTIVE',
      username: user.username || '',
      password: '',
      confirmPassword: '',
    });
    setEditingUserSnapshot(user);
  }, []);

  const resetForm = useCallback(() => {
    setActiveSection(userCreationPanelMock.defaultSection);
    setSelectedUserId('');
    setForm(emptyForm);
    setErrors({});
    setCreatedUserPopup(null);
    setEditingUserId(null);
    setEditingUserSnapshot(null);
    setIsLoadingEditUser(false);
    setUpdatedUserPopup(null);
    setDeletingUserId(null);
    setDeleteSuccessPopup(null);
    setIsLoadingUsers(false);
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
  }, []);

  const dismissCreatedUserPopup = useCallback(() => {
    setCreatedUserPopup(null);
  }, []);

  const handleSectionChange = useCallback(
    (sectionId) => {
      setActiveSection(sectionId);
      setErrors({});
      setSelectedUserId('');
      setCreatedUserPopup(null);
      setEditingUserId(null);
      setDeletingUserId(null);
      setForm(emptyForm);

      if (SECTIONS_NEEDING_USER_LIST.has(sectionId)) {
        fetchUsersList();
      }
    },
    [fetchUsersList],
  );

  const openEditUser = useCallback(
    async (userId) => {
      setEditingUserId(userId);
      setDeletingUserId(null);
      setSelectedUserId(userId);
      setErrors({});
      setUpdatedUserPopup(null);
      setIsLoadingEditUser(true);
      setForm(emptyForm);
      setEditingUserSnapshot(null);

      try {
        const response = await getUserById(userId);

        if (!response?.success || !response?.data) {
          setErrors({ general: response?.message || errorCopy.loadUserFailed });
          setEditingUserId(null);
          return;
        }

        const mapped = mapApiUserToLocal(response.data);
        populateFormForUser(mapped);
        setUsers((prev) => {
          const index = prev.findIndex((user) => String(user.id) === String(mapped.id));
          if (index === -1) return [...prev, mapped];
          const next = [...prev];
          next[index] = mapped;
          return next;
        });
      } catch (error) {
        const { general, status } = parseApiError(error, 'createUser');
        setErrors({
          general:
            status === 404
              ? errorCopy.userNotFound
              : general || errorCopy.loadUserFailed,
        });
        setEditingUserId(null);
      } finally {
        setIsLoadingEditUser(false);
      }
    },
    [populateFormForUser],
  );

  const closeEditUser = useCallback(() => {
    setEditingUserId(null);
    setEditingUserSnapshot(null);
    setSelectedUserId('');
    setForm(emptyForm);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.userName;
      delete next.userEmail;
      delete next.userPhone;
      delete next.userRole;
      delete next.userStatus;
      delete next.general;
      return next;
    });
  }, []);

  const dismissUpdatedUserPopup = useCallback(() => {
    setUpdatedUserPopup(null);
  }, []);

  const openDeleteUser = useCallback((userId) => {
    setDeletingUserId(userId);
    setEditingUserId(null);
    setEditingUserSnapshot(null);
    setSelectedUserId(userId);
    setDeleteSuccessPopup(null);
    setErrors({});
  }, []);

  const closeDeleteUser = useCallback(() => {
    setDeletingUserId(null);
    setSelectedUserId('');
    setErrors((prev) => {
      const next = { ...prev };
      delete next.general;
      return next;
    });
  }, []);

  const dismissDeleteSuccessPopup = useCallback(() => {
    setDeleteSuccessPopup(null);
  }, []);

  const handleSelectUser = useCallback(
    (userId) => {
      setSelectedUserId(userId);
      setErrors((prev) => {
        if (!prev.selectedUser) return prev;
        const next = { ...prev };
        delete next.selectedUser;
        return next;
      });

      const user = users.find((item) => String(item.id) === String(userId));
      populateFormForUser(user);
    },
    [users, populateFormForUser],
  );

  const validateEdit = useCallback(() => {
    const nextErrors = validateUpdateUserForm(form, editingUserSnapshot, errorCopy);
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [form, editingUserSnapshot]);

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
      setUsers((prev) => {
        const exists = prev.some((user) => String(user.id) === String(newUser.id));
        return exists ? prev : [...prev, newUser];
      });
      setForm(emptyForm);
      setErrors({});
      setCreatedUserPopup({
        user: newUser,
        message: response.message || errorCopy.createSuccess,
      });
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
      const payload = buildUpdateUserPayload(form);
      const response = await updateUser(selectedUserId, payload);

      if (!response?.success || !response?.data) {
        setErrors({
          general: response?.message || errorCopy.updateFailed,
        });
        return false;
      }

      const updatedUser = mapApiUserToLocal(response.data);
      setUsers((prev) =>
        prev.map((user) =>
          String(user.id) === String(updatedUser.id) ? updatedUser : user,
        ),
      );
      setUpdatedUserPopup({
        user: updatedUser,
        message: response.message || errorCopy.updateSuccess,
      });
      closeEditUser();
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
  }, [form, selectedUserId, validateEdit, closeEditUser]);

  const handleDeleteSubmit = useCallback(async () => {
    if (!validateDelete()) return false;

    const userToDelete = users.find(
      (user) => String(user.id) === String(selectedUserId),
    );

    setIsSubmitting(true);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.general;
      return next;
    });

    try {
      const response = await deleteUser(selectedUserId);

      if (!response?.success) {
        setErrors({
          general: response?.message || errorCopy.deleteFailed,
        });
        return false;
      }

      setUsers((prev) =>
        prev.filter((user) => String(user.id) !== String(selectedUserId)),
      );
      setDeleteSuccessPopup({
        userName: userToDelete?.userName || 'User',
        message: response.message || errorCopy.deleteSuccess,
      });
      closeDeleteUser();
      return true;
    } catch (error) {
      const { general, status } = parseApiError(error, 'createUser');
      setErrors({
        general:
          status === 404
            ? errorCopy.alreadyDeleted
            : general || errorCopy.deleteFailed,
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [users, selectedUserId, validateDelete, closeDeleteUser]);

  return {
    users,
    activeSection,
    selectedUserId,
    selectedUser,
    form,
    errors,
    isSubmitting,
    isLoadingUsers,
    createdUserPopup,
    editingUserId,
    editingUserSnapshot,
    isLoadingEditUser,
    updatedUserPopup,
    deletingUserId,
    deleteSuccessPopup,
    userOptions,
    createRoleOptions,
    editRoleOptions,
    userStatusOptions,
    isLoadingRoles,
    isLoadingUserStatus,
    roleOptionsError,
    refetchRoles,
    resetForm,
    updateField,
    handleSectionChange,
    dismissCreatedUserPopup,
    dismissUpdatedUserPopup,
    dismissDeleteSuccessPopup,
    handleSelectUser,
    openEditUser,
    closeEditUser,
    openDeleteUser,
    closeDeleteUser,
    handleCreateSubmit,
    handleEditSubmit,
    handleDeleteSubmit,
    fetchUsersList,
  };
};
