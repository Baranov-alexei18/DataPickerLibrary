import { useState } from 'react';

export const useCalendarMode = (initialMode: 'days' | 'monthes' | 'years' = 'days') => {
  const [mode, setMode] = useState(initialMode);
  return { mode, setMode };
};
