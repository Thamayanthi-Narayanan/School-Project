export const admissionPageMock = {
  title: 'New Admission',
  subtitle: 'Add a new admission application in a few simple steps.',
  actions: {
    saveDraftLabel: 'Save Draft',
    submitLabel: 'Submit Application',
    backLabel: 'Back',
    continueLabel: 'Continue',
  },
  steps: [
    { id: 'studentDetails', label: 'Student Details' },
    { id: 'parentDetails', label: 'Parent Details' },
    { id: 'academicInfo', label: 'Academic Info' },
    { id: 'documents', label: 'Documents' },
    { id: 'review', label: 'Review' },
  ],
  stepForms: {
    studentDetails: {
      sectionTitle: 'Student Details',
      fields: [
        { id: 'fullName', type: 'text', label: 'Full name', placeholder: 'Ishaan Bose' },
        { id: 'dateOfBirth', type: 'text', label: 'Date of birth', placeholder: 'dd-mm-yyyy', icon: 'calendar' },
        { id: 'gender', type: 'select', label: 'Gender', options: ['Select', 'Male', 'Female', 'Other'] },
        { id: 'bloodGroup', type: 'text', label: 'Blood group', placeholder: 'O+' },
        { id: 'aadhaar', type: 'text', label: 'Aadhaar / ID number', placeholder: 'XXXX-XXXX-XXXX', fullWidth: true },
        { id: 'address', type: 'textarea', label: 'Address', placeholder: 'Street, City, State, PIN', fullWidth: true },
      ],
    },
    parentDetails: {
      sectionTitle: 'Parent Details',
      fields: [
        { id: 'fatherName', type: 'text', label: "Father's name", placeholder: '' },
        { id: 'fatherOccupation', type: 'text', label: "Father's occupation", placeholder: '' },
        { id: 'motherName', type: 'text', label: "Mother's name", placeholder: '' },
        { id: 'motherOccupation', type: 'text', label: "Mother's occupation", placeholder: '' },
        { id: 'primaryContact', type: 'tel', label: 'Primary contact', placeholder: '+91', inputType: 'tel' },
        { id: 'email', type: 'text', label: 'Email', placeholder: '', inputType: 'email' },
      ],
    },
    academicInfo: {
      sectionTitle: 'Academic Info',
      fields: [
        {
          id: 'classApplying',
          type: 'select',
          label: 'Class applying for',
          options: ['Class', 'Class 8', 'Class 9', 'Class 10'],
          defaultValue: 'Class',
        },
        {
          id: 'academicYear',
          type: 'select',
          label: 'Academic year',
          options: ['2026-27', '2025-26', '2024-25'],
          defaultValue: '2026-27',
        },
        { id: 'previousSchool', type: 'text', label: 'Previous school', placeholder: '' },
        { id: 'lastClassPassed', type: 'text', label: 'Last class passed', placeholder: '' },
        { id: 'percentageGrade', type: 'text', label: 'Percentage / Grade', placeholder: '' },
        { id: 'mediumOfInstruction', type: 'text', label: 'Medium of instruction', placeholder: 'English' },
      ],
    },
    documents: {
      sectionTitle: 'Documents',
      upload: {
        title: 'Drag & drop documents',
        subtext: 'PDF, JPG, PNG, DOC — up to 10 MB each',
        browseLabel: 'Browse files',
      },
      files: [
        { id: 'birthCertificate', name: 'Birth Certificate', status: 'Uploaded' },
        { id: 'aadhaarCard', name: 'Aadhaar Card', status: 'Uploaded' },
        { id: 'previousMarksheet', name: 'Previous Marksheet', status: 'Uploaded' },
        { id: 'passportPhoto', name: 'Passport Photo', status: 'Uploaded' },
      ],
    },
    review: {
      sectionTitle: 'Review',
      subtitle: 'Review the information and submit. You can edit any step from above.',
      summary: {
        applicantLabel: 'Applicant',
        applicantValue: 'Ishaan Bose',
        classLabel: 'Class',
        classValue: '8 — 2026-27',
        parentLabel: 'Parent',
        parentValue: 'Anand Bose · +91 98xxxxxx',
        documentsLabel: 'Documents',
        documentsValue: '4 attached',
      },
    },
  },
  tips: {
    title: 'Tips',
    items: [
      'Use clear, scanned documents for faster verification.',
      'Drafts are auto-saved every 60 seconds.',
      'Approval typically takes 2–3 working days.',
    ],
  },
};
