import { formatDateToString, formatStringToDate } from './getFormatDate';

describe('formatDateToString', () => {
  it('should return correct date format', () => {
    const date = new Date(2024, 10, 10);
    const formattedDate = formatDateToString(date);
    expect(formattedDate).toBe('10/11/2024');
  });

  it('should return handle single-digit day and month correctly', () => {
    const date = new Date(2024, 4, 5);
    const formattedDate = formatDateToString(date);
    expect(formattedDate).toBe('05/05/2024');
  });
});

describe('formatStringToDate', () => {
  it('should format string to Date object', () => {
    const dateString = '15/04/2024';
    const formattedDate = formatStringToDate(dateString);
    expect(formattedDate).toEqual(new Date(2024, 3, 15));
  });

  it('should return current date if no date string is provided', () => {
    const formattedDate = formatStringToDate('');
    expect(formattedDate).toEqual(new Date());
  });
});
