const normalizeFieldKey = (key) => {
  if (!key) return null;
  if (key === 'email' || key === 'phone') return 'email';
  if (key === 'password') return 'password';
  return key;
};

const collectMessages = (errors) => {
  if (!errors) return [];

  if (Array.isArray(errors)) {
    return errors.filter(Boolean).map(String);
  }

  if (typeof errors === 'string') {
    return [errors];
  }

  if (typeof errors === 'object') {
    return Object.values(errors).flat().filter(Boolean).map(String);
  }

  return [];
};

export const parseApiError = (error) => {
  const data = error?.response?.data;
  const status = error?.response?.status;
  const fieldErrors = {};
  let general = null;

  if (data) {
    const messages = collectMessages(data.errors);

    if (data.errors && typeof data.errors === 'object' && !Array.isArray(data.errors)) {
      Object.entries(data.errors).forEach(([key, value]) => {
        const field = normalizeFieldKey(key);
        const message = Array.isArray(value) ? value[0] : value;

        if (field === 'email' || field === 'password') {
          fieldErrors[field] = String(message);
        }
      });
    }

    if (messages.length > 0 && Object.keys(fieldErrors).length === 0) {
      const identifierMessage = messages.find((msg) =>
        /exactly one of email or phone/i.test(msg),
      );

      if (identifierMessage) {
        fieldErrors.email = identifierMessage;
      } else if (messages.length === 1) {
        general = messages[0];
      } else {
        general = messages.join(' ');
      }
    }

    if (data.message && !general && Object.keys(fieldErrors).length === 0) {
      general = data.message;
    }
  }

  if (!general && Object.keys(fieldErrors).length === 0) {
    if (status === 401) {
      general = 'Authentication failed. Check your email or phone and password.';
    } else if (error?.message === 'Network Error') {
      general = 'Unable to reach the server. Check your connection and try again.';
    } else {
      general = 'Something went wrong. Please try again.';
    }
  }

  return { general, fieldErrors, status };
};
