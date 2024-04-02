import React, { FC } from 'react';

import classes from './styles.module.scss';

interface HeaderTableProps {
    firstWeekDay: string;
}
export const TableHeader: FC<HeaderTableProps> = ({ firstWeekDay = 'Mo' }) => {
  let weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  if (firstWeekDay === 'Su') {
    weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  }

  return (
    <thead>
      <tr className={classes.table_header}>
        {weekDays.map((item) => (
          <th key={item}>{item}</th>
        ))}
      </tr>
    </thead>
  );
};
