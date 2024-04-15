import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { mockCalendarContext } from '@/constants/mocks/mock';
import { CalendarContext } from '@/hoc/withCalendarContext';

import { CalendarHeader } from '.';

import '@testing-library/jest-dom';

describe('CalendarHeader', () => {
  test('setMode changes mode to "monthes"', () => {
    render(
      <CalendarContext.Provider value={mockCalendarContext}>
        <CalendarHeader />
      </CalendarContext.Provider>,
    );

    fireEvent.click(screen.getByTestId('days-view'));

    expect(screen.queryByTestId('days-view')).toBeInTheDocument();
    expect(mockCalendarContext.functions.setMode).toHaveBeenCalledWith('monthes');
  });

  test('handleArrow fires onClickArrow with "left" direction', () => {
    const { getByAltText } = render(
      <CalendarContext.Provider value={mockCalendarContext}>
        <CalendarHeader />
      </CalendarContext.Provider>,
    );

    fireEvent.click(getByAltText('toLeft'));

    expect(mockCalendarContext.functions.onClickArrow).toHaveBeenCalledWith('left');
  });

  test('handleArrow fires onClickArrow with "right" direction', () => {
    const { getByAltText } = render(
      <CalendarContext.Provider value={mockCalendarContext}>
        <CalendarHeader />
      </CalendarContext.Provider>,
    );

    fireEvent.click(getByAltText('toRight'));

    expect(mockCalendarContext.functions.onClickArrow).toHaveBeenCalledWith('right');
  });
});
