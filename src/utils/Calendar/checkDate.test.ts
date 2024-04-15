import { mockHolidays } from '@/constants/mock';
import { CalendarDay } from '@/types/calendar/CalendarState';

import {
  checkDateIsEqual,
  checkIsToday,
  isAdditionalDay,
  isDateInRange,
  isHoliday,
  isWeekend,
} from './checkDate';

describe('checkDateIsEqual', () => {
  it('should return true if dates are equal', () => {
    const date1 = new Date(2024, 4, 15);
    const date2 = new Date(2024, 4, 15);
    expect(checkDateIsEqual(date1, date2)).toBe(true);
  });

  it('should return false if dates are not equal', () => {
    const date1 = new Date(2024, 4, 15);
    const date2 = new Date(2024, 4, 16);
    expect(checkDateIsEqual(date1, date2)).toBe(false);
  });
});

describe('checkIsToday', () => {
  it('should return true if the provided date is today', () => {
    const today = new Date();
    expect(checkIsToday(today)).toBe(true);
  });

  it('should return false if the provided date is not today', () => {
    const someDate = new Date(2024, 4, 14);
    expect(checkIsToday(someDate)).toBe(false);
  });
});

describe('isWeekend', () => {
  it('should return true if day is Sunday', () => {
    const sunday: Partial<CalendarDay> = {
      date: new Date(2024, 3, 14),
    };

    expect(isWeekend(sunday)).toBe(true);
  });

  it('should return true if day is Saturday', () => {
    const saturday: Partial<CalendarDay> = {
      date: new Date(2024, 3, 13),
    };

    expect(isWeekend(saturday)).toBe(true);
  });

  it('should return false if day is not Saturday or Sunday', () => {
    const wednesday: Partial<CalendarDay> = {
      date: new Date(2024, 3, 10),
    };
    expect(isWeekend(wednesday)).toBe(false);
  });
});

describe('isDateInRange', () => {
  const minDate = new Date(2024, 0, 1);
  const maxDate = new Date(2024, 11, 31);

  it('should return true if date is range', () => {
    const dateInRange = new Date(2024, 5, 15);
    expect(isDateInRange(dateInRange, maxDate, minDate, true)).toBe(true);
  });

  it('should return false if min or max are not defined', () => {
    const date = new Date(2024, 5, 15);
    expect(isDateInRange(date, undefined, minDate)).toBe(false);
    expect(isDateInRange(date, maxDate, undefined)).toBe(false);
  });

  it('should return false if date is outside range (inclusive)', () => {
    const dateOutOfRange = new Date(2025, 0, 1);
    expect(isDateInRange(dateOutOfRange, maxDate, minDate)).toBe(false);
  });
});

describe('isHoliday', () => {
  const mockDateHoliday = new Date('2024-01-01');

  it('should return true if dateHoliday is a holiday', () => {
    expect(isHoliday(mockDateHoliday, mockHolidays, true)).toBe(true);
  });

  it('should return false if show is false', () => {
    expect(isHoliday(mockDateHoliday, mockHolidays, false)).toBe(false);
  });

  it('should return false if date is not a holiday', () => {
    const notHolidayDate = new Date('2024-03-01');
    expect(isHoliday(notHolidayDate, mockHolidays, true)).toBe(false);
  });
});

describe('isAdditionalDay', () => {
  const mockDay: CalendarDay = {
    date: new Date('2024-01-01'),
    dayNumber: 1,
    day: 'Monday',
    dayNumberInWeek: 1,
    dayShort: 'Mon',
    year: 2024,
    yearShort: '24',
    month: 'January',
    monthShort: 'Jan',
    monthNumber: 1,
    monthIndex: 0,
    timestamp: 1234567890,
    week: 1,
  };

  it('should return true if the day belongs to a different month', () => {
    const result = isAdditionalDay(mockDay, 1);
    expect(result).toBe(true);
  });

  it('should return false if the day belongs to the same month', () => {
    const result = isAdditionalDay(mockDay, 0);
    expect(result).toBe(false);
  });
});
