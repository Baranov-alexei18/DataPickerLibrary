import { getWeekDaysNames } from './getWeekDaysNames';

describe('getWeekDaysNames', () => {
  it('should return an array of objects with day names and short names', () => {
    const weekDays = getWeekDaysNames(1);
    expect(weekDays).toHaveLength(7);
    expect(weekDays[0]).toEqual({
      day: 'воскресенье',
      dayShort: 'вс',
    });
    expect(weekDays[1]).toEqual({
      day: 'понедельник',
      dayShort: 'пн',
    });
  });

  it('should return an array of objects with day names and short names in EN', () => {
    const weekDays = getWeekDaysNames(1, 'en');
    expect(weekDays).toHaveLength(7);
    expect(weekDays[0]).toEqual({
      day: 'Sunday',
      dayShort: 'Su',
    });
    expect(weekDays[1]).toEqual({
      day: 'Monday',
      dayShort: 'Mo',
    });
  });
});
