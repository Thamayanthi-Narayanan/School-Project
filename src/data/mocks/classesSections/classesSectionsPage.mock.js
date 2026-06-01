export const classesSectionsPageMock = {
  title: 'Classes & Sections',
  subtitle: 'Manage class display order and sections for each class.',
  classesPanel: {
    title: 'Classes',
    addLabel: 'Add Class',
    addAriaLabel: 'Add a new class',
    columns: ['CLASS', 'ORDER', 'STATUS', 'ACTIONS'],
    emptyMessage: 'No classes configured.',
  },
  sectionsPanel: {
    title: 'Sections',
    classSelectAriaLabel: 'Select class to view sections',
    classSelectPlaceholder: 'Select class',
    addLabel: 'Add Section',
    addAriaLabel: 'Add a section for the selected class',
    selectClassHint: 'Select a class to view and manage its sections.',
    columns: ['SECTION', 'STATUS', 'ACTIONS'],
    emptyMessage: 'No sections for this class.',
  },
  addClassModal: {
    title: 'Add class',
    subtitle: 'Create a class with display order for listings.',
    cancelLabel: 'Cancel',
    saveLabel: 'Save class',
    fields: [
      { id: 'className', type: 'text', label: 'Class name', placeholder: 'e.g. Class 10' },
      { id: 'displayOrder', type: 'text', label: 'Display order', placeholder: '1' },
    ],
  },
  addSectionModal: {
    title: 'Add section',
    subtitle: 'Add a section for the selected class.',
    cancelLabel: 'Cancel',
    saveLabel: 'Save section',
    fields: [
      { id: 'sectionName', type: 'text', label: 'Section name', placeholder: 'e.g. A' },
    ],
  },
  classes: [
    { id: 'cls-10', name: 'Class 10', displayOrder: 10, status: 'Active', isDeactivated: false },
    { id: 'cls-9', name: 'Class 9', displayOrder: 9, status: 'Active', isDeactivated: false },
    { id: 'cls-8', name: 'Class 8', displayOrder: 8, status: 'Inactive', isDeactivated: true },
  ],
  sectionsByClass: {
    'cls-10': [
      { id: 'sec-10a', name: 'A', status: 'Active', isDeactivated: false },
      { id: 'sec-10b', name: 'B', status: 'Active', isDeactivated: false },
    ],
    'cls-9': [
      { id: 'sec-9a', name: 'A', status: 'Active', isDeactivated: false },
    ],
    'cls-8': [],
  },
};
