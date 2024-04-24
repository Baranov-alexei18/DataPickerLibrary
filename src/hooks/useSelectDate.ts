import { useState } from 'react';

import { createDate, createMonth } from '@/helpers';

export const useSelectedDate = (initialDate: Date) => {
  const [selectedDay, setSelectedDay] = useState(createDate({ date: initialDate }));
  const [selectedMonth, setSelectedMonth] = useState(
    createMonth({ date: new Date(selectedDay.year, selectedDay.monthIndex), locale: 'en' }),
  );
  const [selectedYear, setSelectedYear] = useState(initialDate.getFullYear());

  return {
    selectedDay,
    selectedMonth,
    selectedYear,
    setSelectedDay,
    setSelectedYear,
    setSelectedMonth,
  };
};
