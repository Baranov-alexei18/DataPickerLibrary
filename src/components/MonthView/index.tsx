import React, { useContext } from 'react';

import { CalendarContext } from '@/hoc/withCalendarContext';
import { CalendarType } from '@/types/calendar';

import classes from './styles.module.scss';

export const MonthView = () => {
  const { state, functions } = useContext(CalendarContext) as CalendarType;

  const updateMonth = (indexMonth: number) => {
    functions.setSelectedMonthByIndex(indexMonth);
    functions.setMode('days');
  };

  return (
    <div className={classes.calendar_year}>
      {state.monthesNames.map((monthesName) => {
        const isCurrentMonth = new Date().getMonth() === monthesName.monthIndex
          && state.selectedYear === new Date().getFullYear();

        return (
          <div
            key={monthesName.month}
            aria-hidden
            onClick={() => updateMonth(monthesName.monthIndex)}
            className={[
              classes.calendar_item,
              isCurrentMonth ? classes.calendar_today : '',
            ].join(' ')}
          >
            {monthesName.monthShort}
          </div>
        );
      })}
    </div>
  );
};
