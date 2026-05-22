export const settingsPageMock = {
  title: 'Settings',
  subtitle: 'Manage your profile, school information and security.',
  tabs: [
    { id: 'profile', label: 'Profile' },
    { id: 'school', label: 'School' },
    { id: 'security', label: 'Security' },
    { id: 'notifications', label: 'Notifications' },
  ],
  defaultTab: 'profile',
  panels: {
    profile: {
      cardTitle: 'Profile',
      description: 'Your account details from the school directory.',
      loadingLabel: 'Loading profile…',
      retryLabel: 'Try again',
      fields: [
        { id: 'fullName', label: 'Full name' },
        { id: 'username', label: 'Username' },
        { id: 'role', label: 'Role' },
        { id: 'email', label: 'Email', type: 'email' },
        { id: 'phone', label: 'Phone', type: 'tel' },
        { id: 'status', label: 'Status' },
      ],
    },
    school: {
      cardTitle: 'School information',
      fields: [
        { id: 'schoolName', label: 'School name', defaultValue: 'Greenfield International School' },
        { id: 'affiliation', label: 'Affiliation number', defaultValue: '830067' },
        { id: 'address', label: 'Address', defaultValue: '12, Park Avenue, Bengaluru' },
        { id: 'contactEmail', label: 'Contact email', defaultValue: 'contact@greenfield.edu' },
      ],
      primaryActionLabel: 'Save changes',
    },
    security: {
      cardTitle: 'Change password',
      description:
        'Enter your current password, then choose a new one. You will be signed out and must log in again with the new password.',
      fields: [
        {
          id: 'currentPassword',
          label: 'Current password',
          type: 'password',
          placeholder: 'Enter current password',
        },
        {
          id: 'newPassword',
          label: 'New password',
          type: 'password',
          placeholder: 'At least 8 characters',
        },
        {
          id: 'confirmNewPassword',
          label: 'Confirm new password',
          type: 'password',
          placeholder: 'Re-enter new password',
        },
      ],
      primaryActionLabel: 'Update password',
      submittingLabel: 'Updating…',
      actionAlign: 'end',
      successRedirectMessage:
        'Password changed successfully. Please sign in with your new password.',
    },
    notifications: {
      cardTitle: 'Notification preferences',
      items: [
        { id: 'feeReceipts', label: 'Fee payment receipts', enabled: true },
        { id: 'admissions', label: 'New admission applications', enabled: true },
        { id: 'scholarships', label: 'Scholarship requests', enabled: true },
        { id: 'weeklySummary', label: 'Weekly summary email', enabled: false },
      ],
    },
  },
  profileErrors: {
    loadFailed: 'Could not load profile. Please try again.',
    notFound: 'User not found or has been removed.',
    accessDenied: 'Access denied. Your role cannot load profile details.',
    authFailed: 'Your session has expired. Please sign in again.',
    missingSession: 'Could not determine your account. Please sign in again.',
  },
  securityErrors: {
    currentPasswordRequired: 'Current password is required.',
    newPasswordRequired: 'New password is required.',
    confirmNewPasswordRequired: 'Please confirm your new password.',
    passwordMin: 'Password must be at least 8 characters.',
    passwordMax: 'Password must be at most 255 characters.',
    passwordMismatch: 'New password and confirmation do not match.',
    sameAsCurrent: 'New password must be different from your current password.',
    changeFailed: 'Could not update password. Please try again.',
  },
};
