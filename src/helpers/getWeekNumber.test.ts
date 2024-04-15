import { getWeekNumber } from './getWeekNumber';

describe('getWeekNumber', () => {
  it('should return the correct week number for a date within the year', () => {
    const date = new Date(2024, 4, 15);
    expect(getWeekNumber(date)).toBe(20);
  });

  it('should return handle dates on the boundary of the year correctly', () => {
    const date = new Date(2024, 11, 31);
    expect(getWeekNumber(date)).toBe(53);
  });
});
