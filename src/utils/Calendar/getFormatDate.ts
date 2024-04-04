export const formatDateToString = (dateString: Date) => {
  if (!dateString) return '';

  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}/${formattedMonth}/${year}`;
};

export const formatStringToDate = (dateString: string) => {
  if (!dateString) return '';
  const [day, month, year] = dateString.split('/');

  return new Date(parseFloat(year), parseFloat(month) - 1, parseFloat(day));
};
