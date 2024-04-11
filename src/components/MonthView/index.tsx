import React, { useContext } from 'react';

import { CalendarContext } from '@/hoc/withCalendarContext';
import { CalendarType } from '@/types/calendar';
import { getDataFromContext } from '@/utils/getDataFromContext';

import classes from './styles.module.scss';

export const MonthView = () => {
  const calendarContext = useContext(CalendarContext);

  const { state, functions } = getDataFromContext(calendarContext) as CalendarType;

  const updateMonth = (indexMonth: number) => {
    functions.setSelectedMonthByIndex(indexMonth);

    setTimeout(() => {
      functions.setMode('days');
    }, 0);
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
