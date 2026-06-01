import { routePaths } from './routePaths';

export const pageTitles = {
  [routePaths.dashboard]: 'Dashboard',
  [routePaths.students]: 'Students',
  [routePaths.staff]: 'Staff',
  [routePaths.admission]: 'Admissions',
  [routePaths.attendance]: 'Attendance',
  [routePaths.scholarships]: 'Scholarship Schemes',
  [routePaths.scholarshipRequests]: 'Scholarship Requests',
  [routePaths.invoices]: 'Invoices',
  [routePaths.payments]: 'Collect Fee',
  [routePaths.settings]: 'Settings',
  [routePaths.notifications]: 'Notifications',
  [routePaths.transferCertificate]: 'Transfer Certificate',
  [routePaths.feeHead]: 'Fee Heads',
  [routePaths.feeStructure]: 'Fee Structure',
  [routePaths.studentFeeSetup]: 'Student Fee Setup',
  [routePaths.feeDues]: 'Fee Dues',
  [routePaths.refunds]: 'Refunds',
  [routePaths.reports]: 'Reports',
  [routePaths.users]: 'Users',
  [routePaths.bulkUpload]: 'Bulk Upload',
  [routePaths.schoolSetup]: 'School Setup',
  [routePaths.schoolSettings]: 'School Settings',
  [routePaths.academicYears]: 'Academic Years',
  [routePaths.classesSections]: 'Classes & Sections',
};

export const resolvePageTitle = (pathname) => {
  if (pageTitles[pathname]) return pageTitles[pathname];
  if (pathname.startsWith('/students/') && pathname.includes('/scholarship-request')) {
    return 'Scholarship Request';
  }
  if (pathname.startsWith('/students/')) return 'Student Detail';
  return 'Dashboard';
};
