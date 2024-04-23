import React, { FC } from 'react';
import { render, screen } from '@testing-library/react';

import { CalendarProps } from '@/components/Calendar/types';
import { CalendarHeader } from '@/components/CalendarHeader';

import { withCalendarContext } from './withCalendarContext';

import '@testing-library/jest-dom';

const MockComponent: FC<Partial<CalendarProps>> = () => (
  <div data-testid="calendar" className="classes">
    <CalendarHeader />
  </div>
);

describe('withCalendarContext', () => {
  test('renders component with correct props inside ErrorBoundary', () => {
    const ComponentWithCalendarContext = withCalendarContext(MockComponent);
    render(<ComponentWithCalendarContext
      state={{
        mode: 'days',
        calendarDays: [],
        weekDaysNames: [],
        monthesNames: [],
        selectedYear: 2024,
        selectedYearsInterval: [],
        selectedDay: {
          date: new Date(2024, 0, 1),
          dayNumber: 0,
          day: '',
          dayNumberInWeek: 0,
          dayShort: '',
          year: 0,
          yearShort: '',
          month: '',
          monthShort: '',
          monthNumber: 0,
          monthIndex: 0,
          timestamp: 0,
          week: 0,
        },
        selectedMonth: {
          monthName: '',
          monthIndex: 0,
          monthNumber: 0,
          year: 0,
          getDay: jest.fn(),
          createMonthDays: jest.fn(),
        },
      }}
      functions={{
        onClickArrow: jest.fn(),
        setMode: jest.fn(),
        setSelectedDay: jest.fn(),
        setSelectedMonthByIndex: jest.fn(),
        setSelectedYear: jest.fn(),
        setSelectedYearsInterval: jest.fn(),
      }}
      minDate={new Date(2022, 1, 1)}
      maxDate={new Date(2022, 1, 1)}
      holidayColor=""
      holiday={false}
      selectedDate="31/03/2024"
      selectedRange={[null, null]}
      isOpen={false}
      clearDate={() => jest.fn()}
    />);
    expect(screen.getByTestId('calendar')).toBeInTheDocument();
    expect(screen.getByTestId('calendar-header')).toBeInTheDocument();
  });
});
