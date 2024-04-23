import { INTERVALS_YEARS, LAST_MONTH_INDEX, MONTHES_COUNT } from '@/constants';
import { CalendarMonth } from '@/types/calendar/calendarMonth';

import { createMonth } from './createMonth';
import { getYearsInterval } from './createYear';

export const handleYearsClick = (direction: 'right' | 'left', selectedYearsInterval: number[], setSelectedYearsInterval: (interval: number[]) => void) => {
  const interval = direction === 'left' ? selectedYearsInterval[0] - INTERVALS_YEARS : selectedYearsInterval[0] + INTERVALS_YEARS;
  setSelectedYearsInterval(getYearsInterval(interval));
};

export const handleMonthesClick = (
  direction: 'right' | 'left',
  selectedYear: number,
  selectedYearsInterval: number[],
  setSelectedYear: (year: number) => void,
  setSelectedYearsInterval: (interval: number[]) => void,
) => {
  const year = direction === 'left' ? selectedYear - 1 : selectedYear + 1;
  if (!selectedYearsInterval.includes(year)) setSelectedYearsInterval(getYearsInterval(year));
  setSelectedYear(year);
};

export const handleDaysClick = (
  direction: 'right' | 'left',
  selectedMonth: CalendarMonth,
  selectedYear: number,
  selectedYearsInterval: number[],
  setSelectedMonth: (month: CalendarMonth) => void,
  setSelectedYear: (year: number) => void,
  setSelectedYearsInterval: (interval: number[]) => void,
  locale: string,
) => {
  let newMonthIndex = selectedMonth.monthIndex + (direction === 'left' ? -1 : 1);
  let newYear = selectedYear;

  if (newMonthIndex === -1) {
    newMonthIndex = LAST_MONTH_INDEX;
    newYear = selectedYear - 1;
  } else if (newMonthIndex === MONTHES_COUNT) {
    newMonthIndex = 0;
    newYear = selectedYear + 1;
  }

  setSelectedMonth(createMonth({ date: new Date(newYear, newMonthIndex), locale }));
  setSelectedYear(newYear);
  if (!selectedYearsInterval.includes(newYear)) {
    setSelectedYearsInterval(getYearsInterval(newYear));
  }
};
