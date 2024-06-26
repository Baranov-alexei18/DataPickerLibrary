import React, { FC, useCallback, useState } from 'react';

import { CalendarProps } from '@/components/Calendar/types';
import { TodoList } from '@/components/TodoList';

export const withToDoList = (
  WrappedComponent: FC<CalendarProps>,
) => function Todo(props: CalendarProps) {
  const [isTodoOpen, setIsTodoOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const toogleTodo = (date: Date) => {
    setIsTodoOpen(true);
    setSelectedDate(date);
  };

  const handleClose = useCallback(() => {
    setIsTodoOpen(false);
    setSelectedDate(new Date());
  }, []);

  return (
    <>
      <WrappedComponent {...props} openTodo={toogleTodo} />
      {isTodoOpen && <TodoList onClose={handleClose} selectedDate={selectedDate} />}
    </>
  );
};
