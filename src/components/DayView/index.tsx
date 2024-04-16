import React, { Fragment, memo, useContext } from 'react';

import { CalendarContext } from '@/hoc/withCalendarContext';
import { CalendarContextType } from '@/types/calendar';

import { CalendarCell } from '../CalendarCell';

import classes from './styles.module.scss';

export const DayView = memo(() => {
  const { state } = useContext(CalendarContext) as CalendarContextType;
  const { weekDaysNames, calendarDays } = state;
  return (
    <>
      <div className={classes.week_names}>
        {weekDaysNames.map(({ dayShort }) => (
          <div key={dayShort}>{dayShort}</div>
        ))}
      </div>
      <div className={classes.table_days}>
        {calendarDays.map((day) => (
          <Fragment key={`${day.dayNumber}-${day.monthIndex}`}>
            <CalendarCell dayCell={day} />
          </Fragment>
        ))}
      </div>
    </>
  );
});
