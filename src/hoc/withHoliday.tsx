import React, { useEffect, useState } from 'react';

import { DayViewProps } from '@/types';
import { formatStringToDate } from '@/utils/Calendar/getFormatDate';
import { getHolidayDay } from '@/helpers/getHolidayDay';

export const withHolidaysConditional = (
  Component: React.ComponentType<DayViewProps>,

) => function createDayHoliay(props: DayViewProps) {
  const [holidays, setHolidays] = useState([]);
  const { selectedDate } = props;

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const year = selectedDate!.length === 10
          ? formatStringToDate(selectedDate as string).getFullYear()
          : new Date().getFullYear();

        const data = await getHolidayDay(year);
        setHolidays(data);
      } catch (error) {
        throw new Error('Error fetching holidays');
      }
    };
    fetchHolidays();
  }, [selectedDate]);

  return <Component {...props} holidays={holidays} />;
};
