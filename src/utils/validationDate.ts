export const validateDate = (value: string): string => {
  if (value.length !== 10) return value;

  let validDate: string = value;
  const [day, month, year] = value.split('/').map(Number);

  const daysInMonth = (m: number, y: number): number => new Date(y, m, 1).getDate();

  const isValidMonth = month >= 1 && month <= 12;
  const isValidDay = daysInMonth(month, year);

  if (!isValidMonth) {
    const correctedMonth = Math.min(Math.max(month, 1), 12);
    const paddedMonth = correctedMonth < 10 ? `0${correctedMonth}` : correctedMonth;
    validDate = `${day}/${paddedMonth}/${year}`;
    return validateDate(validDate);
  }

  if (day > isValidDay) {
    const paddedDay = isValidDay < 10 ? `0${isValidDay}` : isValidDay;
    validDate = `${paddedDay}/${month}/${year}`;
  }

  return validDate;
};
