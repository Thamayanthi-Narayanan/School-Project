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
      fields: [
        { id: 'fullName', label: 'Full name', defaultValue: 'Kavita Menon' },
        { id: 'role', label: 'Role', defaultValue: 'Principal' },
        { id: 'email', label: 'Email', defaultValue: 'kavita@greenfield.edu' },
        { id: 'phone', label: 'Phone', defaultValue: '+91 98765 11111' },
      ],
      primaryActionLabel: 'Save changes',
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
      fields: [
        { id: 'currentPassword', label: 'Current password', type: 'password', placeholder: '' },
        { id: 'newPassword', label: 'New password', type: 'password', placeholder: '' },
        { id: 'confirmPassword', label: 'Confirm new password', type: 'password', placeholder: '' },
      ],
      primaryActionLabel: 'Update password',
      actionAlign: 'end',
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
};
