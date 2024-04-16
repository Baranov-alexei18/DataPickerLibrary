import { TodoLocalstorageType } from '@/types';

import { hasTodoForDay } from './getTodoForDay';

const mockLocalStorage = (data: Record<string, TodoLocalstorageType[]>) => {
  const localStorageMock = {
    getItem: jest.fn().mockImplementation(() => JSON.stringify(data)),
  };
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
};

describe('hasTodoForDay', () => {
  test('returns true if todos exist for the given day', () => {
    const mockTodos = {
      '17/04/2024': [
        { id: 1713042015168, text: '123', date: '17/04/2024' },
        { id: 1713042016706, text: '345', date: '17/04/2024' },
      ],
    };
    mockLocalStorage(mockTodos);

    const dateWithTodos = new Date(2024, 3, 17);
    expect(hasTodoForDay(dateWithTodos)).toBeTruthy();
  });

  test('returns false if no todos exist for the given day', () => {
    const dateWithoutTodos = new Date(2024, 3, 18);
    expect(hasTodoForDay(dateWithoutTodos)).toBeFalsy();
  });
});
