const normalizeFieldKey = (key, context = 'login') => {
  if (!key) return null;

  if (context === 'createUser') {
    const map = {
      username: 'userName',
      fullName: 'userName',
      email: 'userEmail',
      phone: 'userPhone',
      role: 'userRole',
      status: 'userStatus',
      password: 'password',
    };
    return map[key] ?? null;
  }

  if (context === 'changePassword') {
    const map = {
      currentPassword: 'currentPassword',
      newPassword: 'newPassword',
      confirmNewPassword: 'confirmNewPassword',
      confirmPassword: 'confirmNewPassword',
    };
    return map[key] ?? null;
  }

  if (context === 'admission') {
    const map = {
      admissionNo: 'admissionNo',
      aadharNumber: 'aadharNumber',
      emisNumber: 'emisNumber',
      rationCardNumber: 'rationCardNumber',
      firstName: 'firstName',
      lastName: 'lastName',
      dateOfBirth: 'dateOfBirth',
      gender: 'gender',
      nationality: 'nationality',
      address: 'address',
      classId: 'classId',
      academicYearId: 'academicYearId',
      bloodGroup: 'bloodGroup',
      religion: 'religion',
      community: 'community',
      annualIncome: 'annualIncome',
      status: 'status',
      fatherName: 'fatherName',
      fatherPhone: 'fatherPhone',
      fatherEmail: 'fatherEmail',
      fatherOccupation: 'fatherOccupation',
      fatherAnnualIncome: 'fatherAnnualIncome',
      motherName: 'motherName',
      motherPhone: 'motherPhone',
      motherEmail: 'motherEmail',
      motherOccupation: 'motherOccupation',
      motherAnnualIncome: 'motherAnnualIncome',
      guardianName: 'guardianName',
      guardianPhone: 'guardianPhone',
      guardianEmail: 'guardianEmail',
      guardianOccupation: 'guardianOccupation',
      guardianRelationship: 'guardianRelationship',
      primaryContact: 'primaryContact',
      profilePhotoUrl: 'profilePhotoUrl',
      aadharNo: 'aadharNumber',
    };
    const normalizedKey = key.includes('.') ? key.split('.').pop() : key;
    return map[normalizedKey] ?? null;
  }

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

const mapMessageToFields = (message, context) => {
  const msg = String(message);
  const lower = msg.toLowerCase();

  if (context === 'changePassword') {
    if (lower.includes('current password')) return { currentPassword: msg };
    if (lower.includes('confirm') || lower.includes('confirmation')) {
      return { confirmNewPassword: msg };
    }
    if (lower.includes('new password')) return { newPassword: msg };
    return null;
  }

  if (context === 'admission') {
    if (lower.includes('admission')) return { admissionNo: msg };
    if (lower.includes('aadhaar') || lower.includes('aadhar')) return { aadharNumber: msg };
    if (lower.includes('class')) return { classId: msg };
    if (lower.includes('academic year') || lower.includes('academicyear')) {
      return { academicYearId: msg };
    }
    if (lower.includes('father') && lower.includes('email')) return { fatherEmail: msg };
    if (lower.includes('mother') && lower.includes('email')) return { motherEmail: msg };
    if (lower.includes('guardian')) return { guardianName: msg };
    if (lower.includes('email')) return { fatherEmail: msg };
    if (lower.includes('first name') || lower.includes('firstname')) return { firstName: msg };
    return null;
  }

  if (context !== 'createUser') return null;

  if (lower.includes('username')) return { userName: msg };
  if (lower.includes('email')) return { userEmail: msg };
  if (lower.includes('phone')) return { userPhone: msg };
  if (lower.includes('role') || lower.includes('assign')) return { userRole: msg };
  if (lower.includes('status')) return { userStatus: msg };
  if (lower.includes('password')) return { password: msg };

  return null;
};

export const parseApiError = (error, context = 'login') => {
  const data = error?.response?.data;
  const status = error?.response?.status;
  const fieldErrors = {};
  let general = null;

  if (data) {
    const messages = collectMessages(data.errors);

    if (data.errors && typeof data.errors === 'object' && !Array.isArray(data.errors)) {
      Object.entries(data.errors).forEach(([key, value]) => {
        const field = normalizeFieldKey(key, context);
        const message = Array.isArray(value) ? value[0] : value;

        if (field) {
          fieldErrors[field] = String(message);
        }
      });
    }

    if (messages.length > 0) {
      messages.forEach((msg) => {
        const mapped = mapMessageToFields(msg, context);
        if (mapped) {
          Object.assign(fieldErrors, mapped);
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

    if (data.message) {
      const isWrongCurrentPassword =
        context === 'changePassword'
        && status === 401
        && data.message.toLowerCase().includes('current password');

      if (isWrongCurrentPassword) {
        fieldErrors.currentPassword = data.message;
      } else if (
        status === 403
        || ((context === 'createUser' || context === 'admission') && !Object.keys(fieldErrors).length)
      ) {
        general = data.message;
      } else if (!general && Object.keys(fieldErrors).length === 0) {
        general = data.message;
      }
    }
  }

  if (!general && Object.keys(fieldErrors).length === 0) {
    if (status === 401) {
      general =
        context === 'createUser' || context === 'admission'
          ? 'Authentication failed. Please sign in again.'
          : context === 'changePassword'
            ? 'Authentication failed. Please sign in again.'
            : 'Authentication failed. Check your email or phone and password.';
    } else if (status === 403) {
      general = 'You do not have permission to perform this action.';
    } else if (status === 404) {
      general =
        context === 'createUser' || context === 'changePassword'
          ? 'User not found.'
          : 'The requested resource was not found.';
    } else if (error?.message === 'Network Error') {
      general = 'Unable to reach the server. Check your connection and try again.';
    } else {
      general = 'Something went wrong. Please try again.';
    }
  }

  return { general, fieldErrors, status };
};
