import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { TODO_STORAGE_KEY } from '@/constants';
import { formatDateToString } from '@/utils/Calendar/getFormatDate';

import { TodoList } from '.';

import '@testing-library/jest-dom';

describe('TodoList', () => {
  const onCloseMock = jest.fn();
  const selectedDate = new Date('2024-04-16');
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });

  beforeEach(() => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify({ [selectedDate.toISOString()]: [] }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders TodoList correctly', () => {
    const { getByText, getByTestId } = render(
      <TodoList onClose={onCloseMock} selectedDate={selectedDate} />,
    );
    expect(getByText(`Todo List for ${formatDateToString(selectedDate)}`)).toBeInTheDocument();
    expect(getByTestId('todolist-input')).toBeInTheDocument();
  });

  it('adds a todo item', () => {
    const { getByText, getByTestId } = render(
      <TodoList onClose={onCloseMock} selectedDate={selectedDate} />,
    );
    const input = getByTestId('todolist-input');
    const addButton = getByText('Add');
    fireEvent.change(input, { target: { value: 'New todo' } });
    fireEvent.click(addButton);
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(TODO_STORAGE_KEY, JSON.stringify(
      {
        [selectedDate.toISOString()]: [],
        [formatDateToString(selectedDate)]: [{
          id: Date.now().toString().slice(0, 10),
          text: 'New todo',
          date: formatDateToString(selectedDate),
        }],
      },
    ));
  });

  it('close todolist', () => {
    const { getByText } = render(<TodoList onClose={onCloseMock} selectedDate={selectedDate} />);
    const backButton = getByText('Back');
    fireEvent.click(backButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
