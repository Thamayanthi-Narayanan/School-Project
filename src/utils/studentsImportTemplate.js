const TEMPLATE_HEADERS = [
  'Student ID Card No',
  'Student Name',
  'Class',
  'Parent Name',
  'Phone Number',
  'Fee Status',
];

export const downloadStudentsImportTemplate = (fileName = 'students-import-template.csv') => {
  const csv = `${TEMPLATE_HEADERS.join(',')}\n`;
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};
