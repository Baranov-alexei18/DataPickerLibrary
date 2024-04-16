export const getErrorMessage = (date: Date, maxDate: Date, minDate: Date) => {
  if (date < minDate) {
    return `Date should be after ${minDate.toLocaleDateString()}`;
  }

  if (date > maxDate) {
    return `Date should be before ${maxDate.toLocaleDateString()}`;
  }
  return '';
};

export const getMaskForDateField = (value: string): string => {
  const formattedValue = value
    .replace(/\D/g, '')
    .slice(0, 8)
    .replace(/^(\d{2})(\d{0,2})/, '$1/$2')
    .replace(/^(\d{2})\/(\d{2})(\d{0,4})/, '$1/$2/$3');
  return formattedValue;
};
