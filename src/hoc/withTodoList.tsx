import React, { FC, useCallback, useState } from 'react';

import { CalendarProps } from '@/components/Calendar/type';
import { TodoList } from '@/components/TodoList';

const withToDoList = (WrappedComponent: FC<CalendarProps>) => function Todo(props: CalendarProps) {
  const [isTodoOpen, setIsTodoOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const toogleTodo = (date: Date) => {
    setIsTodoOpen(true);
    setSelectedDate(date);
  };

  const handleClose = useCallback(() => {
    setIsTodoOpen(false);
    setSelectedDate(null);
  }, []);

  return (
    <>
      <WrappedComponent {...props} openTodo={toogleTodo} />
      {isTodoOpen && <TodoList onClose={handleClose} selectedDate={selectedDate} />}
    </>
  );
};
export { withToDoList };
