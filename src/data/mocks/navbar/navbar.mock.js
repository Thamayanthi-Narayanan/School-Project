export const navbarMock = {
  schoolName: 'Greenfield International School',
  pageTitle: 'Dashboard',
  searchPlaceholder: 'Search students, invoices…',
  searchShortcut: '⌘ K',
  quickAddLabel: 'Admit Student',
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
      { id: 'settings', label: 'Settings', path: '/settings?tab=security' },
    ],
    signOutLabel: 'Logout',
    signOutPath: '/login',
  },
  sessionExpiry: {
    message: 'Your session expires in 5 minutes. Click to extend.',
    extendLabel: 'Extend session',
  },
};
