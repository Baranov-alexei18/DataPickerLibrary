import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { DateField } from '.';

import '@testing-library/jest-dom';

describe('DateField', () => {
  test('renders DateField component with initial data', () => {
    const onChange = jest.fn();
    const onClear = jest.fn();
    const onFocus = jest.fn();
    const value = '2024-04-10';

    render(
      <DateField
        value={value}
        className="class"
        onChange={onChange}
        onClear={onClear}
        onFocus={onFocus}
      />,
    );

    const dateInput = screen.getByPlaceholderText('Choose Date');
    const clearIcon = screen.getByAltText('Close');

    expect(dateInput).toBeInTheDocument();
    expect(clearIcon).toBeInTheDocument();

    fireEvent.change(dateInput, { target: { value: '2024-04-15' } });
    expect(onChange).toHaveBeenCalledWith('2024-04-15');

    fireEvent.click(clearIcon);
    expect(onClear).toHaveBeenCalled();

    fireEvent.focus(dateInput);
    expect(onFocus).toHaveBeenCalled();
  });
});
