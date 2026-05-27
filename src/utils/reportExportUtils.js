export const REPORT_EXPORT_FORMAT = {
  EXCEL: 'EXCEL',
  PDF: 'PDF',
};

export const buildMonthOptions = (monthLabels = []) =>
  monthLabels.map((label, index) => ({
    label,
    value: String(index + 1),
  }));

export const buildYearOptions = (minYear = 2000, maxYear = 2100) => {
  const options = [];

  for (let year = maxYear; year >= minYear; year -= 1) {
    options.push({
      label: String(year),
      value: String(year),
    });
  }

  return options;
};

export const isMonthYearRangeBefore = (startMonth, startYear, endMonth, endYear) => {
  const startY = Number(startYear);
  const endY = Number(endYear);
  const startM = Number(startMonth);
  const endM = Number(endMonth);

  if (Number.isNaN(startY) || Number.isNaN(endY) || Number.isNaN(startM) || Number.isNaN(endM)) {
    return false;
  }

  if (endY !== startY) return endY < startY;
  return endM < startM;
};

export const buildReportExportParams = (format, filters, includeMonthYearRange) => {
  const params = {
    format,
    academicYearId: filters.academicYearId,
  };

  if (filters.classId) {
    params.classId = filters.classId;
  }

  if (includeMonthYearRange) {
    params.startMonth = Number(filters.startMonth);
    params.startYear = Number(filters.startYear);
    params.endMonth = Number(filters.endMonth);
    params.endYear = Number(filters.endYear);
  }

  return params;
};

export const validateReportExportFilters = (report, filters, validationCopy) => {
  const errors = {};

  if (!filters.academicYearId) {
    errors.academicYearId = validationCopy.academicYearRequired;
  }

  if (!filters.classId) {
    errors.classId = validationCopy.classRequired;
  }

  if (report?.monthYearRangeFilterSupported) {
    if (!filters.startMonth) errors.startMonth = validationCopy.startMonthRequired;
    if (!filters.startYear) errors.startYear = validationCopy.startYearRequired;
    if (!filters.endMonth) errors.endMonth = validationCopy.endMonthRequired;
    if (!filters.endYear) errors.endYear = validationCopy.endYearRequired;

    if (
      filters.startMonth
      && filters.startYear
      && filters.endMonth
      && filters.endYear
      && isMonthYearRangeBefore(
        filters.startMonth,
        filters.startYear,
        filters.endMonth,
        filters.endYear,
      )
    ) {
      errors.endMonth = validationCopy.endBeforeStart;
    }
  }

  return errors;
};

export const getFirstExportValidationError = (errors) => {
  const values = Object.values(errors).filter(Boolean);
  return values[0] ?? null;
};
