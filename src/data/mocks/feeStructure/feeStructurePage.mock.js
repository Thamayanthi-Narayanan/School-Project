const feeHeadFormFields = {
  feeHeadCode: {
    label: 'Fee type',
    placeholder: 'TRANSPORT',
  },
  feeHeadName: {
    label: 'Fee type name',
    placeholder: 'Transport Fee',
  },
  mandatory: {
    label: 'Mandatory',
    options: ['Yes', 'No'],
  },
  active: {
    label: 'Active',
    options: ['Yes', 'No'],
  },
  displayOrder: {
    label: 'Display order',
    placeholder: '2',
  },
  description: {
    label: 'Description',
    placeholder: 'Optional description',
  },
};

const feeHeadFormValidation = {
  codeRequired: 'Fee type code is required.',
  codePattern: 'Use uppercase letters, numbers, and underscore only.',
  codeMax: 'Fee type code must be at most 30 characters.',
  nameRequired: 'Fee type name is required.',
  nameMax: 'Fee type name must be at most 100 characters.',
  displayOrderInt: 'Display order must be an integer.',
};

export const feeStructurePageMock = {
  title: 'Fee Head',
  subtitle: 'Manage fee head master records, class, academic year, and installment amounts.',
  sections: [
    { id: 'view', label: 'View fee heads', shortLabel: 'View', icon: 'eye' },
    { id: 'create', label: 'Create fee head', shortLabel: 'Create', icon: 'plus' },
  ],
  defaultSection: 'view',
  actions: {
    saveLabel: 'Save',
  },
  clearFeeAmounts: {
    title: 'Clear fee amounts',
    subtitle: 'Remove all Q1, Q2, Q3, and Annual amounts for "{name}"?',
    fallbackName: 'this category',
    hint: 'This only clears amounts on this screen. The fee head record is not deleted.',
    cancelLabel: 'Cancel',
    confirmLabel: 'Clear amounts',
  },
  deleteFeeHead: {
    title: 'Delete fee head',
    subtitle: 'Deactivate fee head "{name}"? It will no longer be available for new configurations.',
    fallbackName: 'this fee head',
    hint: 'The fee head will be deactivated in the system (soft delete).',
    cancelLabel: 'Cancel',
    confirmLabel: 'Delete head',
    deletingLabel: 'Deleting…',
    deleteSuccess: 'Fee head deleted successfully.',
    deleteFailed: 'Could not delete fee head. Please try again.',
  },
  editFeeHead: {
    title: 'Edit fee head',
    subtitle: 'Update the fee head master record for "{name}".',
    fallbackName: 'this fee head',
    cancelLabel: 'Cancel',
    submitLabel: 'Save changes',
    submittingLabel: 'Saving…',
    updateSuccess: 'Fee head updated successfully.',
    updateFailed: 'Could not update fee head. Please try again.',
    noChanges: 'Change at least one field before saving.',
    fields: feeHeadFormFields,
    validation: feeHeadFormValidation,
  },
  createFeeHead: {
    sectionTitle: 'Create fee head',
    sectionHint: 'Add a fee head master record used when configuring class installment amounts.',
    submitLabel: 'Create fee head',
    submittingLabel: 'Creating…',
    createSuccess: 'Fee head created successfully.',
    createFailed: 'Could not create fee head. Please try again.',
    fields: feeHeadFormFields,
    validation: feeHeadFormValidation,
  },
  editFeeQuarters: {
    title: 'Edit fee amounts',
    subtitle: 'Set installment amounts for "{name}".',
    fallbackName: 'this category',
    cancelLabel: 'Cancel',
    submitLabel: 'Save changes',
    submittingLabel: 'Saving…',
    saveSuccess: 'Fee amounts updated.',
    noChanges: 'Change at least one amount before saving.',
    totalLabel: 'Row total',
    fields: {
      q1: { label: 'Q1', placeholder: '0' },
      q2: { label: 'Q2', placeholder: '0' },
      q3: { label: 'Q3', placeholder: '0' },
      q4: { label: 'Annual', placeholder: '0' },
    },
    validation: {
      invalidAmount: 'Enter a valid amount (0 or greater).',
    },
  },
  config: {
    classLabel: 'Class',
    loadingLabel: 'Loading…',
    academicYearLabel: 'Academic Year',
    installmentsLabel: 'Installments',
    lateFeeLabel: 'Late fee per day',
    defaultLateFee: '50',
  },
  categories: {
    sectionTitle: 'Fee heads',
    columns: ['CATEGORY', 'Q1', 'Q2', 'Q3', 'ANNUAL', 'TOTAL'],
    createColumns: ['CATEGORY'],
    actionHeadings: {
      edit: 'EDIT',
      delete: 'DELETE',
    },
    quarterAria: {
      q1: 'Q1',
      q2: 'Q2',
      q3: 'Q3',
      q4: 'Annual',
    },
    list: {
      loadingMessage: 'Loading fee heads…',
      emptyMessage: 'No fee heads yet. Switch to Create to add a fee head.',
      loadFailed: 'Could not load fee heads. Please try again.',
      accessDenied: 'You do not have permission to view fee heads.',
      authFailed: 'Please sign in again to view fee heads.',
      retryLabel: 'Try again',
    },
    totalsRow: {
      label: 'Totals',
    },
  },
};
