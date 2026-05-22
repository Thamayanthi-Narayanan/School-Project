const AVATAR_TONES = ['blue', 'sky', 'green', 'orange', 'violet'];

export const formatUserDisplayId = (id) => {
  const numeric = String(id).replace(/\D/g, '');
  const padded = numeric.padStart(3, '0').slice(-3);
  return `USR${padded}`;
};

export const getUserInitials = (name) => {
  const trimmed = String(name || '').trim();
  if (!trimmed) return '—';

  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }

  return trimmed.slice(0, 2).toUpperCase();
};

export const getAvatarToneForUser = (id) => {
  const numeric = Number(String(id).replace(/\D/g, '')) || 0;
  return AVATAR_TONES[numeric % AVATAR_TONES.length];
};

export const filterUsersByQuery = (users, query) => {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return users;

  return users.filter((user) => {
    const haystack = [
      user.userName,
      user.username,
      user.userEmail,
      user.userPhone,
      user.userRole,
      user.status,
      formatUserDisplayId(user.id),
      String(user.id),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return haystack.includes(normalized);
  });
};
