export const reportsPageMock = {
  title: 'Reports',
  subtitle: 'Generate and export key school reports.',
  filters: {
    academicYearOptions: ['2025-26', '2024-25', '2023-24'],
    defaultAcademicYear: '2025-26',
    classOptions: ['All classes', 'Class 10', 'Class 9', 'Class 12'],
    defaultClass: 'All classes',
    monthOptions: ['May 2026', 'April 2026', 'March 2026', 'February 2026'],
    defaultMonth: 'May 2026',
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
