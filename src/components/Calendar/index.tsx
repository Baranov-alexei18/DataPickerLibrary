import React, { FC, useCallback, useContext } from 'react';

import { CalendarContext } from '@/hoc/withCalendarContext';
import { CalendarContextType } from '@/types/calendar';

import { Button } from '../Button';
import { CalendarHeader } from '../CalendarHeader';
import { DayView } from '../DayView';
import { MonthView } from '../MonthView';
import { YearView } from '../YearView';

import { CalendarProps } from './types';

import classes from './styles.module.scss';

const bodyView = {
  days: <DayView />,
  monthes: <MonthView />,
  years: <YearView />,
};

export const Calendar: FC<Partial<CalendarProps>> = () => {
  const {
    state,
    functions,
    isOpen,
    clearDate,
  } = useContext(CalendarContext) as CalendarContextType;

  const toggleClearDate = useCallback(() => {
    clearDate();
    functions.setSelectedMonthByIndex(new Date().getMonth(), new Date().getFullYear());
    functions.setSelectedYear(new Date().getFullYear());
  }, []);

  if (!isOpen) return null;

  return (
    <div data-testid="calendar" className={classes.calendar}>
      <CalendarHeader />
      {bodyView[state.mode]}
      <Button onClick={toggleClearDate}>Clear</Button>
    </div>
  );
};
