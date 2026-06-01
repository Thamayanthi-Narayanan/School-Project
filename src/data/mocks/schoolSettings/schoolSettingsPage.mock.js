export const schoolSettingsPageMock = {
  title: 'School Settings',
  subtitle: 'School profile, term configuration, and document number sequences.',
  tabs: [
    { id: 'profile', label: 'School Profile' },
    { id: 'terms', label: 'Term Configuration' },
    { id: 'sequences', label: 'Number Sequences' },
  ],
  defaultTab: 'profile',
  panels: {
    profile: {
      cardTitle: 'School profile',
      description: 'Update your school identity and contact details shown on receipts and reports.',
      primaryActionLabel: 'Save profile',
      logo: {
        alt: 'School logo',
        changeLabel: 'Change Logo',
        changeAriaLabel: 'Upload a new school logo',
      },
      fields: [
        { id: 'schoolName', label: 'School name', defaultValue: 'Green Valley Public School' },
        { id: 'address', label: 'Address', defaultValue: '12, Lake View Road, Chennai - 600028' },
        { id: 'email', label: 'Contact email', type: 'email', defaultValue: 'office@greenvalley.edu.in' },
        { id: 'phone', label: 'Contact phone', defaultValue: '+91 44 2345 6789' },
        { id: 'affiliation', label: 'Affiliation number', defaultValue: 'TN-10234' },
      ],
    },
    terms: {
      cardTitle: 'Term configuration',
      description: 'Three terms are required. Split percentages must total 100%.',
      warning:
        'Changing term configuration after admission may affect existing fee structures. Proceed carefully.',
      primaryActionLabel: 'Save term configuration',
      totalValidLabel: 'Total: 100%',
      totalInvalidPrefix: 'Total:',
      totalInvalidSuffix: '— must equal 100%',
      columns: ['TERM', 'NAME', 'DUE DATE', 'SPLIT %'],
      rows: [
        { id: 'term1', name: 'Term 1', dueDate: '15 Jul 2025', splitPercent: '30' },
        { id: 'term2', name: 'Term 2', dueDate: '15 Nov 2025', splitPercent: '30' },
        { id: 'term3', name: 'Term 3', dueDate: '15 Feb 2026', splitPercent: '40' },
      ],
    },
    sequences: {
      cardTitle: 'Number sequences',
      description: 'Prefixes and starting numbers for admission, receipt, and invoice documents.',
      primaryActionLabel: 'Save sequences',
      columns: ['TYPE', 'PREFIX', 'STARTING NUMBER', 'PREVIEW'],
      rows: [
        {
          id: 'admission',
          type: 'Admission Numbers',
          prefix: 'SAV',
          startingNumber: '1',
          preview: 'SAV00001, SAV00002…',
          startingEditable: true,
        },
        {
          id: 'receipt',
          type: 'Receipt Numbers',
          prefix: 'RCP',
          startingNumber: '1001',
          preview: 'RCP01001, RCP01002…',
          startingEditable: false,
        },
        {
          id: 'invoice',
          type: 'Invoice Numbers',
          prefix: 'INV',
          startingNumber: '5001',
          preview: 'INV05001, INV05002…',
          startingEditable: false,
        },
      ],
    },
  },
};
