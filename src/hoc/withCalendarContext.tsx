import React, { createContext, useEffect, useMemo } from 'react';

import { CalendarProps } from '@/components/Calendar/type';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { START_DAY_WEEK, VALIDE_DATE_LENGTH } from '@/constants';
import { useCalendar } from '@/hooks/useCalendar';
import { CalendarContextType } from '@/types/calendar';
import { formatStringToDate } from '@/utils/Calendar/getFormatDate';

export const CalendarContext = createContext<CalendarContextType | null>(null);

export const withCalendarContext = (
  Component: React.FC<Partial<CalendarProps>>,
) => function Calendar(props: CalendarContextType) {
  const { isFirstWeekDayMonday, selectedDate, selectedRange } = props;

  const { functions, state } = useCalendar({
    selectedDate: selectedDate && selectedDate.length === VALIDE_DATE_LENGTH
      ? formatStringToDate(selectedDate)
      : new Date(),
    firstWeekDayNumber: isFirstWeekDayMonday ? START_DAY_WEEK.MONDAY : START_DAY_WEEK.SUNDAY,
  });

  useEffect(() => {
    const updateCalendarState = (date: Date = new Date()) => {
      functions.setSelectedMonthByIndex(date.getMonth(), date.getFullYear());
      functions.setSelectedYear(date.getFullYear());
    };
    if (selectedDate && selectedDate.length === VALIDE_DATE_LENGTH) {
      updateCalendarState(formatStringToDate(selectedDate));
    }
  }, [selectedDate]);

  const contextValue = useMemo(() => ({
    ...props,
    functions,
    state,
    selectedDate,
    selectedRange,
  }), [selectedDate, selectedRange, state, functions, props]);

  return (
    <ErrorBoundary>
      <CalendarContext.Provider value={contextValue}>
        <Component {...props} />
      </CalendarContext.Provider>
    </ErrorBoundary>
  );
};
