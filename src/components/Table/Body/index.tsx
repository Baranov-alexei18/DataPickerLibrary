import React, { FC } from 'react';

import { getMonthData } from '@/utils/Calendar/getMonthData';

import classes from './styles.module.scss';

interface TableBodyProps {
    startDate: Date;
}
export const TableBody: FC<TableBodyProps> = ({ startDate = new Date() }) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(startDate);
  const today = new Date();

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const monthData = getMonthData(startDate);

  return (
    <tbody>
      {monthData.map((week) => (
        <tr key={week.toString()} className={classes.week}>
          {week.map((day) => (
            <td
              key={day.toString()}
              className={`${classes.day} 
                ${day && day.getDate() === today.getDate() ? `${classes.highlight}` : ''} 
                ${day && day.getTime() === selectedDate?.getTime() ? `${classes.selected}` : ''}
                ${day && (day.getMonth() !== startDate.getMonth()) ? `${classes.other_month}` : ''}`}
              onClick={() => day && handleDateClick(day)}
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
