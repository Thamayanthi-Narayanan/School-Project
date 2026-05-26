const feeHeadFormFields = {
  feeHeadCode: {
    label: 'Fee type',
    placeholder: 'TRANSPORT',
  },
  feeHeadName: {
    label: 'Fee type name',
    placeholder: 'Transport Fee',
  },
  description: {
    label: 'Description',
    placeholder: 'Optional description',
  },
  feeCategory: {
    label: 'Fee category',
    placeholder: 'TRANSPORT',
  },
  mandatory: {
    label: 'Mandatory',
    options: ['Yes', 'No'],
  },
  refundable: {
    label: 'Refundable',
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
};

const feeHeadFormValidation = {
  codeRequired: 'Fee type code is required.',
  codePattern: 'Use uppercase letters, numbers, and underscore only.',
  codeMax: 'Fee type code must be at most 30 characters.',
  nameRequired: 'Fee type name is required.',
  nameMax: 'Fee type name must be at most 100 characters.',
  categoryMax: 'Fee category must be at most 50 characters.',
  displayOrderInt: 'Display order must be an integer.',
};

export const feeStructurePageMock = {
  title: 'Fee Structure',
  subtitle: 'Configure class-wise fees, installments and scholarship discounts.',
  actions: {
    saveStructureLabel: 'Save Structure',
    addCategoryLabel: 'Add category',
  },
  deleteFeeHead: {
    title: 'Delete fee head',
    subtitle: 'Remove "{name}" from this fee structure? This cannot be undone from this screen.',
    fallbackName: 'this fee head',
    hint: 'The fee head will be deactivated in the system (soft delete).',
    cancelLabel: 'Cancel',
    confirmLabel: 'Delete',
    deletingLabel: 'Deleting…',
    deleteSuccess: 'Fee head deleted successfully.',
    deleteFailed: 'Could not delete fee head. Please try again.',
  },
  createFeeHead: {
    title: 'Create fee head',
    subtitle: 'Add a fee head master record used while building fee structures.',
    cancelLabel: 'Cancel',
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
    sectionTitle: 'Fee categories',
    columns: ['CATEGORY', 'Q1', 'Q2', 'Q3', 'ANNUAL', 'TOTAL'],
    quarterAria: {
      q1: 'Q1',
      q2: 'Q2',
      q3: 'Q3',
      q4: 'Annual',
    },
    list: {
      loadingMessage: 'Loading fee heads…',
      emptyMessage: 'No fee heads yet. Use Add category to create one.',
      loadFailed: 'Could not load fee heads. Please try again.',
      accessDenied: 'You do not have permission to view fee heads.',
      authFailed: 'Please sign in again to view fee heads.',
      retryLabel: 'Try again',
    },
    totalsRow: {
      label: 'Totals',
    },
  },
  scholarshipPreview: {
    cardTitle: 'Scholarship discount preview',
    discountTypeLabel: 'Discount type',
    discountPercentLabel: 'Discount %',
    defaultDiscountPercent: '10',
    schemeLabel: 'Scheme',
  },
  finalPayable: {
    cardTitle: 'Final payable',
    grossTotalLabel: 'Gross total',
    grossTotalValue: '₹81,200',
    discountLabel: 'Discount',
    discountValue: '– ₹8,120',
    payableLabel: 'Payable',
    payableValue: '₹73,080',
  },
};
