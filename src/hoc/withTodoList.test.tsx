import React from 'react';
import { render } from '@testing-library/react';

import { CalendarProps } from '@/components/Calendar/types';
import { TodoLocalstorageType } from '@/types/todo';

import { withToDoList } from './withTodoList';

import '@testing-library/jest-dom';

const mockLocalStorage = (data: Record<string, TodoLocalstorageType[]>) => {
  const localStorageMock = {
    getItem: jest.fn().mockImplementation(() => JSON.stringify(data)),
  };
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
};

describe('withToDoList', () => {
  const MockComponent: React.FC<CalendarProps> = (
    { openTodo },
  ) => <div aria-hidden data-testid="mock-component" onClick={() => openTodo(new Date())}>Mock Component</div>;
  const WrappedComponent = withToDoList(MockComponent);
  const mockTodos = {
    '16/04/2024': [
      { id: 1713042015168, text: '123', date: '17/04/2024' },
      { id: 1713042016706, text: '345', date: '17/04/2024' },
    ],
  };
  mockLocalStorage(mockTodos);

  it('renders WrappedComponent', () => {
    const { getByTestId } = render(<WrappedComponent
      selectedDate="16/04/2024"
      selectedRange={[null, null]}
      isOpen={false}
      clearDate={() => jest.fn()}
      isFirstWeekDayMonday={false}
      locale=""
      closeCalendar={() => jest.fn()}
      openTodo={() => jest.fn()}
      selectDate={() => jest.fn()}
      selectRange={() => jest.fn()}
      holidays={[]}
    />);
    expect(getByTestId('mock-component')).toBeInTheDocument();
  });
});
