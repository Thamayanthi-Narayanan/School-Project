import { USER_ROLES } from '../../../constants/userRoles';
import { routePaths } from '../../../constants/routePaths';

const { OWNER, ADMIN, PRINCIPAL, ACCOUNTANT } = USER_ROLES;
const ADMIN_ROLES = [OWNER, ADMIN];
const FINANCE_ROLES = [OWNER, ADMIN, PRINCIPAL, ACCOUNTANT];
const FEE_CONFIG_ROLES = [OWNER, ADMIN];

export const sidebarMock = {
  brand: {
    name: 'Scholaris',
    tagline: 'SCHOOL ERP',
  },
  sections: [
    {
      id: 'school',
      label: 'SCHOOL',
      items: [
        { id: 'dashboard', label: 'Dashboard', path: routePaths.dashboard, icon: 'grid' },
        { id: 'students', label: 'Students', path: routePaths.students, icon: 'users' },
        { id: 'admission', label: 'Admissions', path: routePaths.admission, icon: 'userPlus' },
      ],
    },
    {
      id: 'academics',
      label: 'ACADEMICS',
      items: [
        {
          id: 'academicYears',
          label: 'Academic Years',
          path: routePaths.academicYears,
          icon: 'calendar',
          roles: ADMIN_ROLES,
        },
        {
          id: 'classesSections',
          label: 'Classes & Sections',
          path: routePaths.classesSections,
          icon: 'layers',
          roles: ADMIN_ROLES,
        },
        {
          id: 'feeHead',
          label: 'Fee Heads',
          path: routePaths.feeHead,
          icon: 'fileDollar',
          roles: ADMIN_ROLES,
        },
      ],
    },
    {
      id: 'feeManagement',
      label: 'FEE MANAGEMENT',
      items: [
        {
          id: 'feeStructure',
          label: 'Fee Structure',
          path: routePaths.feeStructure,
          icon: 'receipt',
          roles: FEE_CONFIG_ROLES,
        },
        {
          id: 'studentFeeSetup',
          label: 'Student Fee Setup',
          path: routePaths.studentFeeSetup,
          icon: 'wallet',
          roles: FINANCE_ROLES,
        },
        {
          id: 'feeDues',
          label: 'Fee Dues',
          path: routePaths.feeDues,
          icon: 'alert',
          roles: FINANCE_ROLES,
        },
      ],
    },
    {
      id: 'payments',
      label: 'PAYMENTS',
      items: [
        {
          id: 'collectFee',
          label: 'Collect Fee',
          path: routePaths.payments,
          icon: 'wallet',
          roles: FINANCE_ROLES,
        },
        {
          id: 'invoices',
          label: 'Invoices',
          path: routePaths.invoices,
          icon: 'fileText',
          roles: FINANCE_ROLES,
        },
        {
          id: 'refunds',
          label: 'Refunds',
          path: routePaths.refunds,
          icon: 'rotateCcw',
          roles: FINANCE_ROLES,
        },
      ],
    },
    {
      id: 'scholarships',
      label: 'SCHOLARSHIPS',
      items: [
        {
          id: 'scholarships',
          label: 'Schemes',
          path: routePaths.scholarships,
          icon: 'award',
          roles: FINANCE_ROLES,
        },
        {
          id: 'scholarshipRequests',
          label: 'Requests',
          path: routePaths.scholarshipRequests,
          icon: 'clipboard',
          roles: FINANCE_ROLES,
        },
      ],
    },
    {
      id: 'reports',
      label: 'REPORTS',
      items: [
        { id: 'reports', label: 'Reports', path: routePaths.reports, icon: 'barChart' },
      ],
    },
    {
      id: 'administration',
      label: 'ADMINISTRATION',
      items: [
        {
          id: 'users',
          label: 'Users',
          path: routePaths.users,
          icon: 'userPlus',
          roles: ADMIN_ROLES,
        },
        {
          id: 'schoolSettings',
          label: 'School Settings',
          path: routePaths.schoolSettings,
          icon: 'settings',
          roles: ADMIN_ROLES,
        },
      ],
    },
  ],
  footer: {
    logoutLabel: 'Logout',
    logoutPath: '/login',
  },
};
