import { TODO_STORAGE_KEY } from '@/constants';

import { formatDateToString } from './getFormatDate';

export const hasTodoForDay = (date: Date): boolean => {
  const storedTodos = JSON.parse(localStorage.getItem(TODO_STORAGE_KEY)!) || [];
  return storedTodos[formatDateToString(date)];
};
