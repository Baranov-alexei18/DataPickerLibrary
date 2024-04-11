import React, { useEffect, useState } from 'react';

import { DayViewProps } from '@/types';
import { getHolidayDay } from '@/utils/Calendar/getHolidayDay';

export const withHolidaysConditional = (
  Component: React.ComponentType<DayViewProps>,
  selectedYear: number,
  condition: boolean,
) => function createDayHoliay(props: DayViewProps) {
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    const fetchHolidays = async (selectYear: number) => {
      try {
        const data = await getHolidayDay(selectYear);
        setHolidays(data);
      } catch (error) {
        throw new Error('Error fetching holidays');
      }
    };

    if (condition) {
      fetchHolidays(selectedYear);
    }
  }, [selectedYear]);

  if (condition) {
    return <Component {...props} holidays={holidays} />;
  }
  return <Component {...props} />;
};
