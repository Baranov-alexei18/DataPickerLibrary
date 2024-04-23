import React, { useContext } from 'react';
import classNames from 'classnames/bind';

import { CalendarContext } from '@/hoc/withCalendarContext';
import { CalendarType } from '@/types/calendar';
import { isCurrentMonth } from '@/utils/Calendar/checkDate';

import classes from './styles.module.scss';

const cx = classNames.bind(classes);

export const MonthView = () => {
  const { state, functions } = useContext(CalendarContext) as CalendarType;
  const { monthesNames, selectedYear } = state;

  const updateMonth = (indexMonth: number) => () => {
    functions.setSelectedMonthByIndex(indexMonth);
    functions.setMode('days');
  };

  return (
    <div className={classes.calendar_month}>
      {monthesNames.map(({ monthIndex, monthShort, month }) => {
        const className = cx({
          calendar_item: true,
          calendar_today: isCurrentMonth(monthIndex, selectedYear),
        });

        return (
          <div
            key={month}
            aria-hidden
            onClick={updateMonth(monthIndex)}
            className={className}
          >
            {monthShort}
          </div>
        );
      })}
    </div>
  );
};
