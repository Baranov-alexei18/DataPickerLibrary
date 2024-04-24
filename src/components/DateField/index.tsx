import React from 'react';
import classNames from 'classnames/bind';

import CalendarSVG from '@/assets/image/icons/Calendar.svg';
import ClearIconSVG from '@/assets/image/icons/Clear.svg';
import { VALIDE_DATE_LENGTH } from '@/constants';
import { formatDateToString } from '@/utils/Calendar/getFormatDate';

import { DateFieldProps } from './types';

import classes from './styles.module.scss';

const cx = classNames.bind(classes);

export const DateField: React.FC<DateFieldProps> = ({
  value, className, onChange, onClear, onFocus,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange!(value);
  };

  const classNames = cx('datefield_wrapper', className);

  return (
    <div className={classNames}>
      <img
        className={classes.calendar_icon}
        src={CalendarSVG}
        alt="Calendar"
      />
      <input
        type="text"
        className={classes.date_input}
        value={value!.length > VALIDE_DATE_LENGTH ? formatDateToString(new Date(value!)) : value}
        placeholder="Choose Date"
        onFocus={onFocus}
        onChange={handleChange}
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
