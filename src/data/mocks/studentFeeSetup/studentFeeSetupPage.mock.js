export const studentFeeSetupPageMock = {
  title: 'Student Fee Setup',
  subtitle: 'Assign class fee structure, optional term split override, and student-specific fees.',
  selectors: {
    studentSearchPlaceholder: 'Search by name or admission number…',
    studentSearchAriaLabel: 'Search student for fee setup',
    academicYearAriaLabel: 'Academic year',
    academicYearPlaceholder: 'Select academic year',
    loadingLabel: 'Loading…',
    selectStudentHint: 'Select a student and academic year to configure fees.',
  },
  sections: {
    classSummary: {
      title: 'Class fee structure summary',
      description: 'Read-only reference from the class-level fee structure.',
      columns: ['FEE HEAD', 'ANNUAL AMOUNT', 'TERM 1', 'TERM 2', 'TERM 3'],
    },
    termOverride: {
      title: 'Term split override',
      useDefaultLabel: 'Use class default term split (30% / 30% / 40%)',
      customFields: [
        { id: 'term1', label: 'Term 1 %' },
        { id: 'term2', label: 'Term 2 %' },
        { id: 'term3', label: 'Term 3 %' },
      ],
    },
    additionalFees: {
      title: 'Additional fees',
      description: 'Fees specific to this student (e.g. transport, coaching).',
      addLabel: 'Add Fee',
      columns: ['FEE HEAD', 'ANNUAL AMOUNT', 'ACTIONS'],
      emptyMessage: 'No additional fees added.',
    },
    preview: {
      title: 'Preview',
      description: 'Resulting fee per term including class and additional fees.',
      columns: ['FEE HEAD', 'TYPE', 'TERM 1', 'TERM 2', 'TERM 3', 'ANNUAL TOTAL'],
    },
  },
  actions: {
    saveLabel: 'Save Fee Setup',
    cancelLabel: 'Cancel',
    savingLabel: 'Saving…',
  },
  sampleStudent: {
    id: 'SAV00042',
    label: 'Arjun Mehta (SAV00042)',
    classFeeRows: [
      { feeHead: 'Tuition', annual: '₹1,20,000', term1: '₹36,000', term2: '₹36,000', term3: '₹48,000' },
      { feeHead: 'Lab', annual: '₹12,000', term1: '₹3,600', term2: '₹3,600', term3: '₹4,800' },
    ],
    additionalFeeRows: [
      { id: 'af-1', feeHead: 'Transport', annual: '₹24,000' },
    ],
    previewRows: [
      { feeHead: 'Tuition', type: 'Class', term1: '₹36,000', term2: '₹36,000', term3: '₹48,000', annual: '₹1,20,000' },
      { feeHead: 'Transport', type: 'Additional', term1: '₹7,200', term2: '₹7,200', term3: '₹9,600', annual: '₹24,000' },
    ],
  },
};
