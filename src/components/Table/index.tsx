import React, { FC } from 'react';

import { firstWeekDayType } from '@/types';

import { TableBody } from './Body';
import { TableHeader } from './Header';
import classes from './styles.module.scss';

interface TableProps {
  firstWeekDay?: firstWeekDayType;
  startDate?: Date;
  onDateSelect: any;
}
export const Table: FC<Partial<TableProps>> = ({ firstWeekDay = 'Mo', startDate = new Date(), onDateSelect }) => (
  <table className={classes.table_wrapper}>
    <TableHeader firstWeekDay={firstWeekDay} />
    <TableBody
      startDate={startDate}
      firstWeekDay={firstWeekDay}
      onDateSelect={onDateSelect}
    />
  </table>
);
