import React, { FC } from 'react';
import { render, waitFor } from '@testing-library/react';

import { mockHolidays } from '@/constants/mocks/mock';
import { DayViewProps } from '@/types/todo';

import { withHolidaysConditional } from './withHoliday';

const MockComponent: FC<Partial<DayViewProps>> = (props: DayViewProps) => {
  const { holidays } = props;
  return (
    <div>
      {holidays?.map((holiday) => (
        <span key={holiday.date}>{holiday.name}</span>
      ))}
    </div>
  );
};

const mockFetch = jest.fn().mockResolvedValue({
  json: () => Promise.resolve(mockHolidays),
});

const originalFetch = global.fetch;

describe('withHolidaysConditional', () => {
  beforeEach(() => {
    global.fetch = mockFetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  test('should pass holidays to component', async () => {
    const ComponentWithHolidays = withHolidaysConditional(MockComponent);
    const { container } = render(<ComponentWithHolidays selectedDate="2024-01-01" />);

    await waitFor(() => {
      expect(container.querySelectorAll('span').length).toBe(2);
      expect(container.textContent).toContain('New Year Day');
      expect(container.textContent).toContain('Valentine Day');
    });
  });
});
