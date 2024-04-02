import React, { FC } from 'react';

import { TableBody } from './Body';
import { TableHeader } from './Header';
import classes from './styles.module.scss';

interface TableProps {
    firstWeekDay?: string;
    startDate?: Date;
}
export const Table: FC<Partial<TableProps>> = ({ firstWeekDay = 'Su', startDate = new Date() }) => (
  <table className={classes.table_wrapper}>
    <TableHeader firstWeekDay={firstWeekDay} />
    <TableBody startDate={startDate} />
  </table>
);
