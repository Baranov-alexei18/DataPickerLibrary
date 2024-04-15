import { mockHolidays } from '@/constants/mock';

import { getHolidayDay } from './getHolidayDay';

describe('getHolidayDay', () => {
  it('should fetch holidays for a given year', async () => {
    const mockFetch = jest.fn().mockResolvedValueOnce({ json: () => mockHolidays });

    global.fetch = mockFetch;

    const year = 2024;
    const holidays = await getHolidayDay(year);

    expect(holidays).toEqual(mockHolidays);
    expect(mockFetch).toHaveBeenCalledWith(`https://public-holiday.p.rapidapi.com/${year}/BY`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_HOLIDAY_API,
        'X-RapidAPI-Host': 'public-holiday.p.rapidapi.com',
      },
    });
  });

  it('should throw an error if fetching holidays fails', async () => {
    const mockFetch = jest.fn().mockRejectedValueOnce(new Error('Failed to fetch'));
    global.fetch = mockFetch;
    const year = 2024;
    await expect(getHolidayDay(year)).rejects.toThrow('Error in get holidays API');
  });
});
