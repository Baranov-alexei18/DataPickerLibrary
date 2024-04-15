import { validateDate } from './validationDate';

describe('validateDate', () => {
  it('should return the valid date', () => {
    const invalidValue = '12/12/2024';
    expect(validateDate(invalidValue)).toBe(invalidValue);
  });

  it('should return empty', () => {
    const invalidValue = '';
    expect(validateDate(invalidValue)).toBe(invalidValue);
  });

  it('should return correct the day', () => {
    const inputValue = '44/10/2024';
    const expectedValue = '31/10/2024';
    expect(validateDate(inputValue)).toBe(expectedValue);
  });

  it('should return correct the month', () => {
    const inputValue = '30/20/2024';
    const expectedValue = '30/12/2024';
    expect(validateDate(inputValue)).toBe(expectedValue);
  });
});
