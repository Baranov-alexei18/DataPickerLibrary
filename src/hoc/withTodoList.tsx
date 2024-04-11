import React, { useState } from 'react';

import { TodoList } from '@/components/TodoList';

export const withToDoList = (WrappedComponent) => function todo(props) {
  const [isTodoOpen, setIsTodoOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const openTodo = (date: Date) => {
    setIsTodoOpen(true);
    setSelectedDate(date);
  };

  const handleClose = () => {
    setIsTodoOpen(false);
    setSelectedDate(null);
  };

  return (
    <>
      <WrappedComponent openTodo={openTodo} {...props} />
      {isTodoOpen && <TodoList onClose={handleClose} selectedDate={selectedDate} />}
    </>
  );
};
