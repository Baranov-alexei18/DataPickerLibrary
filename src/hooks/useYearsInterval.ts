import { useState } from 'react';

import { getYearsInterval } from '@/helpers';

export const useYearsInterval = (initialYear: number) => {
  const [selectedYearsInterval, setSelectedYearsInterval] = useState(getYearsInterval(initialYear));
  return { selectedYearsInterval, setSelectedYearsInterval };
};
