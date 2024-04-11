import React from 'react';

import CalendarSVG from '@/assets/svg/Calendar.svg';
import ClearIconSVG from '@/assets/svg/Clear.svg';
import { formatDateToString } from '@/utils/Calendar/getFormatDate';

import classes from './styles.module.scss';
import { DateFieldProps } from './type';

export const DateField: React.FC<DateFieldProps> = ({
  value, className, onChange, onClear, onFocus, closeCalendar,
}) => {
  let dateInput;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange!(value);
  };

  if (value !== undefined) {
    dateInput = value.length > 10 ? formatDateToString(new Date(value)) : value;
  }

  return (
    <div className={`${classes.datefield_wrapper} ${className}`}>
      <img
        className={classes.calendar_icon}
        src={CalendarSVG}
        alt="Calendar"
      />
      <input
        type="text"
        className={classes.date_input}
        value={dateInput}
        placeholder="Choose Date"
        onFocus={onFocus}
        onChange={handleChange}
        onDoubleClick={closeCalendar}
      />
      {value && (
        <img
          className={classes.clear_icon}
          src={ClearIconSVG}
          alt="Close"
          onClick={onClear}
          aria-hidden
        />
      )}
    </div>
  );
};
