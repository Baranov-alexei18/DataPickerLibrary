import React from 'react';

import { START_DAY_WEEK } from '@/constants';
import { createMonth, getMonthesNames, getWeekDaysNames } from '@/helpers';
import { generateCalendarDays } from '@/helpers/getCalendarDay';
import { handleDaysClick, handleMonthesClick, handleYearsClick } from '@/helpers/handleArrow';
import { UseCalendarType } from '@/types/calendar';

import { useCalendarMode } from './useCalendarMode';
import { useSelectedDate } from './useSelectDate';
import { useYearsInterval } from './useYearsInterval';

export const useCalendar = ({
  locale = 'en',
  selectedDate = new Date(),
  firstWeekDayNumber = START_DAY_WEEK.MONDAY,
}: UseCalendarType) => {
  const {
    selectedDay,
    selectedMonth,
    selectedYear,
    setSelectedDay,
    setSelectedYear,
    setSelectedMonth,
  } = useSelectedDate(selectedDate);
  const { mode, setMode } = useCalendarMode();
  const { selectedYearsInterval, setSelectedYearsInterval } = useYearsInterval(selectedYear);

  const monthesNames = React.useMemo(() => getMonthesNames(locale), []);
  const weekDaysNames = React.useMemo(() => getWeekDaysNames(firstWeekDayNumber, locale), []);
  const days = React.useMemo(() => selectedMonth.createMonthDays(), [selectedMonth, selectedYear]);

  const calendarDays = React.useMemo(
    () => generateCalendarDays(selectedMonth, selectedYear, firstWeekDayNumber, days, locale),
    [selectedMonth.year, selectedMonth.monthIndex, selectedYear],
  );

  const onClickArrow = (direction: 'right' | 'left') => {
    switch (mode) {
      case 'days':
        handleDaysClick(
          direction,
          selectedMonth,
          selectedYear,
          selectedYearsInterval,
          setSelectedMonth,
          setSelectedYear,
          setSelectedYearsInterval,
          locale,
        );
        break;
      case 'monthes':
        handleMonthesClick(
          direction,
          selectedYear,
          selectedYearsInterval,
          setSelectedYear,
          setSelectedYearsInterval,
        );
        break;
      case 'years':
      default:
        handleYearsClick(direction, selectedYearsInterval, setSelectedYearsInterval);
        break;
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
