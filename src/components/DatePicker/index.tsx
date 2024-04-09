import React, {
  createContext, useMemo, useState,
} from 'react';

import { Calendar } from '@/components/Calendar';
import { DateField } from '@/components/DateField';
import { useCalendar } from '@/hooks/useCalendar';
import { CalendarContextType } from '@/types/calendar';
import { formatDateToString, formatStringToDate } from '@/utils/Calendar/getFormatDate';
import { getErrorMessage } from '@/utils/DateField/getMessageError';
import { getMaskForDateField } from '@/utils/DateField/mask';
import { validateDate } from '@/utils/DateField/validateDate';

import classes from './styles.module.scss';
import { DatePickerProps } from './type';

export const CalendarContext = createContext<CalendarContextType | null>(null);

export const DatePicker: React.FC<Partial<DatePickerProps>> = (
  {
    value,
    isFirstWeekDayMonday = true,
    onChange,
    minDate = new Date(2000, 1, 1),
    maxDate = new Date(2200, 1, 1),
    holiday = false,
    holidayColor,
  },
) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [error, setError] = useState<string>('');

  const { functions, state } = useCalendar({
    selectedDate: new Date(),
    firstWeekDayNumber: isFirstWeekDayMonday ? 2 : 1,
  });

  const contextValue = useMemo(() => ({
    functions, state, minDate, maxDate, holiday, holidayColor,
  }), [functions, state]);

  const updateCalendarState = (date: Date) => {
    functions.setSelectedDay(date);
    functions.setSelectedMonthByIndex(date.getMonth(), date.getFullYear());
    functions.setSelectedYear(date.getFullYear());
  };

  const handleClear = () => {
    onChange!('');
    setInputValue('');
    setError('');
    setSelectedDate(new Date());
    setIsCalendarOpen(false);
    updateCalendarState(new Date());
  };

  const handleChange = (value: string) => {
    const formattedVal = getMaskForDateField(value);
    setInputValue(validateDate(formattedVal));

    const error = getErrorMessage(formatStringToDate(validateDate(formattedVal)), maxDate, minDate);

    if (value.length === 10) {
      if (error) {
        setError(error);
        return;
      }
      const date = formatStringToDate(validateDate(formattedVal));
      setSelectedDate(date);
      updateCalendarState(date);
      onChange!(formattedVal);
    } else {
      setError('');
    }

    setIsCalendarOpen(false);
  };

  const handleInputClick = () => {
    setIsCalendarOpen(true);
  };

  const handleDateSelect = (selectedDate: Date) => {
    const isoString = formatDateToString(selectedDate);
    setInputValue(isoString);
    setSelectedDate(selectedDate);
    onChange!(isoString);
    setIsCalendarOpen(false);
  };

  return (
    <div className={classes.datepicker_wrapper}>
      <CalendarContext.Provider value={contextValue}>
        <DateField
          value={inputValue}
          className={error && classes.error}
          onChange={handleChange}
          onClear={handleClear}
          onFocus={handleInputClick}
        />
        {error && <div className={classes.error_message}>{error}</div>}
        <Calendar
          isOpen={isCalendarOpen}
          selectedDate={selectedDate}
          selectDate={handleDateSelect}
        />
      </CalendarContext.Provider>
    </div>
  );
};
