import React, { FC, useContext } from 'react';

import { CalendarContext } from '@/hoc/withCalendarContext';
import { CalendarContextType } from '@/types/calendar';

import { Button } from '../Button';
import { DayView } from '../DayView';
import { MonthView } from '../MonthView';
import { YearView } from '../YearView';
import { CalendarHeader } from './Header';
import classes from './styles.module.scss';
import { CalendarProps } from './type';

export const Calendar: FC<Partial<CalendarProps>> = () => {
  const {
    state,
    functions,
    isOpen,
    clearDate,
  } = useContext(CalendarContext) as CalendarContextType;

  if (!isOpen) return null;

  const toggleClearDate = () => {
    clearDate();
    functions.setSelectedMonthByIndex(new Date().getMonth(), new Date().getFullYear());
    functions.setSelectedYear(new Date().getFullYear());
  };

  let bodyView;
  switch (state.mode) {
    case 'days': {
      bodyView = <DayView />;
      break;
    }
    case 'monthes': {
      bodyView = <MonthView />;
      break;
    }
    case 'years': {
      bodyView = <YearView />;
      break;
    }
    default: {
      bodyView = null;
      break;
    }
  }

  return (
    <div className={classes.calendar}>
      <CalendarHeader />
      {bodyView}
      <Button onClick={toggleClearDate}>Clear</Button>
    </div>
  );
};
