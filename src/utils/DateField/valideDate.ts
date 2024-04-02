export const validateDate = (value: string): string => {
  if (value.length !== 10) return value;

  const [day, month, year] = value.split('/').map(Number);

  const isValidMonth = month >= 1 && month <= 12;

  const daysInMonth = (m: number, y: number): number => new Date(y, m, 0).getDate();

  if (!isValidMonth) {
    const correctedMonth = Math.min(Math.max(month, 1), 12);
    if (correctedMonth < 10) {
      return `${day}/0${correctedMonth}/${year}`;
    }
    return `${day}/${correctedMonth}/${year}`;
  }

  const daysInCurrentMonth = daysInMonth(month, year);
  if (day > daysInCurrentMonth) {
    return `${daysInCurrentMonth}/${month}/${year}`;
  }

  return value;
};
