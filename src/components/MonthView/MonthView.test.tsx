import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { mockCalendarContext } from '@/constants/mocks/mock';
import { CalendarContext } from '@/hoc/withCalendarContext';

import { MonthView } from '.';

import '@testing-library/jest-dom';

describe('MonthView', () => {
  test('should render month names', () => {
    const monthesNames = [
      { month: 'January', monthShort: 'Jan', monthIndex: 0 },
      { month: 'February', monthShort: 'Feb', monthIndex: 1 },
    ];

    const { getByText } = render(
      <CalendarContext.Provider value={mockCalendarContext}>
        <MonthView />
      </CalendarContext.Provider>,
    );

    monthesNames.forEach(({ monthShort }) => {
      expect(getByText(monthShort)).toBeInTheDocument();
    });
  });

  test('should call updateMonth function on click', () => {
    const { getByText } = render(
      <CalendarContext.Provider value={mockCalendarContext}>
        <MonthView />
      </CalendarContext.Provider>,
    );

    fireEvent.click(getByText('Jan'));

    expect(mockCalendarContext.functions.setSelectedMonthByIndex).toHaveBeenCalledWith(0);

    expect(mockCalendarContext.functions.setMode).toHaveBeenCalledWith('days');
  });
});
