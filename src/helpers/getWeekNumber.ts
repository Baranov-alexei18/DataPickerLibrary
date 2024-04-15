import { DAYS_IN_WEEK, SECONDS_IN_DAY } from '@/constants';

export const getWeekNumber = (date: Date) => {
  const firstDayOfTheYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfTheYear.getTime()) / SECONDS_IN_DAY;

  return Math.ceil((pastDaysOfYear + firstDayOfTheYear.getDay() + 1) / DAYS_IN_WEEK);
};
