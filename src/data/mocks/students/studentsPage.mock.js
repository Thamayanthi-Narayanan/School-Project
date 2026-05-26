export const studentsPageMock = {
  title: 'Students',
  subtitle: 'Manage student profiles, parents, fees and documents.',
  actions: {
    bulkUploadLabel: 'Bulk Upload',
    bulkUploadAriaLabel: 'Upload students in bulk',
    downloadFormatLabel: 'Download Format',
    downloadFormatAriaLabel: 'Download student import template',
    templateFileName: 'students-import-template.csv',
  },
  filters: {
    searchPlaceholder: 'Search by name or ID...',
    allClassesLabel: 'All classes',
    allSectionsLabel: 'All sections',
    defaultClass: 'All classes',
    defaultSection: 'All sections',
    defaultYear: '2025-26',
    loadingLabel: 'Loading…',
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
};
