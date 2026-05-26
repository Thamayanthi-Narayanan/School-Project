export const sidebarMock = {
  brand: {
    name: 'Scholaris',
    tagline: 'SCHOOL ERP · V2.4',
  },
  sections: [
    {
      id: 'overview',
      label: 'OVERVIEW',
      items: [
        { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: 'grid' },
      ],
    },
    {
      id: 'people',
      label: 'PEOPLE',
      items: [
        { id: 'students', label: 'Students', path: '/students', icon: 'users' },
        { id: 'admission', label: 'Admission', path: '/admission', icon: 'userPlus' },
      ],
    },
    {
      id: 'finance',
      label: 'FINANCE',
      items: [
        { id: 'feeStructure', label: 'Fee Structure', path: '/fee-structure', icon: 'receipt' },
        { id: 'payments', label: 'Payments', path: '/payments', icon: 'wallet' },
        { id: 'scholarships', label: 'Scholarships', path: '/scholarships', icon: 'award' },
      ],
    },
    {
      id: 'workspace',
      label: 'WORKSPACE',
      items: [
        { id: 'userCreation', label: 'User Creation', path: '/user-creation', icon: 'userPlus' },
        { id: 'reports', label: 'Reports', path: '/reports', icon: 'barChart' },
        { id: 'notifications', label: 'Notifications', path: '/notifications', icon: 'bell' },
        { id: 'settings', label: 'Settings', path: '/settings', icon: 'settings' },
      ],
    },
  ],
  footer: {
    logoutLabel: 'Logout',
    logoutPath: '/login',
  },
};
