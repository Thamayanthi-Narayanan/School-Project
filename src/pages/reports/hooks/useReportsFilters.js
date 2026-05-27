import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMasterDataSelect } from '../../../hooks/useMasterDataSelect';
import { MASTER_DATA_KEYS } from '../../../utils/masterDataOptions';
import { reportsPageMock } from '../../../data/mocks/reports/reportsPage.mock';
import {
  buildMonthOptions,
  buildYearOptions,
} from '../../../utils/reportExportUtils';

const getDefaultMonth = () => String(new Date().getMonth() + 1);
const getDefaultYear = () => String(new Date().getFullYear());

const pickFirstSelectableOption = (options = []) =>
  options.find((option) => option.value && !/loading/i.test(option.label));

export const useReportsFilters = (filtersCopy = reportsPageMock.filters) => {
  const [academicYearId, setAcademicYearId] = useState('');
  const [classId, setClassId] = useState('');
  const [startMonth, setStartMonth] = useState(getDefaultMonth);
  const [startYear, setStartYear] = useState(getDefaultYear);
  const [endMonth, setEndMonth] = useState(getDefaultMonth);
  const [endYear, setEndYear] = useState(getDefaultYear);

  const { options: academicYearOptions, isLoading: yearLoading } = useMasterDataSelect(
    MASTER_DATA_KEYS.academicYear,
    {
      loadingLabel: filtersCopy.loadingLabel,
      useIdAsValue: true,
    },
  );

  const { options: classOptions, isLoading: classLoading } = useMasterDataSelect(
    MASTER_DATA_KEYS.class,
    {
      loadingLabel: filtersCopy.loadingLabel,
      useIdAsValue: true,
    },
  );

  const monthOptions = useMemo(
    () => buildMonthOptions(filtersCopy.monthLabels),
    [filtersCopy.monthLabels],
  );

  const yearOptions = useMemo(() => buildYearOptions(), []);

  useEffect(() => {
    if (yearLoading) return;
    const firstOption = pickFirstSelectableOption(academicYearOptions);
    if (!academicYearId && firstOption) {
      setAcademicYearId(firstOption.value);
    }
  }, [academicYearId, academicYearOptions, yearLoading]);

  useEffect(() => {
    if (classLoading) return;
    const firstOption = pickFirstSelectableOption(classOptions);
    if (!classId && firstOption) {
      setClassId(firstOption.value);
    }
  }, [classId, classOptions, classLoading]);

  const filters = useMemo(
    () => ({
      academicYearId,
      classId,
      startMonth,
      startYear,
      endMonth,
      endYear,
    }),
    [academicYearId, classId, startMonth, startYear, endMonth, endYear],
  );

  const isLoading = yearLoading || classLoading;

  return {
    filters,
    academicYearOptions,
    classOptions,
    monthOptions,
    yearOptions,
    isLoading,
    setAcademicYearId,
    setClassId,
    setStartMonth,
    setStartYear,
    setEndMonth,
    setEndYear,
  };
};
