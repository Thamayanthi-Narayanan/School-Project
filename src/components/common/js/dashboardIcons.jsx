import {
  FiAlertCircle,
  FiArrowRight,
  FiArrowUpRight,
  FiAward,
  FiBarChart2,
  FiBell,
  FiBriefcase,
  FiCalendar,
  FiClipboard,
  FiCheck,
  FiCheckCircle,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiCreditCard,
  FiDollarSign,
  FiDownload,
  FiEdit2,
  FiEye,
  FiEyeOff,
  FiFileMinus,
  FiFileText,
  FiGrid,
  FiHelpCircle,
  FiList,
  FiLogOut,
  FiMenu,
  FiMinusCircle,
  FiPlus,
  FiPlay,
  FiPrinter,
  FiRefreshCw,
  FiSave,
  FiSearch,
  FiSettings,
  FiShield,
  FiLock,
  FiTrash2,
  FiTrendingDown,
  FiTrendingUp,
  FiUpload,
  FiUploadCloud,
  FiUserPlus,
  FiUsers,
  FiX,
} from 'react-icons/fi';
import { FaGraduationCap } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';
import { MdDoneAll } from 'react-icons/md';

const warnedInvalidSizes = new Set();

const sanitizeIconSize = (size, fallback = 18) => {
  if (typeof size === 'number' || typeof size === 'string') {
    return size;
  }
  const key = JSON.stringify({
    type: typeof size,
    value: size == null ? size : Object.prototype.toString.call(size),
  });
  if (!warnedInvalidSizes.has(key) && typeof console !== 'undefined') {
    warnedInvalidSizes.add(key);
    // Helps trace callers that pass objects/functions instead of numeric icon sizes.
    console.warn('[DashboardIcons] Invalid icon size received. Falling back to default.', {
      received: size,
      fallback,
      stack: new Error().stack,
    });
  }
  return fallback;
};

const renderIcon = (IconComponent, size = 18) => (
  <IconComponent size={sanitizeIconSize(size)} aria-hidden="true" />
);

export const DashboardIcons = {
  grid: (size = 18) => renderIcon(FiGrid, size),
  users: (size = 18) => renderIcon(FiUsers, size),
  userPlus: (size = 18) => renderIcon(FiUserPlus, size),
  briefcase: (size = 18) => renderIcon(FiBriefcase, size),
  calendarCheck: (size = 18) => renderIcon(FiCheckCircle, size),
  receipt: (size = 18) => renderIcon(FiFileText, size),
  wallet: (size = 18) => renderIcon(FiCreditCard, size),
  fileText: (size = 18) => renderIcon(FiFileText, size),
  fileSpreadsheet: (size = 16) => renderIcon(FiFileText, size),
  playRun: (size = 16) => renderIcon(FiPlay, size),
  award: (size = 18) => renderIcon(FiAward, size),
  fileOutput: (size = 18) => renderIcon(FiFileMinus, size),
  barChart: (size = 18) => renderIcon(FiBarChart2, size),
  bell: (size = 18) => renderIcon(FiBell, size),
  bellNotification: (size = 18) => renderIcon(FiBell, size),
  settings: (size = 18) => renderIcon(FiSettings, size),
  shield: (size = 18) => renderIcon(FiShield, size),
  lock: (size = 18) => renderIcon(FiLock, size),
  logOut: (size = 18) => renderIcon(FiLogOut, size),
  menu: (size = 18) => renderIcon(FiMenu, size),
  search: (size = 18) => renderIcon(FiSearch, size),
  help: (size = 18) => renderIcon(FiHelpCircle, size),
  plus: (size = 18) => renderIcon(FiPlus, size),
  graduationCap: (size = 20) => renderIcon(FaGraduationCap, size),
  alert: (size = 18) => renderIcon(FiAlertCircle, size),
  checkCircle: (size = 18) => renderIcon(FiCheckCircle, size),
  fileDollar: (size = 18) => renderIcon(FiDollarSign, size),
  arrowUpRight: (size = 16) => renderIcon(FiArrowUpRight, size),
  arrowRight: (size = 16) => renderIcon(FiArrowRight, size),
  sparkles: (size = 16) => renderIcon(HiSparkles, size),
  trendUp: (size = 14) => renderIcon(FiTrendingUp, size),
  trendDown: (size = 14) => renderIcon(FiTrendingDown, size),
  upload: (size = 18) => renderIcon(FiUpload, size),
  download: (size = 18) => renderIcon(FiDownload, size),
  eye: (size = 18) => renderIcon(FiEye, size),
  eyeOff: (size = 18) => renderIcon(FiEyeOff, size),
  edit: (size = 18) => renderIcon(FiEdit2, size),
  trash: (size = 18) => renderIcon(FiTrash2, size),
  feeStructureAmounts: (size = 18) => renderIcon(FiList, size),
  feeStructureClear: (size = 18) => renderIcon(FiRefreshCw, size),
  feeHeadEdit: (size = 16) => renderIcon(FiEdit2, size),
  feeHeadDelete: (size = 16) => renderIcon(FiMinusCircle, size),
  chevronDown: (size = 16) => renderIcon(FiChevronDown, size),
  calendar: (size = 18) => renderIcon(FiCalendar, size),
  layers: (size = 18) => renderIcon(FiList, size),
  rotateCcw: (size = 18) => renderIcon(FiRefreshCw, size),
  clipboard: (size = 18) => renderIcon(FiClipboard, size),
  save: (size = 18) => renderIcon(FiSave, size),
  chevronLeft: (size = 16) => renderIcon(FiChevronLeft, size),
  chevronRight: (size = 16) => renderIcon(FiChevronRight, size),
  check: (size = 16) => renderIcon(FiCheck, size),
  checksDouble: (size = 16) => renderIcon(MdDoneAll, size),
  xClose: (size = 16) => renderIcon(FiX, size),
  dollarSign: (size = 18) => renderIcon(FiDollarSign, size),
  printer: (size = 18) => renderIcon(FiPrinter, size),
  uploadCloud: (size = 18) => renderIcon(FiUploadCloud, size),
};

export const renderNavIcon = (iconName, size = 18) => {
  const Icon = DashboardIcons[iconName];
  const safeSize = sanitizeIconSize(size);
  return Icon ? Icon(safeSize) : DashboardIcons.grid(safeSize);
};
