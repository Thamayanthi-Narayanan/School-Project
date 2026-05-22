export const studentsPageMock = {
  title: 'Students',
  subtitle: 'Manage student profiles, parents, fees and documents.',
  actions: {
    bulkUploadLabel: 'Bulk Upload',
    addStudentLabel: 'Add Student',
  },
  filters: {
    searchPlaceholder: 'Search by name or ID...',
    classOptions: ['All classes', 'Class 10-A', 'Class 9-B', 'Class 8-C'],
    sectionOptions: ['All sections', 'Section A', 'Section B', 'Section C'],
    yearOptions: ['2025-26', '2024-25', '2023-24'],
    defaultClass: 'All classes',
    defaultSection: 'All sections',
    defaultYear: '2025-26',
  },
  listErrors: {
    loadFailed: 'Could not load students. Please try again.',
    authFailed: 'Please sign in again to view students.',
    accessDenied: 'You do not have permission to view students.',
  },
  list: {
    loadingMessage: 'Loading students…',
    emptyMessage: 'No students found.',
  },
  pagination: {
    pageSize: 10,
    previousLabel: 'Previous',
    nextLabel: 'Next',
  },
  addStudentModal: {
    title: 'Add new student',
    subtitle: 'Create a student profile. You can complete details later.',
    cancelLabel: 'Cancel',
    saveLabel: 'Save student',
    fields: [
      { id: 'fullName', type: 'text', label: 'Full name', placeholder: 'Aarav Sharma' },
      { id: 'dateOfBirth', type: 'text', label: 'Date of birth', placeholder: 'dd - mm - yyyy', icon: 'calendar' },
      { id: 'className', type: 'select', label: 'Class', options: ['Select class', 'Class 10-A', 'Class 9-B', 'Class 8-C'] },
      { id: 'section', type: 'select', label: 'Section', options: ['Select section', 'Section A', 'Section B', 'Section C'] },
      { id: 'parentName', type: 'text', label: 'Parent name', placeholder: 'Rajesh Sharma' },
      { id: 'parentPhone', type: 'tel', label: 'Parent phone', placeholder: '+91', inputType: 'tel' },
    ],
  },
};
