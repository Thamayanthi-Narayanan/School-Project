import { useCallback, useEffect, useState } from 'react';
import { getUserById } from '../../../apis/authApi';
import { getAuthUser } from '../../../services/authSession';
import { mapApiProfileToForm } from '../../../utils/profileSettings';
import { parseApiError } from '../../../utils/apiError';
import { settingsPageMock } from '../../../data/mocks/settings/settingsPage.mock';

const errorCopy = settingsPageMock.profileErrors;

const emptyProfile = {
  fullName: '',
  username: '',
  role: '',
  email: '',
  phone: '',
  status: '',
};

const resolveSessionUserId = () => {
  const sessionUser = getAuthUser();
  return sessionUser?.id ?? sessionUser?.userId ?? null;
};

export const useSettingsProfile = (enabled) => {
  const [profile, setProfile] = useState(emptyProfile);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    const userId = resolveSessionUserId();

    if (userId == null) {
      setError(errorCopy.missingSession);
      setProfile(emptyProfile);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await getUserById(userId);

      if (!response?.success || !response?.data) {
        setError(response?.message || errorCopy.loadFailed);
        setProfile(emptyProfile);
        return;
      }

      setProfile(mapApiProfileToForm(response.data));
    } catch (err) {
      const { general, status } = parseApiError(err);

      setError(
        status === 404
          ? errorCopy.notFound
          : status === 403
            ? errorCopy.accessDenied
            : status === 401
              ? errorCopy.authFailed
              : general || errorCopy.loadFailed,
      );
      setProfile(emptyProfile);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    fetchProfile();
    return undefined;
  }, [enabled, fetchProfile]);

  return {
    profile,
    isLoading,
    error,
    refetch: fetchProfile,
  };
};
