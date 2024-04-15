import { createDate } from './createDate';

describe('createDate function', () => {
  it('should create a date with correct properties', () => {
    const mockDate = new Date('2024-01-01T12:00:00');

    const result = createDate({ date: mockDate });

    expect(result.date).toEqual(mockDate);
    expect(result.dayNumber).toEqual(1);
    expect(result.day).toEqual('понедельник');
    expect(result.dayNumberInWeek).toEqual(2);
    expect(result.dayShort).toEqual('пн');
    expect(result.year).toEqual(2024);
    expect(result.yearShort).toEqual('24');
    expect(result.month).toEqual('январь');
    expect(result.monthShort).toEqual('янв.');
    expect(result.monthNumber).toEqual(1);
    expect(result.monthIndex).toEqual(0);
    expect(result.timestamp).toEqual(1704099600000);
    expect(result.week).toEqual(1);
  });
});
