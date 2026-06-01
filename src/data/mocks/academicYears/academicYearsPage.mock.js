export const academicYearsPageMock = {
  title: 'Academic Years',
  subtitle: 'Manage academic years, set the current year, and control visibility in dropdowns.',
  actions: {
    addLabel: 'Add Academic Year',
    addAriaLabel: 'Add a new academic year',
    editAriaLabel: 'Edit academic year',
    deactivateAriaLabel: 'Deactivate academic year',
  },
  table: {
    columns: ['NAME', 'START DATE', 'END DATE', 'STATUS', 'CURRENT', 'ACTIONS'],
    emptyMessage: 'No academic years configured yet.',
  },
  years: [
    {
      id: 'ay-2025',
      name: '2025-26',
      startDate: '01 Apr 2025',
      endDate: '31 Mar 2026',
      status: 'Active',
      isCurrent: true,
      isDeactivated: false,
    },
    {
      id: 'ay-2024',
      name: '2024-25',
      startDate: '01 Apr 2024',
      endDate: '31 Mar 2025',
      status: 'Active',
      isCurrent: false,
      isDeactivated: false,
    },
    {
      id: 'ay-2023',
      name: '2023-24',
      startDate: '01 Apr 2023',
      endDate: '31 Mar 2024',
      status: 'Inactive',
      isCurrent: false,
      isDeactivated: true,
    },
  ],
  badges: {
    currentYear: 'Current Year',
  },
  addModal: {
    title: 'Add academic year',
    subtitle: 'Define the academic year period. You can mark it as the current year.',
    cancelLabel: 'Cancel',
    saveLabel: 'Save academic year',
    setCurrentLabel: 'Set as current year',
    currentYearWarning:
      'This will unset the current academic year designation from the previous year.',
    fields: [
      { id: 'name', type: 'text', label: 'Name', placeholder: 'e.g. 2026-27' },
      { id: 'startDate', type: 'text', label: 'Start date', placeholder: 'dd - mm - yyyy', icon: 'calendar' },
      { id: 'endDate', type: 'text', label: 'End date', placeholder: 'dd - mm - yyyy', icon: 'calendar' },
    ],
  },
  editModal: {
    title: 'Edit academic year',
    subtitle: 'Update dates or change the current year designation.',
    cancelLabel: 'Cancel',
    saveLabel: 'Save changes',
    setCurrentLabel: 'Set as current year',
    currentYearWarning:
      'This will unset the current academic year designation from the previous year.',
    fields: [
      { id: 'name', type: 'text', label: 'Name', placeholder: 'e.g. 2026-27' },
      { id: 'startDate', type: 'text', label: 'Start date', placeholder: 'dd - mm - yyyy', icon: 'calendar' },
      { id: 'endDate', type: 'text', label: 'End date', placeholder: 'dd - mm - yyyy', icon: 'calendar' },
    ],
  },
  deactivateModal: {
    title: 'Deactivate academic year?',
    confirmLabel: 'Deactivate',
    cancelLabel: 'Cancel',
    messagePrefix: 'Are you sure you want to deactivate',
    messageSuffix: 'This will hide it from dropdowns.',
  },
};
