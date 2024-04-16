import { getErrorMessage, getMaskForDateField } from './datefield';

describe('getErrorMessage', () => {
  const minDate = new Date(2024, 2, 1);
  const maxDate = new Date(2024, 11, 30);

  it('should return correct message when date is before minDate', () => {
    const date = new Date(2023, 10, 10);
    const errorMessage = getErrorMessage(date, maxDate, minDate);
    expect(errorMessage).toBe('Date should be after 01.03.2024');
  });

  it('should return correct message when date is after maxDate', () => {
    const date = new Date(2025, 1, 1);
    const errorMessage = getErrorMessage(date, maxDate, minDate);
    expect(errorMessage).toBe('Date should be before 30.12.2024');
  });

  it('should return empty string when date is valid range', () => {
    const date = new Date(2024, 4, 13);
    const errorMessage = getErrorMessage(date, maxDate, minDate);
    expect(errorMessage).toBe('');
  });
});

describe('getMaskForDateField', () => {
  it('should return formats value correctly with slashes', () => {
    let formattedValue = getMaskForDateField('14042024');
    expect(formattedValue).toBe('14/04/2024');

    formattedValue = getMaskForDateField('123456789');
    expect(formattedValue).toBe('12/34/5678');
  });

  it('should return formats value correctly without years', () => {
    const formattedValue = getMaskForDateField('0215');
    expect(formattedValue).toBe('02/15/');
  });

  it('should return empty string', () => {
    const formattedValue = getMaskForDateField('');
    expect(formattedValue).toBe('');
  });
});
