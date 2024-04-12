import React, { FC, useEffect, useState } from 'react';

import { TODO_STORAGE_KEY } from '@/constants';
import { formatDateToString } from '@/utils/Calendar/getFormatDate';

import classes from './styles.module.scss';
import { TodoItem, TodoListProps } from './type';

export const TodoList: FC<TodoListProps> = ({ onClose, selectedDate }) => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState <Record<string, TodoItem[]>>([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(TODO_STORAGE_KEY)!) || [];
    setTodos(storedTodos);
  }, []);

  const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (!inputValue) return;
    const dateKey = formatDateToString(selectedDate!);
    const newTodo = {
      id: Date.now(),
      text: inputValue,
      date: formatDateToString(selectedDate!),
    };
    const addTodos = {
      ...todos,
      [dateKey]: [...(todos[dateKey] || []), newTodo],
    };
    setTodos(addTodos);
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(addTodos));
    setInputValue('');
  };

  const handleDeleteTodo = (dateKey: string, _id: number) => {
    if (!todos[dateKey]) return;
    const updatedTodos = {
      ...todos,
      [dateKey]: todos[dateKey].filter(({ id }: TodoItem) => _id !== id),
    };

    if (!updatedTodos[dateKey].length) {
      delete updatedTodos[dateKey];
    }
    setTodos(updatedTodos);
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(updatedTodos));
  };
  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <span>
          {`Todo List for ${formatDateToString(selectedDate!)}`}
        </span>
        <button type="button" onClick={onClose}>Back</button>
      </div>
      <div className={classes.add_wrapper}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleEnterPress}
        />
        <button type="button" onClick={handleAddTodo}>Add</button>
      </div>
      <ul className={classes.body}>
        {todos[formatDateToString(selectedDate!)]
                    && todos[formatDateToString(selectedDate!)].map(({ id, text }: TodoItem) => (
                      <li key={id}>
                        <span>{text}</span>
                        <button type="button" onClick={() => handleDeleteTodo(formatDateToString(selectedDate!), id)}>Delete</button>
                      </li>
                    ))}
      </ul>
    </div>
  );
};
