import { DAYS_IN_WEEK } from '@/constants';
import { CalendarDay } from '@/types/calendar/calendarDay';
import { CalendarMonth } from '@/types/calendar/calendarMonth';

import { createMonth, getMonthNumberOfDays } from './createMonth';

export const generateCalendarDays = (
  selectedMonth: CalendarMonth,
  selectedYear: number,
  firstWeekDayNumber: number,
  days: CalendarDay[],
  locale: string,
) => {
  const monthNumberOfDays = getMonthNumberOfDays(selectedMonth.monthIndex, selectedYear);
  const prevMonthDays = createMonth({
    date: new Date(selectedYear, selectedMonth.monthIndex - 1),
    locale,
  }).createMonthDays();
  const nextMonthDays = createMonth({
    date: new Date(selectedYear, selectedMonth.monthIndex + 1),
    locale,
  }).createMonthDays();

  const firstDay = days[0];
  const lastDay = days[monthNumberOfDays - 1];

  const shiftIndex = firstWeekDayNumber - 1;
  const numberOfPrevDays = firstDay.dayNumberInWeek - 1 - shiftIndex < 0
    ? DAYS_IN_WEEK - (firstWeekDayNumber - firstDay.dayNumberInWeek)
    : firstDay.dayNumberInWeek - 1 - shiftIndex;

  const numberOfNextDays = DAYS_IN_WEEK - lastDay.dayNumberInWeek + shiftIndex > 6
    ? DAYS_IN_WEEK - lastDay.dayNumberInWeek - (DAYS_IN_WEEK - shiftIndex)
    : DAYS_IN_WEEK - lastDay.dayNumberInWeek + shiftIndex;

  const totalCalendarDays = days.length + numberOfPrevDays + numberOfNextDays;

  const result = [];

  for (let i = 0; i < numberOfPrevDays; i += 1) {
    const inverted = numberOfPrevDays - i;
    result[i] = prevMonthDays[prevMonthDays.length - inverted];
  }

  for (let i = numberOfPrevDays; i < totalCalendarDays - numberOfNextDays; i += 1) {
    result[i] = days[i - numberOfPrevDays];
  }

  for (let i = totalCalendarDays - numberOfNextDays; i < totalCalendarDays; i += 1) {
    result[i] = nextMonthDays[i - totalCalendarDays + numberOfNextDays];
  }
  return result;
};
