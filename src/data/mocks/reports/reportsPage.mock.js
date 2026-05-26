export const reportsPageMock = {
  title: 'Reports',
  subtitle: 'Generate and export key school reports.',
  filters: {
    allClassesLabel: 'All classes',
    defaultClass: 'All classes',
    loadingLabel: 'Loading…',
  },
  actions: {
    excelLabel: 'Excel',
    pdfLabel: 'PDF',
    runLabel: 'Run',
  },
  reports: [
    {
      id: 'student-report',
      title: 'Student Report',
      description: 'Roster, class-wise breakdown, demographics.',
      icon: 'users',
      iconVariant: 'blue',
    },
    {
      id: 'fee-collection',
      title: 'Fee Collection',
      description: 'Daily / monthly fee collection summary.',
      icon: 'wallet',
      iconVariant: 'green',
    },
    {
      id: 'pending-fees',
      title: 'Pending Fees',
      description: 'Outstanding dues with parent contact info.',
      icon: 'alert',
      iconVariant: 'amber',
    },
    {
      id: 'scholarship-report',
      title: 'Scholarship Report',
      description: 'Approved, pending and rejected scholarships.',
      icon: 'award',
      iconVariant: 'blue',
    },
    {
      id: 'attendance-report',
      title: 'Attendance',
      description: 'Monthly attendance for students and staff.',
      icon: 'calendar',
      iconVariant: 'blue',
    },
  ],
};
