import React, { useState } from 'react';

import CalendarSVG from '@/assets/svg/Calendar.svg';
import ClearIconSVG from '@/assets/svg/Clear.svg';
import { Calendar } from '@/components/Calendar';
import { getMaskForDateField } from '@/utils/DateField/mask';
import { validateDate } from '@/utils/DateField/valideDate';

import classes from './styles.module.scss';

export interface DateFieldProps {
    value: string;
    onChange: (value: string) => void;
}

export const DateField: React.FC<DateFieldProps> = ({ value, onChange }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleClear = () => {
    onChange('');
    setInputValue('');
    setIsCalendarOpen(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const formattedValue = getMaskForDateField(value);

    const formatInput = getMaskForDateField(value);
    setInputValue(validateDate(formatInput));
    onChange(formattedValue);
  };
  const handleInputClick = () => {
    setIsCalendarOpen(true);
  };

  const handleDateSelect = (selectedDate: Date) => {
    onChange(selectedDate.toISOString());
    setIsCalendarOpen(false);
  };

  return (
    <div className={classes.datefield_wrapper}>
      <img
        className={classes.calendar_icon}
        src={CalendarSVG}
        alt="Calendar"
      />
      <input
        type="text"
        className={classes.date_input}
        value={inputValue}
        placeholder="Choose Date"
        onClick={handleInputClick}
        onChange={handleChange}
      />
      {inputValue && (
        <img
          className={classes.clear_icon}
          src={ClearIconSVG}
          alt="Close"
          onClick={handleClear}
          aria-hidden
        />
      )}
      <Calendar
        isOpen={isCalendarOpen}
        startDate={new Date()}
        onDateSelect={handleDateSelect}
        onClose={() => setIsCalendarOpen(false)}
      />
    </div>
  );
};
