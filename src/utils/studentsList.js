const FEE_STATUS_LABELS = {
  PAID: 'Paid',
  PENDING: 'Pending',
  PARTIAL: 'Partial',
  OVERDUE: 'Overdue',
  EXEMPTED: 'Exempted',
};

export const formatFeeStatus = (status) => {
  if (!status) return 'Pending';
  return FEE_STATUS_LABELS[status] ?? status;
};

export const getInitialsFromName = (name) => {
  if (!name?.trim()) return '—';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.trim().slice(0, 2).toUpperCase();
};

export const mapApiStudentToRow = (item) => ({
  id: item.studentId,
  displayId: item.studentIdCardNo || item.admissionNumber || String(item.studentId ?? ''),
  initials: getInitialsFromName(item.studentName),
  name: item.studentName?.trim() || '—',
  className: item.className?.trim() || '—',
  sectionName: item.sectionName?.trim() || item.section?.trim() || '—',
  academicYear: item.academicYearName?.trim() || item.academicYear?.trim() || '—',
  parent: item.parentName?.trim() || '—',
  phone: item.parentPhone?.trim() || '—',
  feeStatus: formatFeeStatus(item.feesPaymentStatus),
  studentStatus: item.studentStatus || item.status || 'ACTIVE',
});

export const buildStudentsShowingText = (page, size, totalElements) => {
  if (!totalElements) {
    return 'Showing 0 of 0 students';
  }
  const start = page * size + 1;
  const end = Math.min((page + 1) * size, totalElements);
  return `Showing ${start}–${end} of ${totalElements} students`;
};
