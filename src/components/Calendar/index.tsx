import React, { useRef } from 'react';

import { useOutsideClick } from '@/hooks/useOutsideClick';

import { Table } from '../Table';
import { CalendarHeader } from './Header';
import classes from './styles.module.scss';

interface CalendarProps {
  isOpen: boolean;
  startDate: Date;
  onDateSelect: (date: string) => void;
  onClose: () => void;
}

export const Calendar: React.FC<CalendarProps> = ({
  isOpen, startDate, onClose, onDateSelect,
}) => {
  const calendarRef = useRef(null);

  useOutsideClick(calendarRef, onClose, isOpen);

  const [selectedDate, setSelectedDate] = React.useState<Date>(startDate);

  if (!isOpen) return null;

  return (
    <div
      className={classes.calendar}
      ref={calendarRef}
      aria-hidden
    >
      <CalendarHeader currentDate={selectedDate} />
      <Table startDate={selectedDate} firstWeekDay="Mo" />
    </div>

  );
};
