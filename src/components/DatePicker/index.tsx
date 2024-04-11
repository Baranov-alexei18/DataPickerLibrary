import React, {
  useContext, useEffect, useRef, useState,
} from 'react';

import Calendar from '@/components/Calendar';
import { DateField } from '@/components/DateField';
import { CalendarContext, withCalendarContext } from '@/hoc/withCalendarContext';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { CalendarType } from '@/types/calendar';
import { formatDateToString, formatStringToDate } from '@/utils/Calendar/getFormatDate';
import { getErrorMessage } from '@/utils/DateField/getMessageError';
import { getMaskForDateField } from '@/utils/DateField/mask';
import { validateDate } from '@/utils/DateField/validateDate';

import classes from './styles.module.scss';
import { DatePickerProps } from './type';

const DatePicker: React.FC<Partial<DatePickerProps>> = (
  {
    value,
    onChange,
    minDate = new Date(2000, 1, 1),
    maxDate = new Date(2200, 1, 1),
  },
) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [error, setError] = useState<string>('');
  const calendarRef = useRef(null);

  const { state, functions } = useContext(CalendarContext) as CalendarType;

  useOutsideClick(calendarRef, () => toggleClose(state.mode), isCalendarOpen);

  useEffect(() => {
    if (state.mode === 'days' && error.length > 1) {
      setIsCalendarOpen(false);
    }
  }, [state.mode, error]);

  const toggleClose = (mode: 'days' | 'monthes' | 'years') => {
    if (mode === 'days' && error.length > 1) {
      setIsCalendarOpen(false);
    }
  };

  const updateCalendarState = (date: Date) => {
    functions.setSelectedMonthByIndex(date.getMonth(), date.getFullYear());
    functions.setSelectedYear(date.getFullYear());
  };

  const handleClear = () => {
    onChange!('');
    setInputValue('');
    setError('');
    setIsCalendarOpen(false);
  };

  const handleChange = (values: string) => {
    const formattedVal = getMaskForDateField(values);
    setInputValue(validateDate(formattedVal));

    const err = getErrorMessage(formatStringToDate(validateDate(formattedVal)), maxDate, minDate);

    if (values.length === 10) {
      if (err) {
        setError(err);
        return;
      }
      const date = formatStringToDate(validateDate(formattedVal));
      updateCalendarState(date);
      onChange!(formattedVal);
    } else {
      setError('');
    }
  };

  const handleInputClick = () => {
    setIsCalendarOpen(true);
  };

  const handleDateSelect = (selectedDate: Date) => {
    const isoString = formatDateToString(selectedDate);
    setInputValue(isoString);
    onChange!(isoString);
  };

  return (
    <div ref={calendarRef} className={classes.datepicker_wrapper}>
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
        selectDate={handleDateSelect}
        clearDate={handleClear}
      />
    </div>
  );
};

export default withCalendarContext(DatePicker);
