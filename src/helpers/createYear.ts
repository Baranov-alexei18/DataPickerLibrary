import { MONTHES_COUNT } from '@/constants';
import { CreateYearParams } from '@/types/date';

import { createDate } from './createDate';
import { createMonth } from './createMonth';

export const createYear = (params?: CreateYearParams) => {
  const locale = params?.locale ?? 'default';

  const today = createDate();

  const year = params?.year ?? today.year;
  const monthNumber = params?.monthNumber ?? today.monthNumber;

  const month = createMonth({ date: new Date(year, monthNumber - 1), locale });

  const getMonthDays = (monthIndex: number) => createMonth(
    { date: new Date(year, monthIndex), locale },
  ).createMonthDays();

  const createYearMonthes = () => {
    const monthes = [];

    for (let i = 0; i <= MONTHES_COUNT - 1; i += 1) {
      monthes[i] = getMonthDays(i);
    }

    return monthes;
  };

  return {
    createYearMonthes,
    month,
    year,
  };
};

export const getYearsInterval = (year: number) => {
  const startYear = Math.floor(year / 10) * 10;
  return [...Array(10)].map((_, index) => startYear + index);
};
