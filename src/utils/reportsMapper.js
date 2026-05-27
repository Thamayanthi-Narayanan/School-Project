const REPORT_TYPE_META = {
  STUDENT: {
    icon: 'users',
    iconVariant: 'blue',
  },
  FEE_COLLECTION: {
    icon: 'wallet',
    iconVariant: 'green',
  },
  PENDING_FEES: {
    icon: 'alert',
    iconVariant: 'amber',
  },
  SCHOLARSHIP: {
    icon: 'award',
    iconVariant: 'blue',
  },
};

const DEFAULT_META = {
  icon: 'barChart',
  iconVariant: 'blue',
};

export const mapReportTypeToCard = (item) => {
  if (!item) return null;

  const meta = REPORT_TYPE_META[item.reportType] ?? DEFAULT_META;

  return {
    id: item.reportType,
    reportType: item.reportType,
    title: item.title ?? item.reportType,
    description: item.description ?? '',
    classFilterSupported: item.classFilterSupported !== false,
    monthYearRangeFilterSupported: Boolean(item.monthYearRangeFilterSupported),
    icon: meta.icon,
    iconVariant: meta.iconVariant,
  };
};

export const mapReportsToCards = (items = []) =>
  items.map(mapReportTypeToCard).filter(Boolean);
