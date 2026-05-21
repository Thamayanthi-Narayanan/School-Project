const iconProps = { fill: 'none', stroke: 'currentColor', strokeWidth: '1.6', strokeLinecap: 'round', strokeLinejoin: 'round' };

export const DashboardIcons = {
  grid: (size = 18) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  users: (size = 18) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M16 11.5a2.5 2.5 0 0 1 0 5M19 19c0-2.5-1.5-4.5-3.5-5.2" />
    </svg>
  ),
  userPlus: (size = 18) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <path d="M3 19c0-3.3 2.7-6 6-6" />
      <path d="M19 8v6M16 11h6" />
    </svg>
  ),
  briefcase: (size = 18) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  calendarCheck: (size = 18) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 11h18M9 15l2 2 4-4" />
    </svg>
  ),
  receipt: (size = 18) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <path d="M6 3h12a1 1 0 0 1 1 1v17l-2-1.5L15 21l-3-1.5L9 21l-2-1.5L5 21V4a1 1 0 0 1 1-1z" />
      <path d="M9 8h6M9 12h6" />
    </svg>
  ),
  wallet: (size = 18) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <path d="M3 7h18a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z" />
      <path d="M17 12h4M3 11h2" />
    </svg>
  ),
  fileText: (size = 18) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8l-6-5z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </svg>
  ),
  award: (size = 18) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <circle cx="12" cy="9" r="4" />
      <path d="M8.5 14.5L7 20l5-2.5L17 20l-1.5-5.5" />
    </svg>
  ),
  fileOutput: (size = 18) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8l-6-5z" />
      <path d="M14 3v5h5M12 17v4M10 19h4" />
    </svg>
  ),
  barChart: (size = 18) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <path d="M4 20V10M10 20V4M16 20v-6M22 20H2" />
    </svg>
  ),
  bell: (size = 18) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <path d="M18 16H6l-1-2v-5a7 7 0 0 1 14 0v5l-1 2zM10 20a2 2 0 0 0 4 0" />
    </svg>
  ),
  settings: (size = 18) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  ),
  logOut: (size = 18) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <path d="M9 21H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4M16 17l5-5-5-5M21 12H9" />
    </svg>
  ),
  search: (size = 18) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4-4" />
    </svg>
  ),
  help: (size = 18) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 0 1 4.8 1c0 2-2.3 2.3-2.3 3.7M12 17h.01" />
    </svg>
  ),
  plus: (size = 18) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  graduationCap: (size = 20) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <path d="M12 3L2 8.5l10 5.5 10-5.5L12 3z" />
      <path d="M6 11.5V16c0 0 2.5 3 6 3s6-3 6-3v-4.5" />
      <path d="M22 8.5v5" />
    </svg>
  ),
  alert: (size = 18) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  ),
  checkCircle: (size = 18) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l3 3 5-6" />
    </svg>
  ),
  fileDollar: (size = 18) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8l-6-5z" />
      <path d="M12 11v4M10 13h4" />
    </svg>
  ),
  arrowUpRight: (size = 16) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <path d="M7 17L17 7M17 7H9M17 7v8" />
    </svg>
  ),
  arrowRight: (size = 16) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  sparkles: (size = 16) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <path d="M12 3l1.2 4.2L17.5 8.5l-4.3 1.3L12 14l-1.2-4.2L6.5 8.5l4.3-1.3L12 3zM5 17l.6 2.2L7.8 20l-2.2.6L5 23l-.6-2.2L2.2 20l2.2-.6L5 17z" />
    </svg>
  ),
  trendUp: (size = 14) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <path d="M4 16l6-6 4 4 6-8" />
    </svg>
  ),
  trendDown: (size = 14) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <path d="M4 8l6 6 4-4 6 8" />
    </svg>
  ),
  upload: (size = 18) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <path d="M12 16V4M8 8l4-4 4 4" />
      <path d="M4 20h16" />
    </svg>
  ),
  download: (size = 18) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <path d="M12 4v12M8 12l4 4 4-4" />
      <path d="M4 20h16" />
    </svg>
  ),
  eye: (size = 18) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  ),
  edit: (size = 18) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  ),
  trash: (size = 18) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M10 11v6M14 11v6M6 7l1 14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-14" />
    </svg>
  ),
  chevronDown: (size = 16) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  ),
  calendar: (size = 18) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 11h18" />
    </svg>
  ),
  save: (size = 18) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <path d="M19 21H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h11l4 4v13a1 1 0 0 1-1 1z" />
      <path d="M17 21v-8H7v8M7 3v5h8" />
    </svg>
  ),
  chevronLeft: (size = 16) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  ),
  chevronRight: (size = 16) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <path d="M9 18l6-6-6-6" />
    </svg>
  ),
  check: (size = 16) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <path d="M5 12l4 4 10-10" />
    </svg>
  ),
  xClose: (size = 16) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  ),
  printer: (size = 18) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <path d="M6 18H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2" />
      <path d="M6 9V3h12v6M6 14h12v7H6z" />
    </svg>
  ),
  uploadCloud: (size = 18) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconProps} aria-hidden="true">
      <path d="M12 16V4M8 8l4-4 4 4" />
      <path d="M4 18a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4" />
    </svg>
  ),
};

export const renderNavIcon = (iconName, size = 18) => {
  const Icon = DashboardIcons[iconName];
  return Icon ? Icon(size) : DashboardIcons.grid(size);
};
