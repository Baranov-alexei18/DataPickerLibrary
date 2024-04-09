export const getHolidayDay = async (year: number) => {
  const url = `https://public-holiday.p.rapidapi.com/${year}/BY`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '36bf98266amsh7726bba07181142p12eb8ajsn9af48f4d5f24',
      'X-RapidAPI-Host': 'public-holiday.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
