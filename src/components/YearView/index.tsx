import React, { useContext } from 'react';
import classNames from 'classnames/bind';

import { CalendarContext } from '@/hoc/withCalendarContext';
import { CalendarType } from '@/types/calendar';
import { isCurrentYear } from '@/utils/Calendar/checkDate';

import classes from './styles.module.scss';

const cx = classNames.bind(classes);

export const YearView = () => {
  const { state, functions } = useContext(CalendarContext) as CalendarType;
  const { selectedYearsInterval } = state;

  const selectYear = (year: number) => () => {
    functions.setSelectedYear(year);
    functions.setMode('monthes');
  };

  return (
    <div className={classes.calendar_year}>
      <div className={classes.calendar_unchoosable_year}>
        {selectedYearsInterval[0] - 1}
      </div>
      {selectedYearsInterval.map((year) => {
        const className = cx({
          calendar_item: true,
          calendar_today: isCurrentYear(year),
        });

        return (
          <div
            key={year}
            aria-hidden
            onClick={selectYear(year)}
            className={className}
          >
            {year}
          </div>
        );
      })}
      <div className={classes.calendar_unchoosable_year}>
        {selectedYearsInterval[selectedYearsInterval.length - 1] + 1}
      </div>
    </div>
  );
};
