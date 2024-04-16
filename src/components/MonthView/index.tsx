import React, { useContext } from 'react';

import { CalendarContext } from '@/hoc/withCalendarContext';
import { CalendarType } from '@/types/calendar';
import { isCurrentMonth } from '@/utils/Calendar/checkDate';

import classes from './styles.module.scss';

export const MonthView = () => {
  const { state, functions } = useContext(CalendarContext) as CalendarType;
  const { monthesNames, selectedYear } = state;

  const updateMonth = (indexMonth: number) => () => {
    functions.setSelectedMonthByIndex(indexMonth);
    functions.setMode('days');
  };

  return (
    <div className={classes.calendar_year}>
      {monthesNames.map(({ monthIndex, monthShort, month }) => (
        <div
          key={month}
          aria-hidden
          onClick={updateMonth(monthIndex)}
          className={[
            classes.calendar_item,
            isCurrentMonth(monthIndex, selectedYear) ? classes.calendar_today : '',
          ].join(' ')}
        >
          {monthShort}
        </div>
      ))}
    </div>
  );
};
