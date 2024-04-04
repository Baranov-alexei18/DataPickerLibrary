import React, { useRef } from 'react';

import { firstWeekDayType } from '@/types/index';

import { Table } from '../Table';
import { CalendarHeader } from './Header';
import classes from './styles.module.scss';

interface CalendarProps {
  isOpen: boolean;
  startDate: Date | string;
  firstWeekDay: firstWeekDayType | undefined;
  onDateSelect: (date: Date) => void | undefined;
  setCurrentDate: (date: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({
  isOpen, startDate, firstWeekDay, onDateSelect, setCurrentDate,
}) => {
  const calendarRef = useRef(null);

  const handlePrevMonthClick = () => {
    const date = new Date(new Date(startDate).getFullYear(), new Date(startDate).getMonth() - 1, 1);
    setCurrentDate(date);
  };

  const handleNextMonthClick = () => {
    const date = new Date(new Date(startDate).getFullYear(), new Date(startDate).getMonth() + 1, 1);
    setCurrentDate(date);
  };

  if (!isOpen) return null;

  return (
    <div
      className={classes.calendar}
      ref={calendarRef}
      aria-hidden
    >
      <CalendarHeader
        currentDate={new Date(startDate)}
        onPrevMonthClick={handlePrevMonthClick}
        onNextMonthClick={handleNextMonthClick}
      />
      <Table
        startDate={new Date(startDate)}
        firstWeekDay={firstWeekDay}
        onDateSelect={onDateSelect}
      />
    </div>

  );
};
