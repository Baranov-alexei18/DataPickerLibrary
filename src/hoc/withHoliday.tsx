import React, { useEffect, useState } from 'react';

import { DayViewProps } from '@/components/Calendar/BodyView/type';
import { getHolidayDay } from '@/utils/Calendar/getHolidayDay';

export const withHolidaysConditional = (
  Component: React.ComponentType<DayViewProps>,
  selectedYear: number,
  condition: boolean,
) => function createDayHoliay(props: DayViewProps) {
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    const fetchHolidays = async (selectedYear:number) => {
      try {
        const data = await getHolidayDay(selectedYear);
        setHolidays(data);
      } catch (error) {
        console.error('Error fetching holidays:', error);
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
