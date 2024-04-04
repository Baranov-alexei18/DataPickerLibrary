import React, { useState } from 'react';

import { Calendar } from '@/components/Calendar';
import { DateField } from '@/components/DateField';
import { firstWeekDayType } from '@/types/index';
import { formatDateToString, formatStringToDate } from '@/utils/Calendar/getFormatDate';
import { getMaskForDateField } from '@/utils/DateField/mask';
import { validateDate } from '@/utils/DateField/valideDate';

import classes from './styles.module.scss';

export interface DatePickerProps {
    value: string;
    onChange: any;
    firstWeekDay?: firstWeekDayType;
}

export const DatePicker: React.FC<Partial<DatePickerProps>> = (
  { value, firstWeekDay, onChange },
) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [selectedDate, setSelectedDate] = useState<Date| string>('');

  const handleClear = () => {
    onChange('');
    setInputValue('');
    setSelectedDate('');
    setIsCalendarOpen(false);
  };

  const handleChange = (value: string) => {
    const formattedValue = getMaskForDateField(value);
    setInputValue(validateDate(formattedValue));

    if (value.length === 10) {
      const date = formatStringToDate(formattedValue);
      setSelectedDate(date);
    }
    onChange(formattedValue);
  };

  const handleInputClick = () => {
    setIsCalendarOpen(true);
  };

  const handleDateSelect = (selectedDate: Date) => {
    const isoString = formatDateToString(selectedDate);
    setInputValue(isoString);
    setSelectedDate(selectedDate);
    onChange(isoString);
    // setIsCalendarOpen(false);
  };

  const setCurrentDate = (currentDate: Date) => {
    setSelectedDate(currentDate);
  };

  let currentDate: Date | string = new Date();

  if (selectedDate) {
    currentDate = selectedDate;
  }

  return (
    <div className={classes.datepicker_wrapper}>
      <DateField
        value={inputValue}
        onChange={handleChange}
        onClear={handleClear}
        onFocus={handleInputClick}
      />
      <Calendar
        isOpen={isCalendarOpen}
        startDate={currentDate}
        firstWeekDay={firstWeekDay}
        setCurrentDate={setCurrentDate}
        onDateSelect={handleDateSelect}
      />
    </div>
  );
};
