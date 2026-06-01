export const schoolSetupPageMock = {
  title: 'School Setup',
  subtitle: 'Complete these steps to configure your school before using the dashboard.',
  steps: [
    { id: 'profile', label: 'School Profile' },
    { id: 'terms', label: 'Term Configuration' },
    { id: 'sequences', label: 'Number Sequences' },
    { id: 'admin', label: 'Create First Admin' },
  ],
  navigation: {
    backLabel: 'Back',
    nextLabel: 'Next',
    completeLabel: 'Complete Setup',
  },
  profile: {
    cardTitle: 'School profile',
    description: 'Enter your school details. Logo upload is optional (PNG/JPG, max 2MB).',
    logoUploadLabel: 'Upload school logo',
    logoUploadHint: 'Drag and drop or click to browse',
    fields: [
      { id: 'schoolName', label: 'School name', placeholder: 'Green Valley Public School', required: true },
      { id: 'address', label: 'Address', placeholder: 'Full postal address', required: true },
      { id: 'email', label: 'Contact email', type: 'email', placeholder: 'office@school.edu', required: true },
      { id: 'phone', label: 'Contact phone', placeholder: '+91', required: true },
      { id: 'affiliation', label: 'Affiliation number', placeholder: 'Optional' },
    ],
  },
  terms: {
    cardTitle: 'Term configuration',
    warning:
      'Term configuration cannot be changed after students are admitted. Please review carefully.',
    columns: ['TERM', 'NAME', 'DUE DATE', 'SPLIT %'],
    rows: [
      { id: 'term1', defaultName: 'Term 1', defaultDueDate: '', defaultSplit: '30' },
      { id: 'term2', defaultName: 'Term 2', defaultDueDate: '', defaultSplit: '30' },
      { id: 'term3', defaultName: 'Term 3', defaultDueDate: '', defaultSplit: '40' },
    ],
    totalValidLabel: 'Total: 100%',
    totalInvalidPrefix: 'Total:',
    totalInvalidSuffix: '— must equal 100%',
  },
  sequences: {
    cardTitle: 'Number sequences',
    description: 'Set prefixes and starting numbers for generated documents.',
    columns: ['TYPE', 'PREFIX', 'STARTING NUMBER'],
    rows: [
      { id: 'admission', type: 'Admission Numbers', defaultPrefix: 'SAV', defaultStart: '1' },
      { id: 'receipt', type: 'Receipt Numbers', defaultPrefix: 'RCP', defaultStart: '1001' },
      { id: 'invoice', type: 'Invoice Numbers', defaultPrefix: 'INV', defaultStart: '5001' },
    ],
    previewPrefix: 'Admission numbers will look like:',
    previewExample: 'SAV00001, SAV00002…',
  },
  admin: {
    cardTitle: 'Create first admin user',
    description: 'This account will manage school operations after setup.',
    fields: [
      { id: 'fullName', label: 'Full name', placeholder: 'Admin User', required: true },
      { id: 'username', label: 'Username', placeholder: 'admin.greenvalley', required: true },
      { id: 'email', label: 'Email', type: 'email', placeholder: 'admin@school.edu', required: true },
      { id: 'phone', label: 'Phone', placeholder: '+91', required: true },
      { id: 'password', label: 'Password', type: 'password', placeholder: '••••••••', required: true },
      { id: 'confirmPassword', label: 'Confirm password', type: 'password', placeholder: '••••••••', required: true },
    ],
  },
  success: {
    title: 'Setup complete',
    message: 'School setup complete. Welcome to Green Valley Public School!',
    dashboardLabel: 'Go to Dashboard',
  },
};
