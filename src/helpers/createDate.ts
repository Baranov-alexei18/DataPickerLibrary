import { CreateDateParams } from '@/types/date';

import { getWeekNumber } from './getWeekNumber';

export const createDate = (params?: CreateDateParams) => {
  const locale = params?.locale ?? 'default';

  const paramsDate = params?.date ?? new Date();
  const dayNumber = paramsDate.getDate();
  const day = paramsDate.toLocaleDateString(locale, { weekday: 'long' });
  const dayNumberInWeek = paramsDate.getDay() + 1;
  const dayShort = paramsDate.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 2);
  const year = paramsDate.getFullYear();
  const yearShort = paramsDate.toLocaleDateString(locale, { year: '2-digit' });
  const month = paramsDate.toLocaleDateString(locale, { month: 'long' });
  const monthShort = paramsDate.toLocaleDateString(locale, { month: 'short' });
  const monthNumber = paramsDate.getMonth() + 1;
  const monthIndex = paramsDate.getMonth();
  const timestamp = paramsDate.getTime();
  const week = getWeekNumber(paramsDate);

  return {
    date: paramsDate,
    dayNumber,
    day,
    dayNumberInWeek,
    dayShort,
    year,
    yearShort,
    month,
    monthShort,
    monthNumber,
    monthIndex,
    timestamp,
    week,
  };
};
