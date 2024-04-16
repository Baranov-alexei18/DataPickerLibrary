import { createMonth, getMonthNumberOfDays } from './createMonth';

describe('createMonth', () => {
  it('should create a month object', () => {
    const testDate1 = createMonth({ date: new Date('2024-01-01T12:00:00') });

    expect(testDate1.monthName).toEqual('январь');
    expect(testDate1.monthIndex).toEqual(0);
    expect(testDate1.monthNumber).toEqual(1);
    expect(testDate1.year).toEqual(2024);

    const testDate2 = createMonth({ date: new Date('2024-12-01T12:00:00') });

    expect(testDate2.monthName).toEqual('декабрь');
    expect(testDate2.monthIndex).toEqual(11);
    expect(testDate2.monthNumber).toEqual(12);
    expect(testDate2.year).toEqual(2024);

    const currentMonth = createMonth();

    const now = new Date();
    expect(currentMonth.monthName).toEqual(now.toLocaleDateString(undefined, { month: 'long' }));
    expect(currentMonth.monthIndex).toEqual(now.getMonth());
    expect(currentMonth.monthNumber).toEqual(now.getMonth() + 1);
    expect(currentMonth.year).toEqual(now.getFullYear());
  });
});

describe('getMonthNumberOfDays', () => {
  it('should return the correct number of days for month', () => {
    expect(getMonthNumberOfDays(1, 2023)).toBe(28);
    expect(getMonthNumberOfDays(1, 2024)).toBe(29);
    expect(getMonthNumberOfDays(0, 2023)).toBe(31);
  });
});
