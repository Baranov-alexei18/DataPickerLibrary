import React, { createContext, useMemo } from 'react';

import { DatePickerProps } from '@/components/DatePicker/type';
import { useCalendar } from '@/hooks/useCalendar';
import { CalendarContextType } from '@/types/calendar';

export const CalendarContext = createContext<CalendarContextType | null>(null);

export const withCalendarContext = (
  Component: React.FC<Partial<DatePickerProps>>,
) => function Calendar(props: CalendarContextType) {
  const {
    isFirstWeekDayMonday, minDate, maxDate, holiday, holidayColor,
  } = props;

  const { functions, state } = useCalendar({
    selectedDate: new Date(),
    firstWeekDayNumber: isFirstWeekDayMonday ? 2 : 1,
  });

  const contextValue = useMemo(() => ({
    functions,
    state,
    minDate,
    maxDate,
    holiday,
    holidayColor,
  }), [functions, state, minDate, maxDate, holiday, holidayColor]);

  return (
    <CalendarContext.Provider value={contextValue}>
      <Component {...props} />
    </CalendarContext.Provider>
  );
};
