export const navbarMock = {
  schoolName: 'Greenfield International School',
  pageTitle: 'Dashboard',
  searchPlaceholder: 'Search students, invoices, staff...',
  searchShortcut: '⌘ K',
  quickAddLabel: 'Quick Add',
  user: {
    name: 'Kavita M.',
    fullName: 'Kavita Menon',
    email: 'kavita@greenfield.edu',
    role: 'Principal',
    initials: 'KM',
  },
  profileMenu: {
    sectionLabel: 'Account',
    items: [
      { id: 'profile', label: 'Profile settings', path: '/settings?tab=profile' },
      { id: 'school', label: 'School preferences', path: '/settings?tab=school' },
      { id: 'notifications', label: 'Notifications', path: '/settings?tab=notifications' },
    ],
    signOutLabel: 'Sign out',
    signOutPath: '/login',
  },
};
