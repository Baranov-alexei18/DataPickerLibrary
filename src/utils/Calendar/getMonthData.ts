const daysInMonth = (date: Date): number => {
  const month = date.getMonth();
  const year = date.getFullYear();
  return new Date(year, month + 1, 0).getDate();
};

export const getMonthData = (date: Date): Date[][] => {
  const monthData: Date[][] = [];
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const days = daysInMonth(date);
  const prevMonthDays = daysInMonth(new Date(date.getFullYear(), date.getMonth() - 1));
  let day = 1;
  let prevMonthDay = prevMonthDays - firstDay + 1;
  for (let i = 0; i < 5; i++) {
    const week: Date[] = [];
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        week.push(new Date(date.getFullYear(), date.getMonth() - 1, prevMonthDay));
        prevMonthDay++;
      } else if (day > days) {
        week.push(new Date(date.getFullYear(), date.getMonth() + 1, day - days));
        day++;
      } else {
        week.push(new Date(date.getFullYear(), date.getMonth(), day));
        day++;
      }
    }
    monthData.push(week);
  }
  return monthData;
};
