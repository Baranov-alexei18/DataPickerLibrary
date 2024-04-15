import { getMonthesNames } from './getMonthesNames';

describe('getMonthesNames', () => {
  it('should return an array of month names', () => {
    const monthesNames = getMonthesNames();

    expect(monthesNames).toHaveLength(12);
    expect(monthesNames[0]).toEqual({
      month: 'январь',
      monthIndex: 0,
      monthShort: 'янв.',
      date: new Date('2024-12-31T21:00:00.000Z'),
    });
    expect(monthesNames[1]).toEqual({
      month: 'февраль',
      monthIndex: 1,
      monthShort: 'февр.',
      date: new Date('2025-01-31T21:00:00.000Z'),
    });
  });
});
