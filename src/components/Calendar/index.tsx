import React, { useContext, useRef } from 'react';

import { CalendarType } from '@/types/calendar';
import { getDataFromContext } from '@/utils/getDataFromContext';

import { CalendarContext } from '../DatePicker';
import { CalendarBody } from './Body';
import { CalendarHeader } from './Header';
import classes from './styles.module.scss';
import { CalendarProps } from './type';

export const Calendar: React.FC<Partial<CalendarProps>> = ({
  isOpen,
  selectDate,
}: Partial<CalendarProps>) => {
  const calendarRef = useRef(null);

  const calendarContext = useContext(CalendarContext);

  const { state } = getDataFromContext(calendarContext) as CalendarType;

  if (!isOpen) return null;

  const selectedDate = (date: Date) => {
    selectDate(date);
  };

  return (
    <div
      className={classes.calendar}
      ref={calendarRef}
      aria-hidden
    >
      <CalendarHeader />
      <CalendarBody
        mode={state.mode}
        selectDate={selectedDate}
      />
    </div>

  );
};
