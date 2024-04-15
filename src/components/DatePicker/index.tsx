import React, { useCallback, useRef, useState } from 'react';

import { DateField } from '@/components/DateField';
import { VALIDE_DATE_LENGTH } from '@/constants';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import CalendarService from '@/services/serviceCalendar';
import { formatDateToString, formatStringToDate } from '@/utils/Calendar/getFormatDate';
import { getErrorMessage, getMaskForDateField } from '@/utils/datefield';
import { validateDate } from '@/utils/validationDate';

import { CalendarServiceType } from '../Calendar/type';
import classes from './styles.module.scss';
import { DatePickerProps } from './type';

export const DatePicker: React.FC<Partial<DatePickerProps>> = (
  {
    value,
    onChange,
    minDate = new Date(1900, 1, 1),
    maxDate = new Date(2400, 1, 1),
    isFirstWeekDayMonday = true,
    holiday = false,
    holidayColor = 'inherit',
  },
) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [error, setError] = useState<string>('');
  const calendarRef = useRef(null);

  useOutsideClick(calendarRef, () => setIsCalendarOpen(false), isCalendarOpen);

  const handleInputClick = useCallback(() => {
    setIsCalendarOpen(true);
  }, []);

  const handleClear = useCallback(() => {
    onChange!('');
    setInputValue('');
    setError('');
    setIsCalendarOpen(false);
  }, []);

  const handleChange = (values: string) => {
    const valueMask = getMaskForDateField(values);
    const err = getErrorMessage(formatStringToDate(validateDate(valueMask)), maxDate, minDate);
    setInputValue(validateDate(valueMask));

    if (values.length < VALIDE_DATE_LENGTH) {
      return;
    }

    if (err) {
      setError(err);
      setIsCalendarOpen(false);
      return;
    }

    setError('');
    onChange!(validateDate(valueMask));
  };

  const handleDateSelect = (selectedDate: Date) => {
    const isoString = formatDateToString(selectedDate);
    setInputValue(isoString);
    onChange!(isoString);
    setIsCalendarOpen(false);
  };

  const configCalendar: CalendarServiceType = {
    isOpen: isCalendarOpen,
    selectedDate: inputValue!,
    selectDate: (selectedDate: Date) => {
      handleDateSelect(selectedDate);
    },
    clearDate: () => handleClear(),
    isFirstWeekDayMonday,
    holiday,
    holidayColor,
    minDate,
    maxDate,
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
      {CalendarService.createCalendar(configCalendar)}
    </div>
  );
};
