export const getHolidayDay = async (year: number) => {
  const url = `https://public-holiday.p.rapidapi.com/${year}/BY`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.REACT_HOLIDAY_API!,
      'X-RapidAPI-Host': 'public-holiday.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error in get holidays API');
  }
};
