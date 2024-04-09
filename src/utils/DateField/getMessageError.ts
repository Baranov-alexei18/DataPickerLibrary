export const getErrorMessage = (date: Date, maxDate: Date, minDate: Date) => {
  if (date < minDate) {
    return `Date should be after ${minDate.toLocaleDateString()}`;
  }

  if (date > maxDate) {
    return `Date should be before ${maxDate.toLocaleDateString()}`;
  }
  return '';
};
