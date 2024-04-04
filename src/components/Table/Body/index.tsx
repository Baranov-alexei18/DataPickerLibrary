import React from 'react';

import { firstWeekDayType } from '@/types';
import { getMonthData } from '@/utils/Calendar/getMonthData';

import classes from './styles.module.scss';

interface TableBodyProps {
  startDate: Date;
  firstWeekDay: firstWeekDayType;
  onDateSelect: (date: Date) => void;
}
export const TableBody: React.FC<TableBodyProps> = ({ startDate, firstWeekDay, onDateSelect }) => {
  const today = new Date();

  const handleDateClick = (date: Date) => {
    if (date !== undefined) {
      onDateSelect(date);
    }
  };

  const monthData = getMonthData(startDate, firstWeekDay);

  return (
    <tbody>
      {monthData.map((week) => (
        <tr key={week[0].getTime()} className={classes.week}>
          {week.map((day) => (
            <td
              key={day.getTime()}
              className={`${classes.day} 
                ${day && startDate && day.getTime() === startDate.getTime() && day.getMonth() === startDate.getMonth() ? `${classes.selected}` : ''}
                ${day && day.getDate() === today.getDate() && day.getMonth() === today.getMonth() && day.getFullYear() === today.getFullYear() ? `${classes.highlight}` : ''}
                ${day && (day.getMonth() !== startDate.getMonth()) ? `${classes.other_month}` : ''}`}
              onClick={() => handleDateClick(day)}
              aria-hidden
            >
              {day ? day.getDate() : ''}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
