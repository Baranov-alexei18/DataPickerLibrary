import { getYearsInterval } from './createYear';
import { handleMonthesClick, handleYearsClick } from './handleArrow';

describe('handleYearsClick', () => {
  const setSelectedYearsInterval = jest.fn();

  beforeEach(() => {
    setSelectedYearsInterval.mockClear();
  });

  test('should set selected years interval correctly when direction is left', () => {
    const selectedYearsInterval = [2020, 2030];
    handleYearsClick('left', selectedYearsInterval, setSelectedYearsInterval);
    expect(setSelectedYearsInterval).toHaveBeenCalledWith(getYearsInterval(2010));
  });

  test('should set selected years interval correctly when direction is right', () => {
    const selectedYearsInterval = [2020, 2030];
    handleYearsClick('right', selectedYearsInterval, setSelectedYearsInterval);
    expect(setSelectedYearsInterval).toHaveBeenCalledWith(getYearsInterval(2030));
  });
});

describe('handleMonthesClick', () => {
  const setSelectedYear = jest.fn();
  const setSelectedYearsInterval = jest.fn();

  beforeEach(() => {
    setSelectedYear.mockClear();
    setSelectedYearsInterval.mockClear();
  });

  test('should set selected year correctly when direction is left', () => {
    const selectedYear = 2022;
    const selectedYearsInterval = [2020, 2030];
    handleMonthesClick('left', selectedYear, selectedYearsInterval, setSelectedYear, setSelectedYearsInterval);
    expect(setSelectedYear).toHaveBeenCalledWith(2021);
  });

  test('should set selected year correctly when direction is right', () => {
    const selectedYear = 2022;
    const selectedYearsInterval = [2020, 2030];
    handleMonthesClick('right', selectedYear, selectedYearsInterval, setSelectedYear, setSelectedYearsInterval);
    expect(setSelectedYear).toHaveBeenCalledWith(2023);
  });
});
