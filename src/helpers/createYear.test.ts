import { createYear, getYearsInterval } from './createYear';

describe('createYear', () => {
  it('should create a year with 12 months', () => {
    const year = createYear();
    expect(year.createYearMonthes()).toHaveLength(12);
  });

  it('should create a year with correct month names for the default locale', () => {
    const year = createYear();
    const monthNames = year.month.monthName;
    expect(monthNames).toEqual('апрель');
  });

  it('should create a year with correct month names for a specific locale', () => {
    const mockLocale = 'en-EN';

    const year = createYear({ locale: mockLocale, year: 2024, monthNumber: 1 });
    const monthNames = year.month.monthName;
    expect(monthNames).toEqual(monthNames);
  });
});

describe('getYearsInterval', () => {
  it('should return an array of 10 consecutive years starting from the given year', () => {
    const year = 2024;
    const expectedYears = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029];
    const result = getYearsInterval(year);
    expect(result.length).toEqual(10);
    expect(result).toEqual(expectedYears);
  });

  it('should handle years ending with 0 correctly', () => {
    const year = 2002;
    const expectedYears = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009];
    const result = getYearsInterval(year);
    expect(result).toEqual(expectedYears);
    expect(result.length).toEqual(10);
  });
});
