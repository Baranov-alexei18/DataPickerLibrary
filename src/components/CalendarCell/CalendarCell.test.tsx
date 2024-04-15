import React from 'react';
import { render } from '@testing-library/react';

import { mockCalendarContext } from '@/constants/mocks/mock';
import { CalendarContext } from '@/hoc/withCalendarContext'; // Импортируем контекст

import { CalendarCell } from '.';

import '@testing-library/jest-dom';

describe('CalendarCell', () => {
  const dayCell = {
    date: new Date(2024, 3, 10),
    dayNumber: 10,
    day: 'Wednesday',
    dayNumberInWeek: 3,
    dayShort: 'Wed',
    year: 2024,
    yearShort: '24',
    month: 'April',
    monthShort: 'Apr',
    monthNumber: 4,
    monthIndex: 3,
    timestamp: 0,
    week: 15,
  };

  test('renders correctly', () => {
    const { getByText } = render(
      <CalendarContext.Provider value={mockCalendarContext}>
        <CalendarCell dayCell={dayCell} />
      </CalendarContext.Provider>,
    );
    expect(getByText('10')).toBeInTheDocument();
  });
});
