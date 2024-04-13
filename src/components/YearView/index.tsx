import React, { useContext } from 'react';

import { CalendarContext } from '@/hoc/withCalendarContext';
import { CalendarType } from '@/types/calendar';

import classes from './styles.module.scss';

export const YearView = () => {
  const { state, functions } = useContext(CalendarContext) as CalendarType;

  return (
    <div className={classes.calendar_year}>
      <div className={classes.calendar_unchoosable_year}>
        {state.selectedYearsInterval[0] - 1}
      </div>
      {state.selectedYearsInterval.map((year) => {
        const isCurrentYear = new Date().getFullYear() === year;

        return (
          <div
            key={year}
            aria-hidden
            onClick={() => {
              functions.setSelectedYear(year);
              functions.setMode('monthes');
            }}
            className={[
              classes.calendar_item,
              isCurrentYear ? classes.calendar_today : '',
            ].join(' ')}
          >
            {year}
          </div>
        );
      })}
      <div className={classes.calendar_unchoosable_year}>
        {state.selectedYearsInterval[state.selectedYearsInterval.length - 1] + 1}
      </div>
    </div>
  );
};
