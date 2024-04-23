import React, { useContext } from 'react';

import { CalendarContext } from '@/hoc/withCalendarContext';
import { CalendarType } from '@/types/calendar';

import Tooltip from '../Tooltip';

import { LabelHeaderType } from './types';

export const LabelHeader = () => {
  const { state, functions } = useContext(CalendarContext) as CalendarType;
  const {
    monthesNames,
    selectedYear,
    selectedMonth,
    mode,
    selectedYearsInterval,
  } = state;

  const setMode = (mode: 'days' | 'monthes' | 'years') => () => functions.setMode(mode);

  const labelHeader: Partial<LabelHeaderType> = {
    days: {
      label: `${monthesNames[selectedMonth.monthIndex].month} ${selectedYear}`,
      nextMode: setMode('monthes'),
    },
    monthes: {
      label: `${selectedYear}`,
      nextMode: setMode('years'),
    },
    years: {
      label: `${selectedYearsInterval[0]} - ${selectedYearsInterval[selectedYearsInterval.length - 1]}`,
    },
  };

  return (
    <span data-testid={`${mode}-view`} onClick={labelHeader[mode]?.nextMode}>
      {labelHeader[mode]?.label}
      {mode === 'days' && <Tooltip />}
    </span>
  );
};
