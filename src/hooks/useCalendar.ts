import React from 'react';

import { DAYS_IN_WEEK, MONTHES_COUNT, START_DAY_WEEK } from '@/constants';
import {
  createDate,
  createMonth,
  getMonthesNames,
  getMonthNumberOfDays,
  getWeekDaysNames,
  getYearsInterval,
} from '@/helpers';
import { UseCalendarType } from '@/types';
import { CalendarType } from '@/types/calendar';

export const useCalendar = ({
  locale = 'en',
  selectedDate = new Date(),
  firstWeekDayNumber = START_DAY_WEEK.MONDAY,
}: UseCalendarType): CalendarType => {
  const [mode, setMode] = React.useState<'days' | 'monthes' | 'years'>('days');
  const [selectedDay, setSelectedDay] = React.useState(createDate({ date: selectedDate }));
  const [selectedMonth, setSelectedMonth] = React.useState(
    createMonth({ date: new Date(selectedDay.year, selectedDay.monthIndex), locale }),
  );
  const [selectedYear, setSelectedYear] = React.useState(selectedDate.getFullYear());
  const [selectedYearsInterval, setSelectedYearsInterval] = React.useState(
    getYearsInterval(selectedDay.year),
  );

  const monthesNames = React.useMemo(() => getMonthesNames(locale), []);
  const weekDaysNames = React.useMemo(() => getWeekDaysNames(firstWeekDayNumber, locale), []);
  const days = React.useMemo(() => selectedMonth.createMonthDays(), [selectedMonth, selectedYear]);

  const calendarDays = React.useMemo(() => {
    const monthNumberOfDays = getMonthNumberOfDays(selectedMonth.monthIndex, selectedYear);

    const prevMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex - 1),
      locale,
    }).createMonthDays();

    const nextMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex + 1),
      locale,
    }).createMonthDays();

    const firstDay = days[0];
    const lastDay = days[monthNumberOfDays - 1];

    const shiftIndex = firstWeekDayNumber - 1;
    const numberOfPrevDays = firstDay.dayNumberInWeek - 1 - shiftIndex < 0
      ? DAYS_IN_WEEK - (firstWeekDayNumber - firstDay.dayNumberInWeek)
      : firstDay.dayNumberInWeek - 1 - shiftIndex;

    const numberOfNextDays = DAYS_IN_WEEK - lastDay.dayNumberInWeek + shiftIndex > 6
      ? DAYS_IN_WEEK - lastDay.dayNumberInWeek - (DAYS_IN_WEEK - shiftIndex)
      : DAYS_IN_WEEK - lastDay.dayNumberInWeek + shiftIndex;

    const totalCalendarDays = days.length + numberOfPrevDays + numberOfNextDays;

    const result = [];

    for (let i = 0; i < numberOfPrevDays; i += 1) {
      const inverted = numberOfPrevDays - i;
      result[i] = prevMonthDays[prevMonthDays.length - inverted];
    }

    for (let i = numberOfPrevDays; i < totalCalendarDays - numberOfNextDays; i += 1) {
      result[i] = days[i - numberOfPrevDays];
    }

    for (let i = totalCalendarDays - numberOfNextDays; i < totalCalendarDays; i += 1) {
      result[i] = nextMonthDays[i - totalCalendarDays + numberOfNextDays];
    }

    return result;
  }, [selectedMonth.year, selectedMonth.monthIndex, selectedYear]);

  const onClickArrow = (direction: 'right' | 'left') => {
    if (mode === 'years' && direction === 'left') {
      return setSelectedYearsInterval(getYearsInterval(selectedYearsInterval[0] - 10));
    }

    if (mode === 'years' && direction === 'right') {
      return setSelectedYearsInterval(getYearsInterval(selectedYearsInterval[0] + 10));
    }

    if (mode === 'monthes' && direction === 'left') {
      const year = selectedYear - 1;
      if (!selectedYearsInterval.includes(year)) setSelectedYearsInterval(getYearsInterval(year));
      return setSelectedYear(selectedYear - 1);
    }

    if (mode === 'monthes' && direction === 'right') {
      const year = selectedYear + 1;
      if (!selectedYearsInterval.includes(year)) setSelectedYearsInterval(getYearsInterval(year));
      return setSelectedYear(selectedYear + 1);
    }

    if (mode === 'days') {
      const monthIndex = direction === 'left' ? selectedMonth.monthIndex - 1 : selectedMonth.monthIndex + 1;
      if (monthIndex === -1) {
        const year = selectedYear - 1;
        setSelectedYear(year);
        if (!selectedYearsInterval.includes(year)) setSelectedYearsInterval(getYearsInterval(year));
        return setSelectedMonth(createMonth({ date: new Date(selectedYear - 1, 11), locale }));
      }

      if (monthIndex === MONTHES_COUNT) {
        const year = selectedYear + 1;
        setSelectedYear(year);
        if (!selectedYearsInterval.includes(year)) setSelectedYearsInterval(getYearsInterval(year));
        return setSelectedMonth(createMonth({ date: new Date(year, 0), locale }));
      }

      setSelectedMonth(createMonth({ date: new Date(selectedYear, monthIndex), locale }));
    }
  };

  const setSelectedMonthByIndex = (monthIndex: number, year: number = selectedYear) => {
    setSelectedMonth(createMonth({ date: new Date(year, monthIndex), locale }));
  };

  return {
    state: {
      mode,
      calendarDays,
      weekDaysNames,
      monthesNames,
      selectedDay,
      selectedMonth,
      selectedYear,
      selectedYearsInterval,
    },
    functions: {
      onClickArrow,
      setMode,
      setSelectedDay,
      setSelectedMonthByIndex,
      setSelectedYear,
      setSelectedYearsInterval,
    },
  };
};
