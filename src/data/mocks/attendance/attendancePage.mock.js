const buildMayDays = () => {
  const statusByDay = {
    1: 'present',
    2: 'present',
    3: 'present',
    4: 'present',
    5: 'present',
    6: 'holiday',
    7: 'holiday',
    8: 'present',
    9: 'present',
    10: 'present',
    11: 'absent',
    12: 'present',
    13: 'holiday',
    14: 'holiday',
    15: 'present',
    16: 'present',
    17: 'present',
    18: 'present',
    19: 'present',
    20: 'holiday',
    21: 'holiday',
    22: 'absent',
    23: 'present',
    24: 'present',
    25: 'present',
    26: 'late',
    27: 'holiday',
    28: 'holiday',
    29: 'present',
    30: 'present',
  };

  return Array.from({ length: 30 }, (_, index) => {
    const day = index + 1;
    return {
      id: `may-${day}`,
      monthShort: 'May',
      day,
      status: statusByDay[day],
    };
  });
};

export const attendancePageMock = {
  title: 'Attendance',
  subtitle: 'Mark and review daily attendance for students and staff.',
  tabs: [
    { id: 'students', label: 'Students' },
    { id: 'staff', label: 'Staff' },
  ],
  views: {
    students: {
      periodLabel: 'Class 10-A · May 2026',
      days: buildMayDays(),
      summary: {
        title: 'Monthly summary',
        stats: [
          { id: 'workingDays', label: 'Working days', value: '22' },
          { id: 'present', label: 'Present', value: '20' },
          { id: 'absent', label: 'Absent', value: '1' },
          { id: 'attendancePercent', label: 'Attendance %', value: '95.4%' },
        ],
      },
    },
    staff: {
      periodLabel: 'All Staff · May 2026',
      days: buildMayDays(),
      summary: {
        title: 'Monthly summary',
        stats: [
          { id: 'workingDays', label: 'Working days', value: '22' },
          { id: 'present', label: 'Present', value: '21' },
          { id: 'absent', label: 'Absent', value: '0' },
          { id: 'attendancePercent', label: 'Attendance %', value: '98.1%' },
        ],
      },
    },
  },
  legend: [
    { id: 'present', label: 'Present', status: 'present' },
    { id: 'absent', label: 'Absent', status: 'absent' },
    { id: 'late', label: 'Late', status: 'late' },
    { id: 'holiday', label: 'Holiday', status: 'holiday' },
  ],
};
