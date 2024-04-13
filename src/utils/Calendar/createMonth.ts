import { CreateDateParams } from '@/types/date';

import { createDate } from './createDate';

export const createMonth = (params?: CreateDateParams) => {
  const date = params?.date ?? new Date();
  const locale = params?.locale ?? 'default';

  const d = createDate({ date, locale });
  const {
    month: monthName, year, monthNumber, monthIndex,
  } = d;

  const getDay = (day: number) => createDate({ date: new Date(year, monthIndex, day), locale });

  const createMonthDays = () => {
    const days = [];

    for (let i = 0; i <= getMonthNumberOfDays(monthIndex, year) - 1; i += 1) {
      days[i] = getDay(i + 1);
    }

    return days;
  };

  return {
    getDay,
    monthName,
    monthIndex,
    monthNumber,
    year,
    createMonthDays,
  };
};

export const getMonthNumberOfDays = (
  monthIndex: number,
  yearNumber: number = new Date().getFullYear(),
) => new Date(yearNumber, monthIndex + 1, 0).getDate();
