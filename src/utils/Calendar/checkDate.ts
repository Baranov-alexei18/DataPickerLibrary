import { DAY_NUMBER_WEEK } from '@/constants';
import { CalendarDay } from '@/types/calendar/calendarDay';
import { HolidayApiType } from '@/types/holiday';

const checkIsToday = (date: Date) => {
  const today = new Date();
  return checkDateIsEqual(today, date);
};

const checkDateIsEqual = (date1: Date, date2: Date = new Date()) => {
  const isDate = date1.getDate() === date2.getDate()
    && date1.getMonth() === date2.getMonth()
    && date1.getFullYear() === date2.getFullYear();

  return isDate;
};

const isWeekend = (day: Partial<CalendarDay>): boolean => {
  const dayOfWeek = day?.date?.getDay();
  return dayOfWeek === DAY_NUMBER_WEEK.SUNDAY || dayOfWeek === DAY_NUMBER_WEEK.SATURDAY;
};

const isHoliday = (dateHoliday: Date, holidays:HolidayApiType[], show:boolean): boolean => {
  if (!show) return false;

  const matchingHoliday = holidays.find(({ date }) => {
    const dateForHoliday = new Date(date);
    return checkDateIsEqual(dateForHoliday, dateHoliday);
  });

  return !!matchingHoliday;
};

const isDateInRange = (date: Date, max?: Date, min?: Date, strict: boolean = false) => {
  if (!min || !max) return false;

  if (strict) {
    return date > min && date < max;
  }
  const isDayInRange = date >= min && date <= max;
  return isDayInRange;
};

const isCurrentMonth = (monthIndex: number, selectedYear: number) => {
  const curMonth = new Date().getMonth() === monthIndex;
  const curYear = new Date().getFullYear() === selectedYear;
  return curMonth && curYear;
};

const isCurrentYear = (year: number) => new Date().getFullYear() === year;

const isAdditionalDay = (day: CalendarDay, monthIndex: number) => day.monthIndex !== monthIndex;

const isSelectedDay = (day: CalendarDay, dateNow: Date) => checkDateIsEqual(day.date, dateNow);

export {
  checkDateIsEqual,
  checkIsToday,
  isAdditionalDay,
  isCurrentMonth,
  isCurrentYear,
  isDateInRange,
  isHoliday,
  isSelectedDay,
  isWeekend,
};
